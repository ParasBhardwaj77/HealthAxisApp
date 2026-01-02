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
} from "lucide-react";
import gsap from "gsap";
import { Button } from "../../components/ui/Button";

export default function VideoCall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  // Mock patient identification (in a real app, fetch by id)
  const patientName = "Alice Smith";

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndCall = () => {
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
      className="fixed inset-0 z-[60] bg-dark-900 flex flex-col items-center justify-center p-4 md:p-8"
    >
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

        <div className="flex items-center gap-2">
          <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
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

        <button className="p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all">
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

      {/* Floating Elements for aesthetics */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full animate-slow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full animate-slow-float-delayed" />
      </div>
    </div>
  );
}
