import { Video, Mic, PhoneOff, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Telemedicine() {
  return (
    <section id="telemedicine" className="py-24 bg-gray-900 text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div>
                <span className="text-primary-400 font-bold tracking-wider uppercase text-sm mb-2 block">Telemedicine Suite</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Premium Healthcare.<br />Anytime, Anywhere.
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    Connect patients with specialists through secure, high-definition video consultations. Integrated directly with patient records for seamless documenting during calls.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <Video className="w-6 h-6 text-primary-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">HD Video & Audio</h4>
                            <p className="text-gray-400 text-sm">Crystal clear WebRTC connection optimized for low bandwidth.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <ShieldIcon className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">End-to-End Encrypted</h4>
                            <p className="text-gray-400 text-sm">HIPAA compliant security ensures consultation privacy.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video UI Mockup */}
            <div className="relative">
                <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 aspect-video relative group">
                    {/* Simulated Doctor Feed */}
                    <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                        <UserPlaceholder className="w-32 h-32 text-gray-600 opacity-50" />
                        <span className="absolute bottom-6 left-6 bg-black/60 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">Dr. Sarah Wilson</span>
                    </div>
                    
                    {/* Simulated Patient PIP */}
                    <div className="absolute top-4 right-4 w-32 h-24 bg-gray-900 rounded-xl shadow-lg border border-gray-600 flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"><Mic className="w-5 h-5" /></button>
                        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"><Video className="w-5 h-5" /></button>
                        <button className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"><PhoneOff className="w-5 h-5 fill-current" /></button>
                        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

function ShieldIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
}

function UserPlaceholder(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
    )
}
