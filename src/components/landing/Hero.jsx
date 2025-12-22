import { useEffect, useRef } from 'react';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Play, Activity } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(textRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    )
    .fromTo(imageRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      '-=0.5'
    );
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-bl-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6">
                ✨ Revolutionizing Healthcare Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Smart, Secure & Connected <span className="text-primary-500">Healthcare.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Streamline hospital operations with HealthAxis. From appointment scheduling to secure video consultations and unified medical records — experience the future of digital health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary-500/20">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="rounded-full px-8">
                  <Play className="ml-2 w-5 h-5 fill-current mr-2" /> View Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> 24/7 Support
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div> Secure Data
                </div>
            </div>
          </div>

          {/* Hero Image/Illustration area */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20 border-4 border-white dark:border-dark-800 bg-white dark:bg-dark-800 aspect-[4/3] flex items-center justify-center">
                
                {/* Abstract Dashboard UI Mockup */}
                <div className="w-full h-full bg-gray-50 dark:bg-dark-900 p-6 relative">
                    {/* Header Mockup */}
                    <div className="h-8 w-full bg-white dark:bg-dark-800 rounded-lg shadow-sm mb-4 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    
                    <div className="flex gap-4 h-[calc(100%-3rem)]">
                        {/* Sidebar Mockup */}
                        <div className="w-16 bg-white dark:bg-dark-800 rounded-xl shadow-sm hidden sm:flex flex-col items-center py-4 gap-4">
                            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/20"></div>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700"></div>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700"></div>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700"></div>
                        </div>
                        
                        {/* Main Content Mockup */}
                        <div className="flex-1 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1 h-24 bg-primary-500 rounded-xl shadow-lg shadow-primary-500/20 relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
                                </div>
                                <div className="flex-1 h-24 bg-white dark:bg-dark-800 rounded-xl shadow-sm"></div>
                                <div className="flex-1 h-24 bg-white dark:bg-dark-800 rounded-xl shadow-sm hidden sm:block"></div>
                            </div>
                            <div className="h-40 bg-white dark:bg-dark-800 rounded-xl shadow-sm flex items-end justify-between p-4 px-6 gap-2">
                                <div className="w-full h-[60%] bg-primary-100 dark:bg-primary-900/20 rounded-t-md relative">
                                    <div className="absolute bottom-0 w-full h-full bg-primary-500/20 rounded-t-md animate-pulse"></div>
                                </div>
                                <div className="w-full h-[80%] bg-primary-500 rounded-t-md"></div>
                                <div className="w-full h-[50%] bg-primary-100 dark:bg-primary-900/20 rounded-t-md"></div>
                                <div className="w-full h-[90%] bg-primary-500 rounded-t-md"></div>
                                <div className="w-full h-[70%] bg-primary-100 dark:bg-primary-900/20 rounded-t-md"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Element */}
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">System Status</p>
                                <p className="font-bold text-gray-900 dark:text-white">99.9% Optimal</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Decoration Circles */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
