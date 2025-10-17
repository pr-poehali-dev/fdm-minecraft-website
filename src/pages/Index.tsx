import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(128);
  const [isLoading, setIsLoading] = useState(false);
  const [onlineHistory, setOnlineHistory] = useState<Array<{time: string, players: number}>>([]);
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
      const response = await fetch('https://functions.poehali.dev/3cdd085b-a675-4bdc-a58c-4bbfa9f6d49a');
      const data = await response.json();
      
      if (data.online !== undefined && data.max !== undefined) {
        setOnlinePlayers(data.online);
        setMaxPlayers(data.max);
        
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setOnlineHistory(prev => {
          const newHistory = [...prev, { time: timeStr, players: data.online }];
          return newHistory.slice(-20);
        });
      }
    } catch (error) {
      console.error('Failed to fetch server status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);
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
      description: "Запрещены читы и дюпы",
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
    {
      name: "Nyx",
      url: "https://nyx-app.ru/#/dashboard/accept-invite/oDTpeutumixj",
      icon: "Gamepad2",
      color: "bg-gradient-to-br from-purple-700 to-pink-600"
    },
  ];

  const clans = [
    {
      name: "Красный Рассвет",
      description: "Старейший и крупнейший клан сервера. Основан _GACHI_MAN с первыми участниками Waseee и PRO100DIMA. Пережил множество войн с Terrible Dream, ОЗЗ и Анархистами. После ухода основателя клан возродил lopalopa, создав легендарные базы Союз и Восход. Так же главой был игрок под ником Lyntik7884. Сейчас главой является Hemister_Hunter",
      icon: "Sunrise",
      color: "from-red-600 to-orange-500",
      members: 127,
      level: 45
    },
    {
      name: "Анархисты",
      description: "Клан Анархистов, отделившийся от Красного Рассвета, был основан CATAHA и вскоре к нему присоединился _GACHI_MAN. Они построили знаменитую базу Свободу, которую частично загриферил Darkmen, а затем уничтожили сами Анархисты. После потери базы они создали базу Паскуда под командованием MineFaha, но и она была уничтожена. Клан распался после того, как аккаунт GACHI_MAN был взломан, а Сатана раздавал нелегальные вещи",
      icon: "Flame",
      color: "from-gray-700 to-slate-600",
      members: 64,
      level: 32
    },
    {
      name: "Орден Зелёной Звезды",
      description: "Fr0o0Zzzy основал \"Орден Зелёной Звезды\", который развился после разрушения баз \"Восход\" и \"Свобода\". Клан объявил войну \"Красному рассвету\", строил базы и мап-арты. После ухода Fr0o0Zzzy, клан пережил кризис, возрождение под руководством denis5556, объединение с \"Красным рассветом\" и, в конечном итоге, упадок",
      icon: "Star",
      color: "from-green-600 to-emerald-500",
      members: 76,
      level: 35
    },
    {
      name: "Orthodox",
      description: "Клан основан владельцем сервера Freeman. Попасть в него очень сложно - принцип отбора неизвестен. Несмотря на кажущуюся мирность, вёл две войны против игроков Гурончика и Синаила, одержав победу в обеих",
      icon: "Crown",
      color: "from-blue-600 to-cyan-500",
      members: 98,
      level: 38
    },
    {
      name: "Торговая Федерация",
      description: "Основана Серена Ямано. Изначально помогала новичкам, но переключилась на торговлю ресурсами. Во время войны между Рассветом и Семгаку Серена продавал информацию о базах обеим сторонам, нажив огромное состояние на конфликте",
      icon: "Coins",
      color: "from-purple-600 to-indigo-500",
      members: 156,
      level: 52
    },
    {
      name: "Пурпурный Закат",
      description: "Создан sanchopancho, стремившимся к силе Красного Рассвета. Первая база Закат стала легендарной, но угасла. Сайранос возродил клан, построив подземную базу, которую уничтожили. Клан запомнился тем, что воспитал сильных и самостоятельных игроков",
      icon: "Sunset",
      color: "from-purple-600 to-pink-500",
      members: 89,
      level: 41
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Freedom
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/gallery")}
              className="text-foreground hover:text-primary transition-colors minecraft-button"
            >
              <Icon name="Image" size={18} className="mr-2" />
              Галерея
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/history")}
              className="text-foreground hover:text-primary transition-colors minecraft-button"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              Наша История
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/clans")}
              className="text-foreground hover:text-primary transition-colors minecraft-button"
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Кланы
            </Button>
            <a 
              href="https://fdm.trademc.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all minecraft-button">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                🛍️ Магазин
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-16 relative z-10">
        <header className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/ed2a512b-705a-419a-8380-9f3dfc415729.jpg" 
              alt="Ванильная эпоха - Freedom Server" 
              className="w-full max-w-3xl rounded-lg shadow-2xl border-4 border-primary/40 minecraft-card"
              style={{animation: "float 3s ease-in-out infinite"}}
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow minecraft-text">
              ⛏️ Freedom ⚔️
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Гриферский сервер • Версия 1.20.1
            </p>
          </div>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-orange-500/50 p-8 max-w-2xl mx-auto shadow-2xl hover:shadow-orange-500/30 transition-all">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgMCBNIC0xMCA1MCBMIDUwIC0xMCBNIDI1IDUwIEwgNTAgMjUiIHN0cm9rZT0icmdiYSgyNTUsMTY1LDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex justify-center mb-2">
                <Icon name="Zap" size={48} className="text-orange-500 animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-center leading-tight">
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg" style={{textShadow: "0 0 30px rgba(255,165,0,0.3)"}}>
                  Импровизируй
                </span>
                <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg" style={{textShadow: "0 0 30px rgba(255,0,100,0.3)"}}>
                  Адаптируйся
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg" style={{textShadow: "0 0 30px rgba(150,0,255,0.3)"}}>
                  Преодолевай
                </span>
              </h2>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 rounded-full"></div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-2 border-primary/40 p-8 max-w-4xl mx-auto shadow-2xl hover:shadow-primary/30 transition-all">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Народ, все чухня. Играйте на лучшем Minecraft-сервере мира (но это не точно) Freedom!
              </h2>
              
              <p className="text-base md:text-lg text-center text-muted-foreground">
                Это самый амбициозный Minecraft-проект за все время (админа), который затрагивает буквально каждый аспект игры (и вашей жизни):
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground">
                    Местные земли на столько изуродованы, что кажется на сервере есть новые биомы, данжи и структуры
                  </p>
                </div>

                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                  <Icon name="Smile" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground">
                    Поддержка кастомных анимаций (Emotecrafts)
                  </p>
                </div>

                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                  <Icon name="Mic" size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground">
                    Поддержка голосового чата прямо в игре (Simple Voice Chat), чтобы твой кореш смог издавать для тебя незабываемые звуки
                  </p>
                </div>

                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                  <Icon name="Zap" size={24} className="text-orange-500 flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground">
                    У местных игроков столько TNT, кристаллов и якорей, что твоя RTX будет создавать динамическое освещение огня прямо в реальности
                  </p>
                </div>

                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                  <Icon name="Sparkles" size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground">
                    Всякие прикалюхи, типа пишешь сообщение, а вокруг тебя такие огоньки: ВЖУХ
                  </p>
                </div>

                <div className="flex gap-3 items-start p-4 bg-card/50 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all minecraft-button"
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

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">График онлайна</h2>
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 shadow-lg">
            <iframe 
              src="https://minecraftrating.ru/server_chart/282092/" 
              width="100%" 
              height="300" 
              frameBorder="0"
              title="График онлайна сервера"
            />
          </Card>
        </section>

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

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">Присоединяйся</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            © 2025 FDM.SU • Лучший гриферский сервер Minecraft
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;