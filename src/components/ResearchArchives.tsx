import React from "react";
import { motion } from "framer-motion";
import { Database, Search, ShieldCheck, FileText, BookOpen } from "lucide-react";

const ARCHIVE_NODES = [
  { id: 1, title: "Chimera Ancestry Agency", type: "Core Lore", tags: ["UKG", "Soul"], coverage: "100%" },
  { id: 2, title: "Project LATTICE_RADIANT", type: "Tech Spec", tags: ["PWA", "Vercel"], coverage: "94%" },
  { id: 3, title: "Kinetic Purity Laws", type: "Protocol", tags: ["Rust", "Go"], coverage: "100%" },
];

export const ResearchArchives: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
         <div className="flex-1 glass-panel p-8 rounded-2xl border-t-4 border-amethyst shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
               <Database className="w-10 h-10 text-amethyst" />
               <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.3em]">NotebookLM archives</h2>
            </div>
            
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-amethyst transition-colors" />
               <input 
                  type="text" 
                  placeholder="Query deep context ancestry..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-14 pr-6 font-terminal text-sm focus:border-amethyst focus:glow-purple outline-none transition-all text-white placeholder:text-white/20"
               />
            </div>
         </div>

         <div className="w-full md:w-80 glass-panel p-6 rounded-2xl border-l-4 border-royal-gold">
            <h3 className="text-[10px] uppercase font-terminal text-royal-gold mb-4 tracking-widest flex items-center gap-2">
               <ShieldCheck className="w-3 h-3" /> Chimera_Audit_Status
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] text-white/40 uppercase">Context Integrity</span>
                  <span className="text-[10px] text-amethyst font-bold">VERIFIED</span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-amethyst" />
               </div>
               <p className="text-[8px] text-white/20 font-terminal leading-relaxed">
                  Every search result is cross-referenced with the NotebookLM UKG fingerprint.
               </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {ARCHIVE_NODES.map((n, idx) => (
            <motion.div 
               key={n.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-amethyst/40 transition-all cursor-pointer group"
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-amethyst/10 transition-colors">
                     {n.id === 1 ? <BookOpen className="w-4 h-4 text-amethyst" /> : <FileText className="w-4 h-4 text-amethyst" />}
                  </div>
                  <span className="text-[9px] uppercase font-terminal text-white/40">{n.type}</span>
               </div>
               <h4 className="text-royal-gold font-sovereign text-lg tracking-widest">{n.title}</h4>
               <div className="flex gap-2 mt-4">
                  {n.tags.map(t => (
                     <span key={t} className="text-[8px] px-2 py-0.5 bg-black/60 border border-white/10 rounded uppercase text-white/60">{t}</span>
                  ))}
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
};
