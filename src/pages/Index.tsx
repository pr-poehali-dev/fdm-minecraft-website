import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const { toast } = useToast();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  const [onlinePlayers, setOnlinePlayers] = useState(47);
  const [maxPlayers, setMaxPlayers] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const onlinePercentage = (onlinePlayers / maxPlayers) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fetchServerStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://misterlauncher.org/server/fdm/');
      const html = await response.text();
      
      const onlineMatch = html.match(/\"online\":(\d+)/);
      const maxMatch = html.match(/\"max\":(\d+)/);
      
      if (onlineMatch && maxMatch) {
        setOnlinePlayers(parseInt(onlineMatch[1]));
        setMaxPlayers(parseInt(maxMatch[1]));
      }
    } catch (error) {
      console.error('Failed to fetch server status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText("go.fdm.su");
    toast({
      title: "IP скопирован!",
      description: "go.fdm.su успешно скопирован в буфер обмена",
    });
  };

  const features = [
    { icon: "Flame", title: "Гриферство", desc: "Полная свобода" },
    { icon: "Mic", title: "Voice Chat", desc: "Голосовой чат" },
    { icon: "Zap", title: "Emotecrafts", desc: "Анимации" },
    { icon: "Package", title: "Кастом", desc: "Уникальные предметы" },
  ];

  const serverRules = [
    {
      title: "Без читов",
      description: "Запрещены читы и баги",
      icon: "Shield",
    },
    {
      title: "Свобода",
      description: "Гриферство разрешено",
      icon: "Flame",
    },
    {
      title: "Адекватность",
      description: "Без мата и спама",
      icon: "MessageSquare",
    },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/fd_minec_comments",
      icon: "MessageCircle",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      name: "VK",
      url: "https://vk.ru/fd_minec",
      icon: "Users",
      color: "bg-gradient-to-br from-blue-600 to-indigo-600"
    },
    {
      name: "Discord",
      url: "https://discord.gg/GQrUQKW4xa",
      icon: "MessageSquare",
      color: "bg-gradient-to-br from-indigo-600 to-purple-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-12 space-y-16 relative z-10">
        <header className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="text-7xl md:text-8xl" style={{animation: "float 3s ease-in-out infinite"}}>⛏️</div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              FDM.SU
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Анархия сервер • Версия 1.20.1
            </p>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 max-w-2xl mx-auto shadow-lg hover:shadow-primary/20 transition-all">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
            </div>
            <h3 className="text-sm mb-4 text-center text-foreground font-semibold">
              Онлайн
            </h3>
            <div className="text-center space-y-3">
              <p className="text-4xl font-bold text-primary">
                {isLoading ? '...' : `${onlinePlayers}`}
              </p>
              <p className="text-xs text-muted-foreground">из {maxPlayers} игроков</p>
              <Progress value={onlinePercentage} className="h-2" />
              <button
                onClick={fetchServerStatus}
                className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2 mx-auto"
                disabled={isLoading}
              >
                <Icon name="RefreshCw" size={14} className={isLoading ? 'animate-spin' : ''} />
                Обновить
              </button>
            </div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/30 p-6 hover:scale-105 transition-all shadow-lg">
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

          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 hover:scale-105 transition-all shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-destructive/20 rounded-lg">
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
              <p className="text-muted-foreground text-[0.65rem] leading-relaxed">
                Лучший анархия сервер! Кастомные предметы, голосовой чат, полная свобода действий.
              </p>
            </div>
          </Card>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">Правила сервера</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serverRules.map((rule, index) => (
              <Card
                key={index}
                className="bg-card/60 backdrop-blur-sm border-2 border-border/50 p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon name={rule.icon as any} size={28} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{rule.title}</h3>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">Присоединяйся</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className={`${link.color} border-0 p-6 hover:scale-105 transition-all shadow-lg cursor-pointer`}>
                  <div className="flex flex-col items-center text-center space-y-3 text-white">
                    <Icon name={link.icon as any} size={32} />
                    <h3 className="text-base font-bold">{link.name}</h3>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground">
            © 2025 FDM.SU • Лучший анархия сервер Minecraft
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;