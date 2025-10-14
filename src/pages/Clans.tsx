import { useState } from "react";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { ClansHeader } from "@/components/clans/ClansHeader";
import { ClanCard } from "@/components/clans/ClanCard";
import { CreateClanCTA } from "@/components/clans/CreateClanCTA";
import { clansDetailedData } from "@/data/clansDetailedData";

const Clans = () => {
  const [hoveredClan, setHoveredClan] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <NavigationBar />

      <div className="container mx-auto px-4 py-12 space-y-12 relative z-10">
        <ClansHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clansDetailedData.map((clan, index) => (
            <ClanCard
              key={index}
              clan={clan}
              isHovered={hoveredClan === index}
              onHover={() => setHoveredClan(index)}
              onLeave={() => setHoveredClan(null)}
            />
          ))}
        </div>

        <CreateClanCTA />

        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground">
            © 2025 FDM.SU • Лучший гриферский сервер Minecraft
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Clans;
