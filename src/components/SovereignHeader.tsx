import React from "react";
import { Shield, Radio } from "lucide-react";
import { motion } from "framer-motion";

export const SovereignHeader: React.FC = () => {
  const [coherence, setCoherence] = React.useState(99.8);
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  React.useEffect(() => {
     if (!isOnline) setCoherence(0);
     else setCoherence(98.5 + Math.random() * 1.4);
  }, [isOnline]);

  return (
    <header className="flex justify-between items-center p-6 glass-panel border-b-2 border-royal-gold/30 relative z-20">
      <div className="flex items-center gap-4">
        <Shield className="text-royal-gold w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        <div>
          <h1 className="text-2xl font-sovereign tracking-[0.2em] text-royal-gold uppercase">Camelot Edge</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-royal-gold/60 font-terminal">L7_ETHEREAL // RADIANT_SINGULARITY</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-amethyst uppercase tracking-widest font-terminal">Neural_Link</span>
            <div className="w-40 h-1 bg-white/5 rounded-full overflow-hidden border border-amethyst/20" role="progressbar" aria-label="Neural Link Stability">
              <motion.div
                className="h-full bg-amethyst shadow-[0_0_8px_#9966CC]"
                initial={{ width: "0%" }}
                animate={{ width: isOnline ? "98%" : "0%" }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
          <span className="text-[10px] text-royal-gold/80 mt-1 font-terminal uppercase">Sync Coherence: {coherence.toFixed(1)}%</span>
          </div>

          <button 
            className="relative group cursor-pointer bg-transparent border-none p-0 outline-none"
            aria-label="Toggle System Broadcast"
            title="System Broadcast"
          >
          <motion.div
            className="w-14 h-14 rounded-full border-2 border-royal-gold flex items-center justify-center bg-royal-gold/5 glow-gold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Radio className="text-royal-gold w-7 h-7" />
          </motion.div>
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-obsidian animate-pulse shadow-[0_0_10px_#9966CC] ${isOnline ? 'bg-amethyst' : 'bg-royal-crimson'}`} />
          </button>

      </div>
    </header>
  );
};
