import React from "react";
import { OmniEye } from "./OmniEye";
import { SwarmMatrix } from "./SwarmMatrix";
import { QuestLog } from "./QuestLog";
import { Route, PhoneCall, Zap, ShieldCheck } from "lucide-react";

export const TheBridge: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
      {/* Primary Viewport: Visual Siphon */}
      <section className="flex-[2] flex flex-col gap-6 min-h-[400px] lg:min-h-0 overflow-hidden">
         <OmniEye />
         
         {/* Live Performance Matrix (Actionable Telemetry) */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { icon: Route, label: "Omni-Route", val: "42ms", status: "Optimal" },
               { icon: PhoneCall, label: "Voice-Bridge", val: "128ms", status: "Active" },
               { icon: Zap, label: "L2 Kinetic", val: "99.8%", status: "Pure" },
               { icon: ShieldCheck, label: "Chimera", val: "Verified", status: "Synced" }
            ].map((stat, i) => (
               <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                     <stat.icon className="w-3 h-3 text-amethyst" />
                     <span className="text-[8px] text-white/20 uppercase font-terminal">{stat.status}</span>
                  </div>
                  <span className="text-xs font-bold text-royal-gold tracking-widest">{stat.val}</span>
                  <span className="text-[9px] text-white/40 uppercase font-terminal">{stat.label}</span>
               </div>
            ))}
         </div>
      </section>

      {/* Tactical Sidebar: Swarm & Quests */}
      <aside className="flex-1 flex flex-col gap-6 min-h-[300px] lg:min-h-0 overflow-hidden">
         <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6">
            <SwarmMatrix />
            <QuestLog />
         </div>
      </aside>
    </div>
  );
};
