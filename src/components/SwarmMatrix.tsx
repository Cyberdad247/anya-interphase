import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Users, Zap, AlertTriangle } from "lucide-react";

const SPECIES = [
  { id: 'formica', name: 'Formica', role: 'Scout', color: '#7851A9' },
  { id: 'pongid', name: 'Pongid', role: 'Heavy API', color: '#D4AF37' },
  { id: 'castor', name: 'Castor', role: 'Builder', color: '#B5A642' },
  { id: 'arachne', name: 'Arachne', role: 'Crawler', color: '#7851A9' },
  { id: 'simian', name: 'Simian', role: 'Logic', color: '#D4AF37' },
  { id: 'strigiform', name: 'Strigiform', role: 'Oversight', color: '#990000' },
];

export const SwarmMatrix: React.FC = () => {
  const [hasAlert, setHasAlert] = React.useState(true);

  const handleRepair = () => {
     console.log("ACTUATING :: AUTO_FORGE_DEPLOYED");
     setHasAlert(false);
     // In a real system, this would call /v1/repair
  };

  return (
    <div className="w-full h-full flex flex-col gap-4" role="region" aria-label="Swarm Matrix Telemetry">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-royal-gold text-[10px] uppercase tracking-[0.3em] font-terminal flex items-center gap-2">
           <Users className="w-3 h-3" /> Kingdom_of_Jarvis :: Swarm_Active
        </h3>
        <span className="text-[9px] text-amethyst font-terminal uppercase animate-pulse">Scanning_Telemetry...</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
        {SPECIES.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-4 rounded-xl border border-white/5 hover:border-royal-gold/40 transition-all group cursor-pointer"
            role="article"
            aria-label={`Agent Species: ${s.name}`}
          >
            <div className="flex justify-between items-start mb-3">
               <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:glow-gold transition-all">
                  <Cpu className="w-4 h-4 text-royal-gold" />
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[8px] uppercase text-white/40 mb-1">Load</span>
                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                     <motion.div
                        className="h-full bg-amethyst"
                        initial={{ width: "40%" }}
                        animate={{ width: hasAlert ? "15%" : "40%" }}
                     />
                  </div>
               </div>
            </div>

            <h4 className="text-royal-gold text-xs font-sovereign uppercase tracking-widest">{s.name}</h4>      
            <p className="text-[9px] text-white/40 uppercase font-terminal mt-1">{s.role}</p>

            <div className="mt-4 flex items-center justify-between">
               <span className="text-[8px] text-amethyst font-terminal uppercase px-1.5 py-0.5 bg-amethyst/10 rounded">
                  {hasAlert ? "Throttled" : "Idle"}
               </span>
               <Zap className={`w-3 h-3 ${hasAlert ? 'text-royal-crimson animate-pulse' : 'text-amethyst/30'}`} />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Emergency Self-Correction Hook */}
      <AnimatePresence>
        {hasAlert && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel p-4 rounded-xl border-l-4 border-royal-crimson flex items-center justify-between mt-auto"
          >
             <div className="flex items-center gap-4">
                <div className="p-2 bg-royal-crimson/20 rounded-full">
                   <AlertTriangle className="w-4 h-4 text-royal-crimson" />
                </div>
                <div>
                   <p className="text-xs text-white/90 font-bold uppercase tracking-widest">Shatterpoint Detected</p>
                   <p className="text-[9px] text-white/40 font-terminal uppercase mt-0.5">3CX_Handshake_Timeout :: event_bridge.py:142</p>
                </div>
             </div>
             <button 
               onClick={handleRepair}
               className="px-4 py-1.5 bg-royal-crimson/10 border border-royal-crimson/40 text-royal-crimson text-[9px] uppercase tracking-widest rounded hover:bg-royal-crimson transition-all hover:text-white font-bold cursor-pointer"
             >
                Deploy Auto-Forge
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
