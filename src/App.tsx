import { MatrixBackground } from "./components/MatrixBackground";
import { SovereignHeader } from "./components/SovereignHeader";
import { OmniEye } from "./components/OmniEye";
import { SwarmMatrix } from "./components/SwarmMatrix";
import { SovereignConsole } from "./components/SovereignConsole";
import { FactionHub } from "./components/FactionHub";
import { EmpireMap } from "./components/EmpireMap";
import { VinylRecords } from "./components/VinylRecords";
import { ResearchArchives } from "./components/ResearchArchives";
import { SystemHub } from "./components/SystemHub";
import { Mic, LayoutGrid, Settings, Menu, X, Wifi, WifiOff, Users, Database, Globe, Disc } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Sovereign Cockpit :: Initializing...");
    // ... same effect logic ...
    try {
      setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
      setIsDesktop(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('resize', handleResize);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } catch (e) {
      console.error("Initialization Failure:", e);
      setError(String(e));
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-obsidian text-royal-crimson flex items-center justify-center p-10 font-terminal">
        [ CRITICAL_HALT ] :: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-obsidian text-royal-gold font-sovereign">
      <MatrixBackground />

      {/* HUD Layer */}
      <SovereignHeader />

      {/* Connectivity Status (Gaia Enhancement) */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full backdrop-blur-md border text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all ${isOnline ? 'bg-amethyst/10 border-amethyst/30 text-amethyst' : 'bg-royal-crimson/10 border-royal-crimson/30 text-royal-crimson shadow-[0_0_15px_rgba(153,0,0,0.5)]'}`}>
        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        {isOnline ? 'Lattice_Stable :: CloudBrain_Linked' : 'Disconnected :: LiteRT_Fallback_Armed'}
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-6 relative z-10 overflow-hidden">
        {/* Mobile Stealth Backdrop */}
        <AnimatePresence>
          {isSidebarOpen && !isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-6 right-6 z-50 p-2 bg-royal-purple/20 border border-royal-purple/40 rounded-full backdrop-blur-md hover:bg-royal-purple/40 transition-colors"
          aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
          title={isSidebarOpen ? "Close Menu" : "Open Menu"}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Left Side: Navigation & Senses */}
        <AnimatePresence>
          {(isSidebarOpen || isDesktop) && (
            <motion.aside 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed md:relative inset-y-0 left-0 z-40 w-72 md:w-64 lg:w-80 flex flex-col gap-6 p-6 md:p-0 bg-obsidian md:bg-transparent border-r border-royal-purple/20 md:border-none"
            >
               <nav className="glass-panel p-4 rounded-2xl flex flex-col gap-6 items-stretch border-l-4 border-royal-gold shadow-2xl">
                  {[
                    { id: 'dashboard', icon: LayoutGrid, label: 'War Room' },
                    { id: 'faction', icon: Users, label: 'Faction' },
                    { id: 'research', icon: Database, label: 'Archives' },
                    { id: 'records', icon: Disc, label: 'Records' },
                    { id: 'map', icon: Globe, label: 'Map' },
                    { id: 'system', icon: Settings, label: 'System' }
                  ].map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                      className={`flex items-center gap-4 group cursor-pointer bg-transparent border-none text-left outline-none p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-royal-purple/20 glow-purple' : 'hover:bg-white/5'}`} 
                      title={item.label}
                    >
                      <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-royal-purple/40' : 'bg-white/5 border border-white/10 group-hover:bg-royal-purple/20'}`}>
                        <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-royal-gold'}`} />
                      </div>
                      <span className={`text-[11px] uppercase tracking-[0.2em] font-bold ${activeTab === item.id ? 'text-white' : 'group-hover:text-white'} transition-colors`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
               </nav>

               <div className="glass-panel p-6 rounded-2xl border-t-4 border-royal-gold flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-royal-gold/5 to-transparent pointer-events-none" />
                  
                  <button 
                    onClick={() => setIsListening(!isListening)}
                    className="group relative bg-transparent border-none p-0 outline-none"
                    aria-label={isListening ? "Stop Listening" : "Start Listening"}
                    title={isListening ? "Stop Listening" : "Start Listening"}
                  >
                    <motion.div
                      className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${isListening ? 'border-amethyst bg-amethyst/10 shadow-[0_0_30px_#9966CC]' : 'border-royal-gold bg-royal-gold/5'}`}
                      animate={{ scale: isListening ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Mic className={`w-12 h-12 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-colors duration-500 ${isListening ? 'text-amethyst' : 'text-royal-gold'}`} />
                      
                      {/* Waveform Visual (when active) */}
                      {isListening && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-8 bg-amethyst/40 mx-0.5 rounded-full"
                              animate={{ height: [10, 40, 10] }}
                              transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                      )}

                      <motion.div 
                        className={`absolute inset-0 border-2 rounded-full ${isListening ? 'border-amethyst' : 'border-amethyst/0'}`}
                        animate={isListening ? { scale: [1, 1.6], opacity: [1, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </button>

                  <h2 className="text-royal-gold text-xl tracking-[0.3em] font-bold mt-4 relative z-10">
                    {isListening ? "ANYA_RECOGNIZING" : "ANYA_LIVE"}
                  </h2>
                  <p className="text-[9px] text-white/40 uppercase mt-2 font-terminal relative z-10">
                    {isListening ? "Analyzing Vocal Intent..." : "Sovereign Voice Active"}
                  </p>
               </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center & Right: Content Stack */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && (
                <motion.div 
                   key="dashboard"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden"
                >
                   <section className="flex-[2] flex flex-col gap-6 min-h-[400px] lg:min-h-0 overflow-hidden">
                      <OmniEye />
                   </section>
                   <aside className="flex-1 flex flex-col min-h-[300px] lg:min-h-0 overflow-hidden">
                      <SwarmMatrix />
                   </aside>
                </motion.div>
             )}

             {activeTab === 'faction' && (
                <motion.div 
                   key="faction"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 overflow-hidden"
                >
                   <FactionHub />
                </motion.div>
             )}

             {activeTab === 'research' && (
                <motion.div 
                   key="research"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 overflow-hidden"
                >
                   <ResearchArchives />
                </motion.div>
             )}

             {activeTab === 'records' && (
                <motion.div 
                   key="records"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 glass-panel rounded-2xl p-10 flex flex-col overflow-hidden"
                >
                   <VinylRecords />
                </motion.div>
             )}

             {activeTab === 'map' && (
                <motion.div 
                   key="map"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 overflow-hidden"
                >
                   <EmpireMap />
                </motion.div>
             )}
             {activeTab === 'system' && (
                <motion.div 
                   key="system"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 overflow-hidden"
                >
                   <SystemHub />
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer: Console */}
      <div className="px-4 md:px-6 pb-4 relative z-10">
         <SovereignConsole />
      </div>
    </main>
  );
}

export default App;
