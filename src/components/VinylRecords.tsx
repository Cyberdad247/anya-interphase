import React from "react";
import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward } from "lucide-react";

const ALBUMS = [
  { id: 1, title: "Lattice Radiant", artist: "Anya_Ω", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop", color: "#7851A9" },
  { id: 2, title: "Kinetic Purity", artist: "Lukas_Ω", cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop", color: "#D4AF37" },
  { id: 3, title: "Sovereign Soul", artist: "Sir Boris", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop", color: "#9966CC" },
];

export const VinylRecords: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = React.useState(ALBUMS[0]);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Active Vinyl Player */}
        <div className="relative group">
           <motion.div 
              key={activeAlbum.id}
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="w-64 h-64 md:w-80 md:h-80 relative z-10"
           >
              <img 
                 src={activeAlbum.cover} 
                 alt={activeAlbum.title}
                 className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-royal-gold/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           </motion.div>
           
           {/* The Spinning Vinyl */}
           <motion.div 
              className="absolute top-0 right-[-40px] w-64 h-64 md:w-80 md:h-80 bg-[#111] rounded-full border-[10px] border-[#222] shadow-2xl flex items-center justify-center overflow-hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           >
              <div className="w-full h-full opacity-20 bg-[repeating-radial-gradient(circle,_#000_0%,_#000_2px,_#222_3px,_#222_4px)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full border-4 border-royal-gold bg-obsidian overflow-hidden">
                    <img src={activeAlbum.cover} className="w-full h-full object-cover opacity-60" />
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Player Controls */}
        <div className="flex-1 space-y-6 text-center md:text-left relative z-20">
           <div>
              <h2 className="text-4xl font-sovereign text-royal-gold uppercase tracking-[0.2em]">{activeAlbum.title}</h2>
              <p className="text-xl text-amethyst font-terminal mt-2">{activeAlbum.artist}</p>
           </div>

           <div className="flex justify-center md:justify-start items-center gap-8">
              <SkipBack className="w-6 h-6 text-royal-gold/40 cursor-pointer hover:text-royal-gold transition-colors" />
              <div className="w-16 h-14 rounded-full bg-royal-gold flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                 <Play className="w-6 h-6 text-obsidian fill-obsidian" />
              </div>
              <SkipForward className="w-6 h-6 text-royal-gold/40 cursor-pointer hover:text-royal-gold transition-colors" />
           </div>

           <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-terminal text-white/40">
                 <span>Frequency Analysis</span>
                 <span>88.2 kHz // 24-bit</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                    className="h-full bg-royal-gold"
                    animate={{ width: ["20%", "80%", "40%", "95%", "60%"] }}
                    transition={{ duration: 5, repeat: Infinity }}
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-3 gap-6 mt-auto">
         {ALBUMS.map((album) => (
            <button 
               key={album.id}
               onClick={() => setActiveAlbum(album)}
               className={`glass-panel p-4 rounded-xl border transition-all text-left ${activeAlbum.id === album.id ? 'border-royal-gold glow-gold' : 'border-white/10 hover:border-white/30'}`}
            >
               <h4 className="text-[10px] font-bold text-royal-gold uppercase truncate">{album.title}</h4>
               <p className="text-[9px] text-white/40 font-terminal uppercase mt-1">{album.artist}</p>
            </button>
         ))}
      </div>
    </div>
  );
};
