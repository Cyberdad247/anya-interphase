import React, { useState } from "react";
import { Eye, Monitor, Maximize2, Zap, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const OmniEye: React.FC = () => {
  const [isSiphoning, setIsSiphoning] = useState(false);
  const [streamQuality, setStreamQuality] = useState(70);

  return (
    <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden border-2 border-royal-gold/20 relative group">
      <div className="bg-royal-gold/10 p-4 flex justify-between items-center border-b border-royal-gold/30">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isSiphoning ? 'bg-amethyst animate-pulse shadow-[0_0_8px_#9966CC]' : 'bg-white/20'}`} />
          <span className="text-[11px] font-sovereign text-royal-gold uppercase tracking-[0.2em]">Project :: OMNI_EYE</span>
        </div>
        <div className="flex gap-4 items-center">
           <div className="flex items-center gap-2 mr-4 bg-black/40 px-2 py-0.5 rounded border border-white/5">
              <span className="text-[8px] text-white/40 uppercase font-terminal">Quality: {streamQuality}%</span>
           </div>
           <button onClick={() => setStreamQuality(q => q === 100 ? 50 : q + 10)} className="bg-transparent border-none p-0 outline-none" title="Adjust Siphon Quality">
              <Settings className="w-4 h-4 text-royal-gold/60 cursor-pointer hover:text-amethyst transition-colors" />
           </button>
           <button onClick={() => window.location.reload()} className="bg-transparent border-none p-0 outline-none" title="Re-sync Siphon">
              <Zap className="w-4 h-4 text-royal-gold/60 cursor-pointer hover:text-amethyst transition-colors" />
           </button>
           <div title="Maximize Vision">
              <Maximize2 className="w-4 h-4 text-royal-gold/60 cursor-pointer hover:text-amethyst transition-colors" />
           </div>
        </div>
      </div>

      <div className="relative flex-1 bg-black/40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isSiphoning ? (
            <motion.div 
              key="standby"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                 <Monitor className="w-20 h-16 text-royal-gold/10" />
                 <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                 >
                    <Eye className="w-8 h-8 text-royal-gold/20" />
                 </motion.div>
              </div>
              <button 
                onClick={() => setIsSiphoning(true)}
                className="group relative px-8 py-3 overflow-hidden border border-royal-gold/40 rounded-lg hover:border-royal-gold transition-all"
              >
                <div className="absolute inset-0 bg-royal-gold/0 group-hover:bg-royal-gold/5 transition-colors" />
                <span className="relative text-[10px] uppercase tracking-[0.3em] text-royal-gold font-terminal font-bold">Initialize Visual Siphon</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="live"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full p-6"
            >
              <div className="w-full h-full border border-amethyst/40 rounded-lg relative overflow-hidden bg-obsidian">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_#7851A9_0%,_transparent_70%)]" />
                
                {/* Simulated UI Overlay */}
                <div className="absolute top-6 left-6 space-y-2 z-10">
                   <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-amethyst/30 rounded">
                      <Zap className="w-3 h-3 text-amethyst" />
                      <span className="text-[9px] font-terminal text-amethyst uppercase">Stream: 100.118.224.52</span>
                   </div>
                   <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 border border-royal-gold/30 rounded">
                      <span className="text-[9px] font-terminal text-royal-gold uppercase">Secure_PTY :: Active</span>
                   </div>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                   <motion.div 
                      className="text-amethyst/30 font-terminal text-5xl tracking-tighter select-none"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                   >
                      [ ENCRYPTED ]
                   </motion.div>
                   <p className="text-[10px] uppercase tracking-widest text-amethyst/40 font-terminal">Waiting for Tailscale Handshake...</p>
                </div>
                
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amethyst/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amethyst/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amethyst/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amethyst/60" />
              </div>
              <button 
                onClick={() => setIsSiphoning(false)}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-royal-crimson/10 border border-royal-crimson/40 text-royal-crimson text-[9px] uppercase tracking-widest rounded hover:bg-royal-crimson/20 transition-all"
              >
                Terminate Siphon
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
