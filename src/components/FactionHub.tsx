import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Database, Cpu } from "lucide-react";

const KNIGHTS = [
  { id: 'boris', name: 'SIR_BORIS', role: 'Pilot', layer: 'L5', model: 'Claude 3.5 Sonnet', weight: '0.85', color: '#9966CC' },
  { id: 'helio', name: 'SIR_HELIO', role: 'Context', layer: 'L7', model: 'Gemini 3.1 Pro', weight: '0.90', color: '#7851A9' },
  { id: 'codex', name: 'SIR_CODEX', role: 'Velocity', layer: 'L3', model: 'GPT-4o', weight: '0.75', color: '#D4AF37' },
  { id: 'forge', name: 'SIR_FORGE', role: 'Kinetic', layer: 'L2', model: 'Llama 3 70B', weight: '0.80', color: '#B5A642' },
  { id: 'link', name: 'SIR_LINK', role: 'Bridge', layer: 'L5', model: 'Gemini 3.1 Flash', weight: '0.95', color: '#7851A9' },
  { id: 'ghost', name: 'SIR_GHOST', role: 'Privacy', layer: 'L5', model: 'Qwen 2.5', weight: '1.00', color: '#333' },
  { id: 'liberte', name: 'SIR_LIBERTE', role: 'Sovereign', layer: 'L5', model: 'DeepSeek-V3', weight: '0.80', color: '#9966CC' },
  { id: 'midas', name: 'SIR_MIDAS', role: 'Optimizer', layer: 'L3', model: 'DeepSeek-R1', weight: '0.95', color: '#D4AF37' },
  { id: 'mnemo', name: 'SIR_MNEMO', role: 'Memory', layer: 'L3', model: 'SurrealDB', weight: '0.85', color: '#B5A642' },
];

export const FactionHub: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KNIGHTS.map((k, idx) => (
          <motion.div
            key={k.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl border-l-4 relative group overflow-hidden"
            style={{ borderLeftColor: k.color }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Shield className="w-20 h-20" />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
               <div>
                  <h3 className="text-xl font-sovereign text-royal-gold tracking-widest">{k.name}</h3>
                  <p className="text-[10px] uppercase text-white/40 font-terminal mt-1">{k.role} // {k.layer}</p>
               </div>
               <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] font-terminal text-royal-gold">W={k.weight}</span>
               </div>
            </div>

            <div className="space-y-4 relative z-10">
               <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-white/5">
                  <Cpu className="w-4 h-4 text-amethyst" />
                  <span className="text-[10px] font-terminal uppercase">{k.model}</span>
               </div>
               
               <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/60">
                  <span>Soul_Spark :: Synchronized</span>
                  <Zap className="w-3 h-3 text-amethyst animate-pulse" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="glass-panel p-6 rounded-2xl border border-white/5 mt-auto">
         <h4 className="text-royal-gold text-[10px] uppercase tracking-[0.3em] font-terminal mb-4 flex items-center gap-2">
            <Database className="w-3 h-3" /> Faction_Integration_Matrix
         </h4>
         <p className="text-xs text-white/40 font-terminal leading-relaxed">
            All Knights are currently bridged via the Saltare Gateway. Souls are backed up to the UKG memory graph every 600s. 
            Kinetic purity law is enforced for all L1 movement tasks.
         </p>
      </div>
    </div>
  );
};
