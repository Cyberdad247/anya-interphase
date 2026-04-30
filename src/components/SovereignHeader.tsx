import React from "react";
import { Shield, Radio, Trophy, Coins, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const SovereignHeader: React.FC = () => {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const coherence = isOnline ? 99.4 : 0;

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 glass-panel border-b-2 border-royal-gold/30 relative z-20 gap-6">
      <div className="flex items-center gap-4">
        <Shield className="text-royal-gold w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        <div>
          <h1 className="text-2xl font-sovereign tracking-[0.2em] text-royal-gold uppercase">Camelot Edge</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-royal-gold/60 font-terminal">L7_ETHEREAL // PROJECT_CRUSADE</p>
        </div>
      </div>

      {/* Gamified Stats :: The Royal Treasury */}
      <div className="flex gap-4 md:gap-10 bg-black/40 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
         {[
           { icon: Trophy, label: "XP", value: "24.5k", color: "#9966CC" },
           { icon: Coins, label: "Gold", value: "1,240", color: "#D4AF37" },
           { icon: Zap, label: "Energy", value: "98%", color: "#D4AF37" }
         ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default">
               <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] uppercase text-white/40 font-terminal">{stat.label}</span>
                  <span className="text-xs font-bold text-white tracking-wider">{stat.value}</span>
               </div>
            </div>
         ))}
      </div>

      <div className="flex items-center gap-10">
        <div className="hidden lg:flex flex-col items-end">
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
            onClick={() => console.log("System_Broadcast :: Toggling frequency...")}
            className="relative group cursor-pointer bg-transparent border-none p-0 outline-none active:scale-95 transition-transform"
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

