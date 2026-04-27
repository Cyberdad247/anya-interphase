import React from "react";
import { Settings, Folder, Cpu, ShieldAlert } from "lucide-react";

export const SystemHub: React.FC = () => {
  const PATHS = [
    { name: "Root", path: "C:\\Users\\vizio\\CAMELOT_OS" },
    { name: "Forge", path: "C:\\Users\\vizio\\CAMELOT_OS\\02_FORGE" },
    { name: "Vault", path: "C:\\Users\\vizio\\CAMELOT_OS\\03_VAULT" },
    { name: "Kernel", path: "C:\\Users\\vizio\\CAMELOT_OS\\01_KERNEL" },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
         <Settings className="w-10 h-10 text-amethyst" />
         <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.3em]">System Intelligence Hub</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="glass-panel p-8 rounded-2xl border-l-4 border-royal-gold shadow-2xl">
            <h3 className="text-[10px] uppercase font-terminal text-royal-gold mb-6 tracking-widest flex items-center gap-2">
               <Folder className="w-3 h-3" /> Core_Sovereign_Paths
            </h3>
            <div className="space-y-4">
               {PATHS.map(p => (
                  <div key={p.name} className="bg-black/40 p-3 rounded-lg border border-white/5 flex flex-col">
                     <span className="text-[9px] text-white/40 uppercase font-terminal mb-1">{p.name}</span>
                     <span className="text-xs font-terminal text-amethyst truncate" title={p.path}>{p.path}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl border-l-4 border-amethyst">
               <h3 className="text-[10px] uppercase font-terminal text-royal-gold mb-6 tracking-widest flex items-center gap-2">
                  <Cpu className="w-3 h-3" /> Hardware_Kinetic_Profile
               </h3>
               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-terminal">
                     <span className="text-white/40 uppercase">GPU VRAM</span>
                     <span className="text-royal-gold">DETECTING...</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-terminal">
                     <span className="text-white/40 uppercase">CPU CORES</span>
                     <span className="text-royal-gold">DETECTING...</span>
                  </div>
               </div>
               <button className="w-full mt-6 py-2 bg-amethyst/10 border border-amethyst/40 text-amethyst text-[9px] uppercase tracking-widest rounded hover:bg-amethyst/20 transition-all font-bold">
                  Run Hardware Scan
               </button>
            </div>

            <div className="glass-panel p-8 rounded-2xl border-l-4 border-royal-crimson">
               <h3 className="text-[10px] uppercase font-terminal text-royal-gold mb-6 tracking-widest flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3 text-royal-crimson" /> Security_Critical_Zone
               </h3>
               <div className="bg-royal-crimson/5 border border-royal-crimson/20 p-4 rounded-lg">
                  <p className="text-[9px] text-royal-crimson font-terminal uppercase leading-relaxed">
                     Caution: Manual changes to the Bifrost Sockets or Chimera Audit logs will trigger an immediate System Desync. 
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
