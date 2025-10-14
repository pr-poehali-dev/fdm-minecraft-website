import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface Clan {
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  level: number;
}

interface ClansPreviewSectionProps {
  clans: Clan[];
}

export const ClansPreviewSection = ({ clans }: ClansPreviewSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Кланы сервера</h2>
        <Button 
          onClick={() => navigate("/clans")}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all shadow-lg"
        >
          <Icon name="Shield" size={20} className="mr-2" />
          Посмотреть все кланы
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clans.slice(0, 3).map((clan, index) => (
          <Card 
            key={index} 
            className={`bg-gradient-to-br ${clan.color} border-0 p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg`}
            onClick={() => navigate("/clans")}
          >
            <div className="flex flex-col items-center text-center space-y-3 text-white">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                {clan.name === "Orthodox" ? (
                  <div className="text-4xl">✝️</div>
                ) : (
                  <Icon name={clan.icon as any} size={32} />
                )}
              </div>
              <h3 className="text-lg font-bold">{clan.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
