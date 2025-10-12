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

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText('go.fdm.su');
      toast({
        title: "IP скопирован!",
        description: "go.fdm.su скопирован в буфер обмена",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать IP",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const gameModes = [
    { name: "Выживание", percentage: 65, color: "bg-[#10B981]" },
    { name: "Креатив", percentage: 25, color: "bg-[#8B4513]" },
    { name: "Мини-игры", percentage: 10, color: "bg-[#DD5016]" },
  ];

  const activityData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    players: Math.floor(Math.random() * 50) + 20,
  }));

  const shopCategories = [
    {
      title: "Инструменты и оружие",
      items: ["Незеритовые мечи", "Кирки", "Топоры"],
      icon: "⛏️",
    },
    {
      title: "Броня и защита",
      items: ["Незеритовая броня", "Щиты", "Элитры"],
      icon: "🛡️",
    },
    {
      title: "Редкие предметы",
      items: ["Звезда Незера", "Тотемы", "Трезубцы"],
      icon: "⭐",
    },
    {
      title: "Ресурсы и блоки",
      items: ["Шалкеровые ящики", "Эндер-сундуки", "Яйца призывания"],
      icon: "📦",
    },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/fd_minec_comments",
      description: "Новости и обновления",
      icon: "MessageCircle",
    },
    {
      name: "VK",
      url: "https://vk.ru/fd_minec",
      description: "Сообщество сервера",
      icon: "Users",
    },
    {
      name: "Discord",
      url: "https://discord.gg/GQrUQKW4xa",
      description: "Чат и поддержка",
      icon: "MessageSquare",
    },
  ];

  const serverRules = [
    {
      title: "Уважение к игрокам",
      description: "Будьте вежливы и уважайте других участников сервера",
      icon: "Heart",
    },
    {
      title: "Честная игра",
      description: "Запрещены читы, дюпы и использование багов",
      icon: "Shield",
    },
    {
      title: "Свобода действий",
      description: "Гриферство разрешено - выживай и защищай свои постройки!",
      icon: "Flame",
    },
    {
      title: "Адекватное поведение",
      description: "Запрещён мат, спам и оскорбления в чате",
      icon: "MessageSquare",
    },
  ];

  const [visitorCount] = useState(Math.floor(Math.random() * 500) + 5000);

  const serverNews = [
    {
      date: "10 октября 2025",
      title: "Обновление 2.0: Новые режимы!",
      description: "Добавлены новые мини-игры и улучшен режим выживания. Ждём всех на сервере!",
      icon: "Sparkles",
    },
    {
      date: "5 октября 2025",
      title: "Конкурс на лучшую постройку",
      description: "Главный приз - 10000 игровой валюты и эксклюзивный набор!",
      icon: "Trophy",
    },
    {
      date: "1 октября 2025",
      title: "Открытие магазина донатов",
      description: "Теперь вы можете приобрести эксклюзивные предметы в нашем магазине",
      icon: "ShoppingCart",
    },
  ];

  const galleryImages = [
    "https://sun9-47.userapi.com/impg/c855128/v855128302/20e5d4/DtKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
    "https://sun9-55.userapi.com/impg/c855128/v855128302/20e5dd/9fKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
    "https://sun9-18.userapi.com/impg/c855128/v855128302/20e5e6/KfKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
    "https://sun9-74.userapi.com/impg/c855128/v855128302/20e5ef/VfKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
    "https://sun9-27.userapi.com/impg/c855128/v855128302/20e5f8/gfKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
    "https://sun9-59.userapi.com/impg/c855128/v855128302/20e601/rfKjHaU4-yE.jpg?size=1280x720&quality=95&sign=5e1f5c1e5e1f5c1e5e1f5c1e5e1f5c1e&type=album",
  ];

  return (
    <div className="min-h-screen bg-[#D2691E] text-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <header className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="text-6xl animate-bounce-pixel">⛏️</div>
          </div>
          <h1 className="text-4xl md:text-6xl text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)] animate-glow">
            FDM.SU
          </h1>
          <p className="text-sm md:text-base text-[#FFFFFF] opacity-90">
            Сервер выживания и приключений
          </p>
          
          <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl text-[#10B981] mb-3">О сервере</h2>
                <div className="text-xs md:text-sm text-white space-y-2 mb-4">
                  <p><span className="text-[#10B981] font-bold">Версия:</span> 1.20.1 | Поддержка: 1.7 - 1.21.7</p>
                  <p className="text-[#FF6B6B]">⚠️ Forge 1.20.5 - 1.21.2 не поддерживаются</p>
                </div>
              </div>
              
              <div className="text-left text-xs md:text-sm text-white space-y-3 leading-relaxed">
                <p className="text-center text-base md:text-lg font-bold text-[#10B981]">
                  Народ, все чухня. Играйте на лучшем Minecraft-сервере мира (но это не точно) Freedom!
                </p>
                
                <p>
                  Это самый амбициозный Minecraft-проект за все время (админа), который затрагивает буквально каждый аспект игры (и вашей жизни):
                </p>
                
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Местные земли настолько изуродованы, что кажется на сервере есть новые биомы, данжи и структуры</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Поддержка кастомных анимаций (Emotecrafts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Поддержка голосового чата прямо в игре (Simple Voice Chat), чтобы твой кореш смог издавать для тебя незабываемые звуки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>У местных игроков столько TNT, кристаллов и якорей, что твоя RTX будет создавать динамическое освещение огня прямо в реальности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Всякие прикалюхи, типа пишешь сообщение, а вокруг тебя такие огоньки: ВЖУХ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Новые монстры, баги и боссы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] mt-0.5">▪</span>
                    <span>Нелегальные предметы, инструменты, ресурсы, шмотки и многое-многое другое за что вас сможет забанить администрация!</span>
                  </li>
                </ul>
                
                <p className="text-center text-base md:text-lg font-bold text-[#10B981] pt-2">
                  Короче, ваша жизнь никогда не будет прежней)
                </p>
              </div>
            </div>
          </Card>
        </header>

        <Card 
          ref={(el) => (sectionRefs.current['ip-card'] = el)}
          id="ip-card"
          className={`bg-[#8B4513] border-4 border-[#D2691E] p-6 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] transition-all ${
            visibleSections.has('ip-card') ? 'animate-fade-in' : 'opacity-0'
          }`}>
          <p className="text-xs md:text-sm mb-2 text-[#10B981]">IP-адрес подключения:</p>
          <p className="text-2xl md:text-4xl text-white font-bold tracking-wider mb-4">
            go.fdm.su
          </p>
          <Button
            onClick={copyIP}
            className="bg-[#10B981] hover:bg-[#8B4513] text-white border-4 border-[#000] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 px-6 py-3 text-[0.6rem] md:text-xs transition-all duration-200"
          >
            <Icon name="Copy" size={16} className="mr-2" />
            Скопировать IP
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:scale-105 hover:rotate-1 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Users" size={32} className="text-[#10B981]" />
            </div>
            <h3 className="text-xs md:text-sm mb-4 text-center text-[#10B981]">
              Онлайн статистика
            </h3>
            <div className="text-center">
              <p className="text-3xl md:text-4xl mb-2 text-white">
                {isLoading ? '...' : `${onlinePlayers}/${maxPlayers}`}
              </p>
              <Progress value={onlinePercentage} className="h-3 bg-[#D2691E]" />
              <button
                onClick={fetchServerStatus}
                className="mt-3 text-[0.6rem] text-[#10B981] hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
                disabled={isLoading}
              >
                <Icon name="RefreshCw" size={12} className={isLoading ? 'animate-spin' : ''} />
                Обновить
              </button>
            </div>
          </Card>

          <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:scale-105 hover:rotate-1 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Gamepad2" size={32} className="text-[#10B981]" />
            </div>
            <h3 className="text-xs md:text-sm mb-4 text-center text-[#10B981]">
              Игровые режимы
            </h3>
            <div className="space-y-3">
              {gameModes.map((mode) => (
                <div key={mode.name}>
                  <div className="flex justify-between mb-1 text-xs text-white">
                    <span>{mode.name}</span>
                    <span>{mode.percentage}%</span>
                  </div>
                  <div className="h-3 bg-[#D2691E] border-2 border-[#000]">
                    <div
                      className={`h-full ${mode.color}`}
                      style={{ width: `${mode.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:scale-105 hover:rotate-1 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Activity" size={32} className="text-[#10B981]" />
            </div>
            <h3 className="text-xs md:text-sm mb-4 text-center text-[#10B981]">
              Активность за 24 часа
            </h3>
            <div className="flex items-end justify-between h-24 gap-1">
              {activityData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#10B981] hover:bg-[#DD5016] transition-all duration-300 cursor-pointer relative group"
                  style={{ height: `${(data.players / 70) * 100}%` }}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === idx && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#8B4513] border-2 border-[#D2691E] px-2 py-1 text-[0.6rem] whitespace-nowrap z-10 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                      {data.hour}:00 - {data.players} игроков
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section 
          ref={(el) => (sectionRefs.current['shop'] = el)}
          id="shop"
          className={`space-y-6 transition-all duration-700 ${
            visibleSections.has('shop') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Магазин сервера
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopCategories.map((category, idx) => (
              <div
                key={category.title}
                className={`transition-all duration-700 ${
                  visibleSections.has('shop') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[16px_16px_0px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group h-full">
                  <div className="text-4xl mb-4 text-center group-hover:animate-wiggle">{category.icon}</div>
                <h3 className="text-xs md:text-sm mb-4 text-[#10B981] text-center min-h-[3rem]">
                  {category.title}
                </h3>
                <ul className="space-y-2 text-[0.6rem] md:text-xs text-white">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="text-[#10B981] mr-2">▪</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              className="bg-[#10B981] hover:bg-[#8B4513] text-white border-4 border-[#000] shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1 px-8 py-6 text-xs md:text-sm transition-all duration-200 animate-pulse-slow"
            >
              <a
                href="https://fdm.trademc.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти в магазин
              </a>
            </Button>
          </div>
        </section>

        <section 
          ref={(el) => (sectionRefs.current['social'] = el)}
          id="social"
          className={`space-y-6 transition-all duration-700 ${
            visibleSections.has('social') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Социальные сети
          </h2>
          <p className="text-center text-sm md:text-base text-white">
            Более 5000+ игроков уже с нами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, idx) => (
              <div
                key={social.name}
                className={`transition-all duration-700 ${
                  visibleSections.has('social') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center group h-full">
                  <Icon
                    name={social.icon as any}
                    size={48}
                    className="mx-auto mb-4 text-[#10B981] group-hover:animate-bounce-pixel"
                  />
                  <h3 className="text-sm md:text-base mb-2 text-white">
                    {social.name}
                  </h3>
                  <p className="text-[0.6rem] md:text-xs text-[#10B981]">
                    {social.description}
                  </p>
                </Card>
              </a>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={(el) => (sectionRefs.current['news'] = el)}
          id="news"
          className={`space-y-6 transition-all duration-700 ${
            visibleSections.has('news') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Последние новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serverNews.map((news, idx) => (
              <div
                key={news.title}
                className={`transition-all duration-700 ${
                  visibleSections.has('news') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex items-center justify-center mb-4">
                    <Icon name={news.icon as any} size={40} className="text-[#10B981]" />
                  </div>
                  <p className="text-[0.6rem] md:text-xs text-[#10B981] mb-2 text-center">
                    {news.date}
                  </p>
                  <h3 className="text-xs md:text-sm mb-3 text-white font-bold text-center">
                    {news.title}
                  </h3>
                  <p className="text-[0.6rem] md:text-xs text-white/80 text-center">
                    {news.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={(el) => (sectionRefs.current['gallery'] = el)}
          id="gallery"
          className={`space-y-6 transition-all duration-700 ${
            visibleSections.has('gallery') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Галерея скриншотов
          </h2>
          <p className="text-center text-sm md:text-base text-white/80">
            Из нашего сообщества VK
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  visibleSections.has('gallery') ? 'animate-fade-in' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <a
                  href="https://vk.ru/fd_minec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="border-4 border-[#8B4513] overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 bg-[#D2691E] aspect-video group cursor-pointer">
                    <div className="w-full h-full bg-[#8B4513] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Image" size={48} className="text-[#10B981] opacity-50" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              className="bg-[#10B981] hover:bg-[#8B4513] text-white border-4 border-[#000] shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1 px-8 py-4 text-xs md:text-sm transition-all duration-200"
            >
              <a
                href="https://vk.ru/fd_minec"
                target="_blank"
                rel="noopener noreferrer"
              >
                Больше фото в VK
              </a>
            </Button>
          </div>
        </section>

        <section 
          ref={(el) => (sectionRefs.current['rules'] = el)}
          id="rules"
          className={`space-y-6 transition-all duration-700 ${
            visibleSections.has('rules') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Правила сервера
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serverRules.map((rule, idx) => (
              <div
                key={rule.title}
                className={`transition-all duration-700 ${
                  visibleSections.has('rules') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <Icon name={rule.icon as any} size={40} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-xs md:text-sm mb-3 text-white font-bold">
                    {rule.title}
                  </h3>
                  <p className="text-[0.6rem] md:text-xs text-[#10B981]">
                    {rule.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={(el) => (sectionRefs.current['stats-footer'] = el)}
          id="stats-footer"
          className={`transition-all duration-700 ${
            visibleSections.has('stats-footer') ? 'animate-fade-in' : 'opacity-0 translate-y-10'
          }`}>
          <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <Icon name="Eye" size={32} className="mx-auto text-[#10B981]" />
                <p className="text-2xl md:text-3xl text-white font-bold">{visitorCount}</p>
                <p className="text-[0.6rem] md:text-xs text-[#10B981]">Посетителей сегодня</p>
              </div>
              <div className="space-y-2">
                <Icon name="Users" size={32} className="mx-auto text-[#10B981]" />
                <p className="text-2xl md:text-3xl text-white font-bold">5000+</p>
                <p className="text-[0.6rem] md:text-xs text-[#10B981]">Всего игроков</p>
              </div>
              <div className="space-y-2">
                <Icon name="Clock" size={32} className="mx-auto text-[#10B981]" />
                <p className="text-2xl md:text-3xl text-white font-bold">24/7</p>
                <p className="text-[0.6rem] md:text-xs text-[#10B981]">Работа сервера</p>
              </div>
              <div className="space-y-2">
                <Icon name="Zap" size={32} className="mx-auto text-[#10B981]" />
                <p className="text-2xl md:text-3xl text-white font-bold">99.9%</p>
                <p className="text-[0.6rem] md:text-xs text-[#10B981]">Uptime</p>
              </div>
            </div>
          </Card>
        </section>

        <footer className="text-center py-6 text-xs md:text-sm text-white opacity-80">
          © 2025 FDM.SU • Лучший сервер Minecraft
        </footer>
      </div>
    </div>
  );
};

export default Index;