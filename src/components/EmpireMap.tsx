import React from "react";
import { motion } from "framer-motion";
import { Server, Laptop, Tablet, HardDrive } from "lucide-react";

const NODES = [
  { id: 'master', name: 'Camelot_Core', type: 'Server', ip: '100.118.224.52', status: 'Active', x: 50, y: 50 },
  { id: 'mobile', name: 'Sovereign_Mobile', type: 'Tablet', ip: '100.82.14.22', status: 'Active', x: 20, y: 30 },
  { id: 'desktop', name: 'Vizion_Workstation', type: 'Laptop', ip: '127.0.0.1', status: 'Local', x: 80, y: 25 },
  { id: 'vault', name: 'Antigravity_Vault', type: 'HardDrive', ip: '100.115.22.9', status: 'Active', x: 75, y: 75 },
  { id: 'node_alpha', name: 'Edge_Node_Alpha', type: 'Server', ip: '100.90.5.11', status: 'Standby', x: 25, y: 70 },
];

export const EmpireMap: React.FC = () => {
  return (
    <div className="w-full h-full glass-panel rounded-2xl p-10 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#7851A9_0%,_transparent_70%)]" />
         <div className="absolute inset-0 border border-white/5 grid grid-cols-10 grid-rows-10 opacity-20">
            {[...Array(100)].map((_, i) => <div key={i} className="border-[0.5px] border-white/10" />)}
         </div>
      </div>

      <div className="relative z-10 flex justify-between items-center mb-10">
         <div>
            <h2 className="text-3xl font-sovereign text-royal-gold uppercase tracking-[0.4em]">Empire Map</h2>
            <p className="text-[10px] text-white/40 font-terminal uppercase mt-2">Global Kinetic Topology // Tailnet v2.4</p>
         </div>
         <div className="flex gap-4">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-amethyst rounded-full animate-pulse" />
               <span className="text-[9px] text-amethyst uppercase font-terminal">L1_Bifrost_Active</span>
            </div>
         </div>
      </div>

      <div className="flex-1 relative border border-white/5 bg-black/20 rounded-xl">
         {/* Map Lines */}
         <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            {NODES.map((n, i) => i > 0 && (
               <line 
                  key={i}
                  x1={`${NODES[0].x}%`} y1={`${NODES[0].y}%`}
                  x2={`${n.x}%`} y2={`${n.y}%`}
                  stroke="#D4AF37" strokeWidth="1" strokeDasharray="5,5"
               />
            ))}
         </svg>

         {NODES.map((n) => (
            <motion.div
               key={n.id}
               className="absolute group cursor-pointer"
               style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               whileHover={{ scale: 1.1 }}
            >
               <div className="relative">
                  <div className={`p-3 rounded-lg bg-black/80 border-2 transition-all ${n.id === 'master' ? 'border-royal-gold glow-gold' : 'border-white/20 group-hover:border-amethyst group-hover:glow-purple'}`}>
                     {n.type === 'Server' && <Server className="w-6 h-6 text-royal-gold" />}
                     {n.type === 'Laptop' && <Laptop className="w-6 h-6 text-royal-gold" />}
                     {n.type === 'Tablet' && <Tablet className="w-6 h-6 text-royal-gold" />}
                     {n.type === 'HardDrive' && <HardDrive className="w-6 h-6 text-royal-gold" />}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                     <div className="bg-obsidian border border-royal-gold p-3 rounded-lg shadow-2xl text-left">
                        <p className="text-[10px] font-bold text-royal-gold uppercase">{n.name}</p>
                        <p className="text-[9px] text-white/60 font-terminal mt-1">IP: {n.ip}</p>
                        <p className="text-[8px] text-amethyst uppercase font-terminal mt-0.5">Status: {n.status}</p>
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
};
