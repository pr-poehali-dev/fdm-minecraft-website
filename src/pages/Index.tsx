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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(128);
  const [isLoading, setIsLoading] = useState(false);
  const [onlineHistory, setOnlineHistory] = useState<Array<{time: string, players: number}>>([]);
  const onlinePercentage = (onlinePlayers / maxPlayers) * 100;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      level: 45
    },
    {
      name: "Анархисты",
      description: "Клан Анархистов, отделившийся от Красного Рассвета, был основан CATAHA и вскоре к нему присоединился _GACHI_MAN. Они построили знаменитую базу Свободу, которую частично загриферил Darkmen, а затем уничтожили сами Анархисты. После потери базы они создали базу Паскуда под командованием MineFaha, но и она была уничтожена. Клан распался после того, как аккаунт GACHI_MAN был взломан, а Сатана раздавал нелегальные вещи",
      icon: "Flame",
      color: "from-gray-700 to-slate-600",
      level: 32
    },
    {
      name: "Орден Зелёной Звезды",
      description: "Fr0o0Zzzy основал \"Орден Зелёной Звезды\", который развился после разрушения баз \"Восход\" и \"Свобода\". Клан объявил войну \"Красному рассвету\", строил базы и мап-арты. После ухода Fr0o0Zzzy, клан пережил кризис, возрождение под руководством denis5556, объединение с \"Красным рассветом\" и, в конечном итоге, упадок",
      icon: "Star",
      color: "from-green-600 to-emerald-500",
      level: 35
    },
    {
      name: "Orthodox",
      description: "Клан основан владельцем сервера Freeman. Попасть в него очень сложно - принцип отбора неизвестен. Несмотря на кажущуюся мирность, вёл две войны против игроков Гурончика и Синаила, одержав победу в обеих",
      icon: "Crown",
      color: "from-blue-600 to-cyan-500",
      level: 38
    },
    {
      name: "Торговая Федерация",
      description: "Основана Серена Ямано. Изначально помогала новичкам, но переключилась на торговлю ресурсами. Во время войны между Рассветом и Семгаку Серена продавал информацию о базах обеим сторонам, нажив огромное состояние на конфликте",
      icon: "Coins",
      color: "from-purple-600 to-indigo-500",
      level: 52
    },
    {
      name: "Пурпурный Закат",
      description: "Создан sanchopancho, стремившимся к силе Красного Рассвета. Первая база Закат стала легендарной, но угасла. Сайранос возродил клан, построив подземную базу, которую уничтожили. Клан запомнился тем, что воспитал сильных и самостоятельных игроков",
      icon: "Sunset",
      color: "from-purple-600 to-pink-500",
      level: 41
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg">
                <Icon name="Pickaxe" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Freeman's Anarchy
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Анархия сервер</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('features');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm lg:text-base"
              >
                Особенности
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('rules');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm lg:text-base"
              >
                Правила
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('clans');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm lg:text-base"
              >
                Кланы
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('social');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs sm:text-sm lg:text-base"
              >
                Соц. сети
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-8 h-8 lg:w-9 lg:h-9"
              >
                <Icon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 lg:w-5 lg:h-5" 
                />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm sm:text-base"
                onClick={() => {
                  const section = document.getElementById('features');
                  section?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                Особенности
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm sm:text-base"
                onClick={() => {
                  const section = document.getElementById('rules');
                  section?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                Правила
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm sm:text-base"
                onClick={() => {
                  const section = document.getElementById('clans');
                  section?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                Кланы
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm sm:text-base"
                onClick={() => {
                  const section = document.getElementById('social');
                  section?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                Соц. сети
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm sm:text-base"
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                <Icon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
                />
                {isDarkMode ? "Светлая тема" : "Тёмная тема"}
              </Button>
            </div>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20">
          <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block">
              <div className="flex items-center gap-2 sm:gap-3 bg-primary/10 rounded-full px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 border border-primary/20">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm lg:text-base font-medium">Сервер онлайн</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Freeman's Anarchy
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              Истинная анархия без привилегий. Выживай, сражайся, строй империю в мире полной свободы
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4">
              <Button 
                size="lg" 
                onClick={copyIP}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 h-auto w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Icon name="Copy" className="mr-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Скопировать IP
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/wiki')}
                className="border-primary/20 hover:bg-primary/10 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 h-auto w-full sm:w-auto"
              >
                <Icon name="BookOpen" className="mr-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                Открыть Wiki
              </Button>
            </div>

            <div className="inline-block bg-muted/50 backdrop-blur-sm rounded-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-border/50">
              <code className="text-base sm:text-lg lg:text-xl font-mono text-primary">
                go.fdm.su
              </code>
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Icon name="Users" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Онлайн игроков</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">В реальном времени</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchServerStatus}
                  disabled={isLoading}
                  className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2"
                >
                  <Icon 
                    name="RefreshCw" 
                    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${isLoading ? 'animate-spin' : ''}`} 
                  />
                </Button>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex items-end gap-2 sm:gap-3 lg:gap-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    {onlinePlayers}
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-1 sm:mb-1.5 lg:mb-2">
                    / {maxPlayers}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                    <span className="text-muted-foreground">Заполненность</span>
                    <span className="font-semibold">{onlinePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={onlinePercentage} className="h-2 sm:h-3 lg:h-4" />
                </div>

                {onlineHistory.length > 0 && (
                  <div className="mt-4 sm:mt-6 lg:mt-8">
                    <h4 className="text-xs sm:text-sm lg:text-base font-medium mb-2 sm:mb-3 lg:mb-4 text-muted-foreground">
                      История онлайна
                    </h4>
                    <div className="h-48 sm:h-56 lg:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={onlineHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis 
                            dataKey="time" 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={10}
                            className="sm:text-xs lg:text-sm"
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={10}
                            className="sm:text-xs lg:text-sm"
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                            className="sm:text-sm lg:text-base"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="players" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                            className="sm:stroke-[2.5px] lg:stroke-[3px]"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>

        <section 
          id="features"
          ref={(el) => (sectionRefs.current['features'] = el)}
          className={`container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20 transition-all duration-1000 ${
            visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Особенности сервера
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              Уникальные возможности для незабываемого опыта игры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name={feature.icon as any} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section 
          id="rules"
          ref={(el) => (sectionRefs.current['rules'] = el)}
          className={`container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20 transition-all duration-1000 ${
            visibleSections.has('rules') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Правила сервера
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              Простые правила для комфортной игры всех участников
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {serverRules.map((rule, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 sm:p-6 lg:p-8 text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon name={rule.icon as any} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2">{rule.title}</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section 
          id="clans"
          ref={(el) => (sectionRefs.current['clans'] = el)}
          className={`container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20 transition-all duration-1000 ${
            visibleSections.has('clans') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Легендарные кланы
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              История великих объединений игроков сервера
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {clans.map((clan, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${clan.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${clan.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon name={clan.icon as any} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="bg-primary/10 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                      <span className="text-xs sm:text-sm font-semibold">LVL {clan.level}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">{clan.name}</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {clan.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section 
          id="social"
          ref={(el) => (sectionRefs.current['social'] = el)}
          className={`container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20 transition-all duration-1000 ${
            visibleSections.has('social') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Присоединяйся к нам
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
              Будь частью нашего сообщества в социальных сетях
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 sm:p-6 lg:p-8 text-center space-y-3 sm:space-y-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${social.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon name={social.icon as any} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold">{social.name}</h3>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-primary/20 bg-background/80 backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Icon name="Pickaxe" className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <span className="text-base sm:text-lg lg:text-xl font-bold">Freeman's Anarchy</span>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                Истинная анархия без привилегий. Выживай, сражайся, строй империю.
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Навигация</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const section = document.getElementById('features');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Особенности
                </button>
                <button
                  onClick={() => {
                    const section = document.getElementById('rules');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Правила
                </button>
                <button
                  onClick={() => {
                    const section = document.getElementById('clans');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Кланы
                </button>
                <button
                  onClick={() => navigate('/wiki')}
                  className="block text-xs sm:text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Wiki
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Подключение</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="bg-muted/50 rounded-lg p-2 sm:p-3">
                  <code className="text-xs sm:text-sm lg:text-base font-mono text-primary">go.fdm.su</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyIP}
                  className="w-full text-xs sm:text-sm lg:text-base py-1.5 sm:py-2"
                >
                  <Icon name="Copy" className="mr-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  Скопировать IP
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12 pt-6 sm:pt-8 border-t border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center sm:text-left">
                2024 Freeman's Anarchy. Все права защищены.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name={social.icon as any} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <Icon name="ArrowUp" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
