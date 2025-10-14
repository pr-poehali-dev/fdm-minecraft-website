import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface StatsCardsProps {
  features: Feature[];
}

export const StatsCards = ({ features }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/20 rounded-lg transition-all duration-300 hover:bg-primary/30">
            <Icon name="Users" size={32} className="text-primary" />
          </div>
        </div>
        <h3 className="text-sm mb-4 text-center text-foreground font-semibold">
          Онлайн
        </h3>
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Игроков на go.fdm.su: <b className="text-primary text-2xl"><span data-playercounter-ip="go.fdm.su">0</span></b>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Icon name="RefreshCw" size={14} />
            Обновить
          </button>
        </div>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/30 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-accent/20 rounded-lg">
            <Icon name="Sparkles" size={32} className="text-accent" />
          </div>
        </div>
        <h3 className="text-sm mb-4 text-center text-foreground font-semibold">
          Особенности
        </h3>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 text-xs">
              <Icon name={feature.icon as any} size={16} className="text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{feature.title}</p>
                <p className="text-muted-foreground text-[0.65rem]">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-destructive/20 rounded-lg transition-all duration-300 hover:bg-destructive/30">
            <Icon name="AlertTriangle" size={32} className="text-destructive" />
          </div>
        </div>
        <h3 className="text-sm mb-4 text-center text-foreground font-semibold">
          Важно
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-2 bg-destructive/10 rounded border border-destructive/30">
            <p className="text-destructive font-semibold">⚠️ Forge не поддерживается</p>
            <p className="text-muted-foreground text-[0.65rem] mt-1">Версии 1.20.5 - 1.21.2</p>
          </div>
          <div className="p-2 bg-primary/10 rounded border border-primary/30">
            <p className="text-primary font-semibold">🛡️ Система модерации</p>
            <p className="text-muted-foreground text-[0.65rem] mt-1">Муты, баны, анти-спам система</p>
          </div>
          <p className="text-muted-foreground text-[0.65rem] leading-relaxed">
            Лучший гриферский сервер! Кастомные предметы, голосовой чат, полная свобода действий.
          </p>
        </div>
      </Card>
    </div>
  );
};