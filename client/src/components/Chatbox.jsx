import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { API_ENDPOINTS, fetchWithAuth } from "../api/config";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // State Machine for Manual Override (if AI triggers booking)
  // 'CHAT' = Normal talk
  // 'SELECT_DATE' = AI found doctor, proceed to booking
  // 'SELECT_TIME' = Date picked
  // 'CONFIRM' = Final check
  const [mode, setMode] = useState("CHAT");

  const [bookingData, setBookingData] = useState({
    doctor: null,
    date: "",
    time: "",
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(
        "bot",
        "Hi! I'm your AI Assistant. You can ask me to help you find a doctor (e.g., 'I have a headache')."
      );
    }
  }, [isOpen]);

  const addMessage = (sender, text, options = null) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender, text, options }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");

    // 1. User Message
    addMessage("user", text);

    // If we are in booking mode, check if we should bail out
    if (mode !== "CHAT") {
      const lowerText = text.toLowerCase();
      // If user mentions a doctor or wants to search again, go back to CHAT
      // CRITICAL: If the input has no numbers, it can't be a date/time, so assume it's a chat message.
      const isSwitching =
        !/\d/.test(text) ||
        /book with|see|recommend|search|another|looking for|want|change|switch|cancel|nvm/i.test(
          lowerText
        );

      if (isSwitching) {
        setMode("CHAT");
        // Fall through to AI logic below
      } else {
        processBookingInput(text);
        return;
      }
    }

    // 2. AI Logic
    setIsTyping(true);
    try {
      const res = await fetchWithAuth(API_ENDPOINTS.CHAT.ASK, {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const aiText = data.response;
      console.log("DEBUG: AI Raw Text ->", aiText);

      // 3. Catch-all regex for ID tags (ID, DoctorID, BookID, etc)
      const bookingMatch = aiText.match(
        /\[(?:BOOK_DOCTOR_ID|DOCTOR_ID|ID|DOCTOR):\s*([^\]\s]+)\]/i
      );
      console.log("DEBUG: Regex match result ->", bookingMatch);

      let cleanText = aiText.replace(/\[.*?:.*?\]/gi, "").trim();
      addMessage("bot", cleanText);

      if (bookingMatch) {
        const doctorId = bookingMatch[1].trim();
        console.log("DEBUG: Handing off to booking with ID ->", doctorId);
        await resolveDoctorAndStartBooking(doctorId);
      } else {
        console.log("DEBUG: No booking intent detected in AI text.");
      }
    } catch (err) {
      addMessage(
        "bot",
        "Sorry, I'm having trouble connecting to my brain right now."
      );
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const resolveDoctorAndStartBooking = async (doctorId) => {
    try {
      setIsTyping(true);
      const res = await fetchWithAuth(API_ENDPOINTS.PATIENT.DOCTORS);
      const allDocs = await res.json();
      console.log("DEBUG: List of doctors:", allDocs);
      console.log("DEBUG: Extracted ID to find:", doctorId);
      const doc = allDocs.find((d) => (d.id || d._id) === doctorId);

      if (doc) {
        setBookingData((prev) => ({ ...prev, doctor: doc }));
        addMessage(
          "bot",
          `I've prepared a booking with Dr. ${doc.fullName} (${doc.specialization}). Please select a date (YYYY-MM-DD).`,
          [{ type: "date_input" }]
        );
        setMode("SELECT_DATE");
      } else {
        addMessage(
          "bot",
          "I tried to book that doctor but couldn't find their details."
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const processBookingInput = (text) => {
    if (text.toLowerCase() === "cancel") {
      setMode("CHAT");
      addMessage("bot", "Booking cancelled. How else can I help?");
      return;
    }

    switch (mode) {
      case "SELECT_DATE":
        if (isValidDate(text)) {
          setBookingData({ ...bookingData, date: text });
          setMode("SELECT_TIME");
          const slots = [
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "01:00 PM",
            "02:00 PM",
            "03:00 PM",
            "04:00 PM",
          ];
          addMessage("bot", "Great! Now pick a time slot:", [
            ...slots.map((s) => ({
              label: s,
              value: s,
              action: "time_select",
            })),
          ]);
        } else {
          addMessage(
            "bot",
            "Please enter a valid date (YYYY-MM-DD) or say 'cancel' to go back."
          );
        }
        break;
      case "SELECT_TIME":
        handleTimeSelect(text);
        break;
      case "CONFIRM":
        if (text.toLowerCase() === "yes") bookAppointment();
        else {
          setMode("CHAT");
          addMessage("bot", "Ok, cancelled.");
        }
        break;
    }
  };

  const handleDateSelect = (date) => {
    // Triggered by UI date picker
    processBookingInput(date);
  };

  const handleTimeSelect = (time) => {
    setBookingData({ ...bookingData, time });
    setMode("CONFIRM");
    addMessage(
      "bot",
      `Confirm booking with ${bookingData.doctor.fullName} on ${bookingData.date} at ${time}?`,
      [
        { label: "Yes, Book It", value: "yes", action: "confirm_booking" },
        { label: "Cancel", value: "cancel", action: "cancel" },
      ]
    );
  };

  const bookAppointment = async () => {
    setIsTyping(true);
    try {
      // Convert time (Same logic as before)
      const [t, modifier] = bookingData.time.split(" ");
      let [hours, minutes] = t.split(":");
      if (hours === "12") hours = "00";
      if (modifier === "PM") hours = parseInt(hours, 10) + 12;
      hours = hours.toString().padStart(2, "0");
      const dateTime = `${bookingData.date}T${hours}:${minutes}:00`;

      const res = await fetchWithAuth(API_ENDPOINTS.PATIENT.APPOINTMENTS, {
        method: "POST",
        body: JSON.stringify({
          doctorId: bookingData.doctor.id,
          dateTime: dateTime,
        }),
      });

      if (res.ok) {
        const appointmentData = await res.json();
        const paymentRes = await fetchWithAuth(
          API_ENDPOINTS.PAYMENT.CREATE_SESSION,
          {
            method: "POST",
            body: JSON.stringify({ appointmentId: appointmentData.id }),
          }
        );
        if (paymentRes.ok) {
          const { paymentUrl } = await paymentRes.json();
          addMessage("bot", "Booking confirmed! Click here to pay:", [
            { label: "Pay Now", value: paymentUrl, action: "pay_link" },
          ]);
          setTimeout(() => (window.location.href = paymentUrl), 3000);
        }
      } else {
        const errorMsg = await res.text();
        addMessage(
          "bot",
          `Failed to book: ${
            errorMsg || "Unknown error"
          }. Please try a different time.`
        );
      }
    } catch (e) {
      console.error(e);
      addMessage("bot", "Error occurred.");
    } finally {
      setIsTyping(false);
      setMode("CHAT"); // Reset to AI mode after booking attempt
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
  };

  // Render Logic
  const renderOption = (opt, idx) => {
    if (opt.type === "date_input") {
      return (
        <input
          key={idx}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => handleDateSelect(e.target.value)}
          className="mt-2 text-black p-2 rounded-xl border w-full"
        />
      );
    }
    if (opt.action === "pay_link") {
      return (
        <a
          key={idx}
          href={opt.value}
          className="block mt-2 bg-green-500 text-white p-2 rounded text-center"
        >
          Pay Now
        </a>
      );
    }
    return (
      <button
        key={idx}
        onClick={() => {
          if (opt.action === "time_select") handleTimeSelect(opt.value);
          else if (opt.action === "confirm_booking") bookAppointment();
          else if (opt.action === "cancel") {
            setMode("CHAT");
            addMessage("bot", "Cancelled.");
          }
        }}
        className="block w-full text-left mt-2 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
      >
        {opt.label}
      </button>
    );
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-50 group"
        >
          <MessageCircle className="w-8 h-8 group-hover:animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white dark:bg-dark-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <h3 className="font-bold">Gemini AI Assistant</h3>
                <p className="text-xs text-primary-100">
                  {mode === "CHAT"
                    ? "Ask me anything"
                    : "Booking Appointment..."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-primary-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm border"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.options && (
                    <div className="mt-2 space-y-1">
                      {msg.options.map((opt, idx) => renderOption(opt, idx))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-gray-400 ml-4 animate-pulse">
                Gemini is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white dark:bg-dark-800 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={
                  mode === "CHAT"
                    ? "I need a heart doctor..."
                    : "Select options above..."
                }
                disabled={isTyping}
                className="flex-1 bg-gray-100 dark:bg-dark-700 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
