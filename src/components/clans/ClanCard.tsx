import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ClanCardProps {
  clan: {
    name: string;
    description: string;
    icon: string;
    color: string;
    bgPattern: string;
    members: number;
    level: number;
    founded: string;
    leader: string;
    status: string;
  };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export const ClanCard = ({ clan, isHovered, onHover, onLeave }: ClanCardProps) => {
  return (
    <Card
      className={`relative overflow-hidden border-2 transition-all duration-500 animate-fade-in-scale ${
        isHovered 
          ? 'scale-105 shadow-2xl border-primary' 
          : 'border-border/50 hover:border-primary/50'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${clan.color} opacity-10 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
      <div className={`absolute inset-0 ${clan.bgPattern}`}></div>
      
      <div className="relative p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${clan.color} rounded-xl shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
              {clan.name === "Orthodox" ? (
                <div className="text-4xl">✝️</div>
              ) : (
                <Icon name={clan.icon as any} size={40} className="text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{clan.name}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  clan.status === "Активен" 
                    ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                    : clan.status === "Объединён"
                    ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                    : "bg-gray-500/20 text-gray-500 border border-gray-500/30"
                }`}>
                  {clan.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/30 min-w-[200px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="Crown" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Глава клана</span>
            </div>
            <div className="text-xl font-bold text-foreground text-center">{clan.leader}</div>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/20">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {clan.description}
          </p>
        </div>

        <div className={`h-2 rounded-full bg-gradient-to-r ${clan.color} shadow-lg`}></div>
      </div>
    </Card>
  );
};