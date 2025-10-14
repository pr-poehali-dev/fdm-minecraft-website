import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  copyIP: () => void;
}

export const HeroSection = ({ copyIP }: HeroSectionProps) => {
  return (
    <header className="text-center space-y-8 animate-fade-in">
      <div className="flex justify-center mb-6">
        <img 
          src="https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856" 
          alt="Freedom Server" 
          className="w-full max-w-3xl rounded-lg shadow-2xl border-2 border-primary/30"
          style={{animation: "float 3s ease-in-out infinite"}}
        />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
          Freedom
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Гриферский сервер • Версия 1.20.1
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-2 border-primary/40 p-8 max-w-4xl mx-auto shadow-2xl hover:shadow-primary/30 transition-all">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Народ, все чухня. Играйте на лучшем Minecraft-сервере мира (но это не точно) Freedom!
          </h2>
          
          <p className="text-base md:text-lg text-center text-muted-foreground">
            Это самый амбициозный Minecraft-проект за все время (админа), который затрагивает буквально каждый аспект игры (и вашей жизни):
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                Местные земли на столько изуродованы, что кажется на сервере есть новые биомы, данжи и структуры
              </p>
            </div>

            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="Smile" size={24} className="text-accent flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                Поддержка кастомных анимаций (Emotecrafts)
              </p>
            </div>

            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="Mic" size={24} className="text-blue-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                Поддержка голосового чата прямо в игре (Simple Voice Chat), чтобы твой кореш смог издавать для тебя незабываемые звуки
              </p>
            </div>

            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="Zap" size={24} className="text-orange-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                У местных игроков столько TNT, кристаллов и якорей, что твоя RTX будет создавать динамическое освещение огня прямо в реальности
              </p>
            </div>

            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="Sparkles" size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                Всякие прикалюхи, типа пишешь сообщение, а вокруг тебя такие огоньки: ВЖУХ
              </p>
            </div>

            <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-card/70 transition-all duration-300">
              <Icon name="Bug" size={24} className="text-red-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                Новые монстры, баги и боссы
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border-2 border-red-500/30">
            <div className="flex gap-3 items-start">
              <Icon name="AlertTriangle" size={24} className="text-red-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-foreground">
                <span className="font-bold text-red-500">Нелегальные предметы</span>, инструменты, ресурсы, шмотки и многое-многое другое за что вас сможет забанить администрация!
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Короче, ваша жизнь никогда не будет прежней)
          </p>
        </div>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 max-w-2xl mx-auto shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs text-muted-foreground">IP для подключения</p>
            <p className="text-3xl md:text-4xl font-bold text-primary">go.fdm.su</p>
            <p className="text-xs text-muted-foreground">Поддержка 1.7 - 1.21.7</p>
          </div>
          <Button
            onClick={copyIP}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all"
          >
            <Icon name="Copy" size={20} className="mr-2" />
            Копировать
          </Button>
        </div>
      </Card>
    </header>
  );
};