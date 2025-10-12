import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const onlinePlayers = 47;
  const maxPlayers = 100;
  const onlinePercentage = (onlinePlayers / maxPlayers) * 100;

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
        </header>

        <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:scale-105 transition-all cursor-pointer">
          <p className="text-xs md:text-sm mb-2 text-[#10B981]">IP-адрес подключения:</p>
          <p className="text-2xl md:text-4xl text-white font-bold tracking-wider">
            go.fdm.su
          </p>
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
                {onlinePlayers}/{maxPlayers}
              </p>
              <Progress value={onlinePercentage} className="h-3 bg-[#D2691E]" />
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

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Магазин сервера
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopCategories.map((category) => (
              <Card
                key={category.title}
                className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[16px_16px_0px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
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

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl text-center text-[#10B981] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            Социальные сети
          </h2>
          <p className="text-center text-sm md:text-base text-white">
            Более 5000+ игроков уже с нами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-[#8B4513] border-4 border-[#D2691E] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center group">
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
            ))}
          </div>
        </section>

        <footer className="text-center py-6 text-xs md:text-sm text-white opacity-80">
          © 2025 FDM.SU • Лучший сервер Minecraft
        </footer>
      </div>
    </div>
  );
};

export default Index;