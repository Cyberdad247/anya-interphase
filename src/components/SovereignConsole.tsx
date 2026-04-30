import React, { useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

export const SovereignConsole: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const initTerminal = async () => {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      await import("@xterm/xterm/css/xterm.css");

      const term = new Terminal({
        theme: {
          background: "#0A0A0A",
          foreground: "#9966CC",
          cursor: "#D4AF37",
          selectionBackground: "rgba(153, 102, 204, 0.3)",
        },
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 12,
        lineHeight: 1.2,
        cursorBlink: true,
        allowTransparency: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current!);
      fitAddon.fit();

      term.writeln("\x1b[1;33m[SYSTEM_BOOT]\x1b[0m Synchronizing with Spire Edge...");
      term.writeln("\x1b[1;32m[OK]\x1b[0m Bifrost Identity Verified: \x1b[1;36mSovereign\x1b[0m");
      term.writeln("\x1b[1;32m[OK]\x1b[0m Tailscale Tunnel Active: \x1b[1;36m100.118.224.52\x1b[0m");
      term.writeln("");
      term.write("\x1b[1;33mSovereign@Camelot-OS>\x1b[0m ");

      const handleResize = () => fitAddon.fit();
      window.addEventListener("resize", handleResize);

      return () => {
        term.dispose();
        window.removeEventListener("resize", handleResize);
      };
    };

    initTerminal();
  }, []);

  return (
    <div className="h-[25vh] md:h-64 glass-panel border-t-2 border-royal-gold/30 flex flex-col rounded-t-xl overflow-hidden mt-6">
       <div className="bg-black/80 px-4 py-2 flex items-center gap-3 border-b border-royal-gold/20">
          <TerminalIcon className="w-3 h-3 text-royal-gold" />
          <span className="text-[10px] font-terminal text-royal-gold uppercase tracking-[0.2em] font-bold">Sovereign_Console_v4.1 // KINETIC_PURE</span>
       </div>
       <div ref={terminalRef} className="flex-1 p-2" />
    </div>
  );
};
