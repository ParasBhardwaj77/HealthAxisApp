import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Maximize,
  MessageSquare,
  Users,
  Settings,
  MoreVertical,
  X,
  Send,
} from "lucide-react";
import gsap from "gsap";
import { Button } from "../../components/ui/Button";
import { API_BASE_URL, fetchWithAuth } from "../../api/config";
import { Loader2 } from "lucide-react";

export default function VideoCall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [patientName, setPatientName] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "doctor",
      time: "10:00 AM",
    },
    {
      id: 2,
      text: "I've been having some headaches lately.",
      sender: "patient",
      time: "10:01 AM",
    },
  ]);
  const containerRef = useRef(null);
  const chatSidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const controlsRef = useRef(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth(
          `${API_BASE_URL}/appointments/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setPatientName(data.patientName || "Unknown Patient");
        } else {
          setError("Failed to fetch appointment details");
          setPatientName("Unknown Patient");
        }
      } catch (err) {
        console.error("Error fetching appointment details:", err);
        setError("An error occurred while fetching details");
        setPatientName("Unknown Patient");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Entry animations
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      controlsRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatSidebarRef.current) {
      if (isChatOpen) {
        gsap.to(chatSidebarRef.current, {
          x: 0,
          opacity: 1,
          display: "flex",
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(mainContentRef.current, {
          marginRight: "384px",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(chatSidebarRef.current, {
          x: 400,
          opacity: 0,
          display: "none",
          duration: 0.4,
          ease: "power3.in",
        });
        gsap.to(mainContentRef.current, {
          marginRight: "0px",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndCall = async () => {
    console.log("[VideoCall] Ending call for appointment:", id);
    try {
      // Update appointment status to CONFIRMED
      console.log("[VideoCall] Calling API to complete appointment...");
      const response = await fetchWithAuth(
        `${API_BASE_URL}/appointments/${id}/complete`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        console.log("[VideoCall] Appointment status updated successfully");
      } else {
        console.error(
          "[VideoCall] Failed to update status, response:",
          response.status
        );
      }
    } catch (error) {
      console.error("[VideoCall] Failed to update appointment status:", error);
      // Continue with navigation even if update fails
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      onComplete: () => navigate("/doctor"),
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-dark-900 flex flex-row overflow-hidden"
    >
      <div
        ref={mainContentRef}
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative transition-all duration-500"
      >
        {loading && (
          <div className="absolute inset-0 z-[70] bg-dark-900 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            <p className="text-white font-medium">
              Connecting to secure server...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 z-[70] bg-dark-900 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Connection Error</h2>
            <p className="text-white/60 max-w-xs">{error}</p>
            <Button onClick={() => navigate("/doctor")} className="mt-4">
              Return to Dashboard
            </Button>
          </div>
        )}
        {/* Background/Patient Video Mock */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-dark-800 to-primary-900/40 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary-500/10 flex items-center justify-center animate-pulse">
                <span className="text-primary-400 font-bold text-4xl">
                  {patientName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium">
              Connected to {patientName}'s camera...
            </div>
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
              <span className="text-white font-bold text-sm">
                {formatTime(callDuration)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">
                {patientName}
              </h3>
              <p className="text-white/60 text-xs font-medium">
                Consultation in Session
              </p>
            </div>
          </div>

          <div />
        </div>

        {/* Doctor Video PIP */}
        <div className="absolute bottom-32 right-8 w-48 md:w-64 aspect-video rounded-3xl bg-dark-800 border-2 border-white/20 shadow-2xl overflow-hidden z-20 group">
          <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center">
            {isVideoOff ? (
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-white/20" />
              </div>
            ) : (
              <div className="text-white/50 text-xs font-medium uppercase tracking-widest">
                Preview Mode
              </div>
            )}
          </div>
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[10px] font-bold text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            You
          </div>
        </div>

        {/* Bottom Controls */}
        <div
          ref={controlsRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all ${
              isMuted
                ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-2xl transition-all ${
              isVideoOff
                ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6" />
            ) : (
              <VideoIcon className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-4 rounded-2xl transition-all ${
              isChatOpen
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/40"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          <div className="w-px h-10 bg-white/10 mx-2" />

          <button
            onClick={handleEndCall}
            className="p-4 rounded-2xl bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/30 group"
          >
            <div className="flex items-center gap-2">
              <PhoneOff className="w-6 h-6" />
              <span className="text-sm font-bold pr-2 hidden md:inline">
                End Call
              </span>
            </div>
          </button>
        </div>

        {/* Chat Sidebar */}
        <aside
          ref={chatSidebarRef}
          className="fixed top-0 right-0 bottom-0 w-96 bg-dark-800/95 backdrop-blur-2xl border-l border-white/10 z-[55] flex-col hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">Consultation Chat</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "doctor" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === "doctor"
                      ? "bg-primary-500 text-white rounded-tr-none"
                      : "bg-white/10 text-white rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-white/40 mt-1 font-medium">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newMessage.trim()) {
                  setMessages([
                    ...messages,
                    {
                      id: Date.now(),
                      text: newMessage,
                      sender: "doctor",
                      time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    },
                  ]);
                  setNewMessage("");
                }
              }}
              className="relative"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 rounded-xl text-white hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </aside>

        {/* Floating Elements for aesthetics */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full animate-slow-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full animate-slow-float-delayed" />
        </div>
      </div>
    </div>
  );
}
