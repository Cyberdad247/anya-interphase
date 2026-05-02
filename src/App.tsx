import { MatrixBackground } from "./components/MatrixBackground";
import { SovereignHeader } from "./components/SovereignHeader";
import { OmniEye } from "./components/OmniEye";
import { SwarmMatrix } from "./components/SwarmMatrix";
import { SovereignConsole } from "./components/SovereignConsole";
import { FactionHub } from "./components/FactionHub";
import { ResearchArchives } from "./components/ResearchArchives";
import { SystemHub } from "./components/SystemHub";
import { QuestLog } from "./components/QuestLog";
import { Mic, LayoutGrid, Settings, Menu, X, Users, Database, Cpu, Code, ShieldCheck, PhoneCall, Route } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bridge');
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [isListening, setIsListening] = useState(false);
  const [probeData, setProbeData] = useState<{ cores: number, mem: number, res: string, ua: string } | null>(null);
  const [showProbe, setShowProbe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Sovereign Cockpit v4.5 :: Initializing...");
    try {
      const browserNavigator = navigator as Navigator & { deviceMemory?: number };
      const data = {
        cores: navigator.hardwareConcurrency || 0,
        mem: browserNavigator.deviceMemory || 0,
        res: `${window.innerWidth}x${window.innerHeight}`,
        ua: /iPhone|iPad|Android/i.test(navigator.userAgent) ? 'Sovereign_Mobile' : 'Vizion_Workstation'
      };

      const showProbeTimer = window.setTimeout(() => {
        setProbeData(data);
        setShowProbe(true);
      }, 0);
      const hideProbeTimer = window.setTimeout(() => setShowProbe(false), 5000);

      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
        setProbeData(prev => prev ? { ...prev, res: `${window.innerWidth}x${window.innerHeight}` } : null);
      };

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('resize', handleResize);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.clearTimeout(showProbeTimer);
        window.clearTimeout(hideProbeTimer);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } catch (e) {
      console.error("Initialization Failure:", e);
      window.setTimeout(() => setError(String(e)), 0);
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

      {/* Platform Probe Notification */}
      <AnimatePresence>
        {showProbe && probeData && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-32 right-6 z-[60] glass-panel p-4 rounded-xl border-l-4 border-amethyst shadow-2xl max-w-xs pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-2">
               <Cpu className="w-4 h-4 text-amethyst animate-pulse" />
               <span className="text-[10px] font-terminal text-amethyst uppercase tracking-widest">Platform_Probe_Active</span>
            </div>
            <div className="space-y-1 font-terminal text-[9px] uppercase text-white/60">
               <div className="flex justify-between"><span>Node:</span> <span className="text-royal-gold">{probeData.ua}</span></div>
               <div className="flex justify-between"><span>Cores:</span> <span className="text-royal-gold">{probeData.cores}</span></div>
               <div className="flex justify-between"><span>Memory:</span> <span className="text-royal-gold">{probeData.mem}GB</span></div>
               <div className="flex justify-between"><span>Res:</span> <span className="text-royal-gold">{probeData.res}</span></div>
            </div>
            <div className="mt-3 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  className="h-full bg-amethyst"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connectivity Status */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full backdrop-blur-md border text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all bg-amethyst/10 border-amethyst/30 text-amethyst pointer-events-none">
        <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-amethyst' : 'bg-royal-crimson'}`} />
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
              className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md md:hidden cursor-pointer"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-6 right-6 z-50 p-2 bg-royal-purple/20 border border-royal-purple/40 rounded-full backdrop-blur-md hover:bg-royal-purple/40 transition-all active:scale-95"
          aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
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
              className="fixed md:relative inset-y-0 left-0 z-40 w-72 md:w-64 lg:w-80 flex flex-col gap-6 p-6 md:p-0 bg-obsidian md:bg-transparent border-r border-royal-purple/20 md:border-none shadow-2xl md:shadow-none"
            >
               <nav className="glass-panel p-4 rounded-2xl flex flex-col gap-4 items-stretch border-l-4 border-royal-gold">
                  {[
                    { id: 'bridge', icon: LayoutGrid, label: 'The Bridge' },
                    { id: 'faction', icon: Users, label: 'Faction' },
                    { id: 'archives', icon: Database, label: 'Archives' },
                    { id: 'hive', icon: Code, label: 'Hive IDE' },
                    { id: 'governance', icon: ShieldCheck, label: 'Governance' },
                    { id: 'telephony', icon: PhoneCall, label: 'PhoneClaw' },
                    { id: 'omni', icon: Route, label: 'Omni-Route' },
                    { id: 'system', icon: Settings, label: 'System' }
                  ].map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                      className={`flex items-center gap-4 group cursor-pointer bg-transparent border-none text-left outline-none p-3 rounded-xl transition-all active:scale-[0.98] ${activeTab === item.id ? 'bg-royal-purple/20 glow-purple border border-royal-purple/30' : 'hover:bg-white/5'}`} 
                      title={item.label}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${activeTab === item.id ? 'bg-royal-purple/40' : 'bg-white/5 border border-white/10 group-hover:bg-royal-purple/20'}`}>
                        <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-white' : 'text-royal-gold'}`} />
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
                    className="group relative bg-transparent border-none p-0 outline-none cursor-pointer active:scale-95 transition-transform"
                    aria-label={isListening ? "Stop Listening" : "Start Listening"}
                  >
                    <motion.div
                      className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${isListening ? 'border-amethyst bg-amethyst/10 shadow-[0_0_30px_#9966CC]' : 'border-royal-gold bg-royal-gold/5'}`}
                    >
                      <Mic className={`w-12 h-12 transition-colors duration-500 ${isListening ? 'text-amethyst' : 'text-royal-gold'}`} />
                      
                      {/* Waveform Visual */}
                      {isListening && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-8 bg-amethyst/30 mx-0.5 rounded-full"
                              animate={{ height: [8, 40, 8] }}
                              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                      )}

                      <motion.div 
                        className={`absolute inset-0 border-2 rounded-full pointer-events-none ${isListening ? 'border-amethyst' : 'border-amethyst/0'}`}
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
             {activeTab === 'bridge' && (
                <motion.div 
                   key="bridge"
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
                      <div className="mt-6">
                         <QuestLog />
                      </div>
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

             {activeTab === 'archives' && (
                <motion.div 
                   key="archives"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 overflow-hidden"
                >
                   <ResearchArchives />
                </motion.div>
             )}

             {activeTab === 'hive' && (
                <motion.div 
                   key="hive"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                >
                   <Code className="w-20 h-20 text-amethyst mb-6 animate-pulse" />
                   <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.4em]">Hive IDE</h2>
                   <p className="text-white/40 mt-4 max-w-lg font-terminal text-sm">
                      [ INITIALIZING ANTI-GRAVITY CHAMBER... ] <br/>
                      Loading isolated development environment.
                   </p>
                </motion.div>
             )}

             {activeTab === 'governance' && (
                <motion.div 
                   key="governance"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                >
                   <ShieldCheck className="w-20 h-20 text-amethyst mb-6 animate-pulse" />
                   <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.4em]">Agentic Governance</h2>
                   <p className="text-white/40 mt-4 max-w-lg font-terminal text-sm">
                      [ SYNCING SUPERAGI / OPENCLAW... ] <br/>
                      Monitoring background automation flows.
                   </p>
                </motion.div>
             )}

             {activeTab === 'telephony' && (
                <motion.div 
                   key="telephony"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                >
                   <PhoneCall className="w-20 h-20 text-amethyst mb-6 animate-pulse" />
                   <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.4em]">PhoneClaw Edge</h2>
                   <p className="text-white/40 mt-4 max-w-lg font-terminal text-sm">
                      [ ANDROID_NODE_ARMED :: SIP_HARDENED ] <br/>
                      Managing PhoneClaw, 3CX integration, and persona souls.
                   </p>
                </motion.div>
             )}

             {activeTab === 'omni' && (
                <motion.div 
                   key="omni"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                >
                   <Route className="w-20 h-20 text-amethyst mb-6 animate-pulse" />
                   <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.4em]">Omni-Routing</h2>
                   <p className="text-white/40 mt-4 max-w-lg font-terminal text-sm">
                      [ DEDICATED ENGINEERING STAFF STANDBY ] <br/>
                      Optimizing cross-engine LLM latency.
                   </p>
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
