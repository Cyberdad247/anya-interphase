import React from "react";
import { motion } from "framer-motion";
import { Sword, Trophy, CheckCircle2, Clock } from "lucide-react";

const QUESTS = [
  { id: 0, title: "Resolve 3CX Shatterpoint", difficulty: "Heroic", reward: "250 XP", status: "In Progress", progress: 10, knight: "SIR_FORGE" },
  { id: 1, title: "Liquidate Technical Debt", difficulty: "Heroic", reward: "500 XP", status: "In Progress", progress: 65, knight: "SIR_MIDAS" },
  { id: 2, title: "Enforce Kinetic Purity", difficulty: "Legendary", reward: "1 Gold Mark", status: "Verified", progress: 100, knight: "SIR_ALEX" },
  { id: 3, title: "Siphon Multimodal Context", difficulty: "Common", reward: "100 XP", status: "Active", progress: 30, knight: "ANYA_Ω" },
  { id: 4, title: "Harden Bifrost Sockets", difficulty: "Heroic", reward: "300 XP", status: "Pending", progress: 0, knight: "SIR_SENTINEL" },
];

export const QuestLog: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.3em] flex items-center gap-4">
           <Sword className="w-8 h-8" /> Active_Crusade
        </h2>
        <div className="flex gap-6">
           <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-royal-gold/20">
              <Trophy className="w-4 h-4 text-royal-gold" />
              <span className="text-[10px] font-terminal text-royal-gold uppercase">Rank: Knight_Commander</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar">
        {QUESTS.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-panel p-6 rounded-2xl border-l-4 relative group ${q.status === 'Verified' ? 'border-l-amethyst bg-amethyst/5' : 'border-l-royal-gold bg-white/5'}`}
          >
            <div className="flex justify-between items-start">
               <div className="flex gap-4">
                  <div className={`p-3 rounded-xl bg-black/40 border ${q.status === 'Verified' ? 'border-amethyst/40' : 'border-white/10'}`}>
                     {q.status === 'Verified' ? <CheckCircle2 className="w-5 h-5 text-amethyst" /> : <Clock className="w-5 h-5 text-royal-gold" />}
                  </div>
                  <div>
                     <h3 className="text-xl font-sovereign text-royal-gold tracking-widest">{q.title}</h3>
                     <p className="text-[9px] uppercase text-white/40 font-terminal mt-1">
                        {q.difficulty} // Reward: {q.reward} // Knight: {q.knight}
                     </p>
                  </div>
               </div>
               <div className="text-right">
                  <span className={`text-[10px] font-terminal uppercase ${q.status === 'Verified' ? 'text-amethyst' : 'text-royal-gold'}`}>
                     {q.status}
                  </span>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                     <motion.div
                        className={`h-full ${q.status === 'Verified' ? 'bg-amethyst' : 'bg-royal-gold'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${q.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                     />
                  </div>
               </div>
            </div>

            {/* Tactical Hover Effect */}
            <div className="absolute inset-0 bg-royal-gold/0 group-hover:bg-royal-gold/5 transition-colors pointer-events-none rounded-2xl" />
          </motion.div>
        ))}
      </div>
      
      <button className="w-full py-4 mt-auto glass-panel border border-royal-gold/20 text-royal-gold text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-royal-gold/10 transition-all flex items-center justify-center gap-3">
         <Sword className="w-4 h-4" /> Forge New Quest
      </button>
    </div>
  );
};
