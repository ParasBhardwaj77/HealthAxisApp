import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, fetchWithAuth } from "../../api/config";
import { Loader2 } from "lucide-react";

export default function VideoCall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("Consultation");
  const [currentUser, setCurrentUser] = useState({ name: "User" });
  const jitsiContainerRef = useRef(null);
  const [jitsiApi, setJitsiApi] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Fetch Appointment Details
        const appRes = await fetchWithAuth(
          `${API_BASE_URL}/appointments/${id}`
        );
        if (appRes.ok) {
          const data = await appRes.json();
          setPatientName(data.patientName || "Consultation");
        }

        // Fetch Current User Details to set Display Name
        // We'll try the patient/me endpoint first, if that fails, maybe doctor/me?
        // Actually, let's rely on role. But since we don't know the role easily here without context,
        // we can try a generic approach or assume the user is logged in.
        // Let's try fetching from the generic "me" endpoint if it existed, but we have specific ones.
        // We will try both or check localStorage if role is stored.

        const storedName = localStorage.getItem("userName");
        if (storedName) {
          setCurrentUser({ name: storedName });
        } else {
          // Try fetching if not stored (e.g. existing session)
          // ... existing fetch logic or fallback
          const role = localStorage.getItem("role"); // Need to get role here if not already
          if (role === "Patient") {
            const userRes = await fetchWithAuth(API_ENDPOINTS.PATIENT.ME);
            if (userRes.ok) {
              const userData = await userRes.json();
              setCurrentUser({ name: userData.fullName });
              localStorage.setItem("userName", userData.fullName); // Cache it
            }
          } else {
            // Fallback for Doctor or other roles if userName not stored and no specific ME endpoint
            setCurrentUser({ name: "Doctor" }); // Default or more sophisticated logic needed here
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (!loading && jitsiContainerRef.current && !jitsiApi) {
      // meet.jit.si now requires auth. We switch to a community instance or 8x8 vpaas if needed.
      // Trying a stable community instance to avoid force-login.
      const domain = "meet.guifi.net";
      const options = {
        roomName: `HealthAxis-Appointment-${id}`,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: currentUser.name,
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false, // SKIP PREJOIN PAGE
          // Try to mitigate moderator issues by disabling lobby if possible
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "profile",
            "chat",
            "recording",
            "livestreaming",
            "etherpad",
            "sharedvideo",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "invite",
            "feedback",
            "stats",
            "shortcuts",
            "tileview",
            "videobackgroundblur",
            "download",
            "help",
            "mute-everyone",
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DEFAULT_REMOTE_DISPLAY_NAME: "Fellow HealthAxis User",
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);

      api.addEventListeners({
        videoConferenceLeft: () => handleEndCall(),
        readyToClose: () => handleEndCall(),
      });
    }

    return () => {
      if (jitsiApi) jitsiApi.dispose();
    };
  }, [loading, id, currentUser]); // Re-run if currentUser changes (though loading handles it)

  const handleEndCall = async () => {
    const role = localStorage.getItem("role");
    if (role === "Patient") {
      navigate("/patient");
    } else {
      navigate("/doctor");
      // Only doctor marks as complete usually, but let's keep it safe
      try {
        await fetchWithAuth(`${API_BASE_URL}/appointments/${id}/complete`, {
          method: "PATCH",
        });
      } catch (e) {
        console.error("Failed to mark appointment complete", e);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-dark-900 flex flex-col">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
          <p>Preparing secure consultation room...</p>
          <p className="text-sm text-gray-400 mt-2">
            Connecting as {currentUser.name}...
          </p>
        </div>
      ) : (
        <div ref={jitsiContainerRef} className="w-full h-full" />
      )}
    </div>
  );
}
