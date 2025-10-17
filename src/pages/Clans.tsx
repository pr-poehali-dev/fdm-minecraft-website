import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Clans = () => {
  const navigate = useNavigate();
  const [hoveredClan, setHoveredClan] = useState<number | null>(null);

  const clans = [
    {
      name: "Красный Рассвет",
      description: "Старейший и крупнейший клан сервера. Основан _GACHI_MAN с первыми участниками Waseee и PRO100DIMA. Пережил множество войн с Terrible Dream, ОЗЗ и Анархистами. После ухода основателя клан возродил lopalopa, создав легендарные базы Союз и Восход. Так же главой был игрок под ником Lyntik7884. Сейчас главой является Hemister_Hunter",
      icon: "Sunrise",
      color: "from-red-600 via-red-500 to-orange-500",
      bgPattern: "bg-red-950/30",
      members: 127,
      level: 45,
      founded: "2020",
      leader: "Hemister_Hunter",
      status: "Активен"
    },
    {
      name: "Анархисты",
      description: "Клан Анархистов, отделившийся от Красного Рассвета, был основан CATAHA и вскоре к нему присоединился _GACHI_MAN. Они построили знаменитую базу Свободу, которую частично загриферил Darkmen, а затем уничтожили сами Анархисты. После потери базы они создали базу Паскуда под командованием MineFaha, но и она была уничтожена. Клан распался после того, как аккаунт GACHI_MAN был взломан, а Сатана раздавал нелегальные вещи",
      icon: "Flame",
      color: "from-gray-800 via-gray-700 to-slate-600",
      bgPattern: "bg-gray-950/30",
      members: 64,
      level: 32,
      founded: "2021",
      leader: "Распущен",
      status: "Неактивен"
    },
    {
      name: "Орден Зелёной Звезды",
      description: "Fr0o0Zzzy основал \"Орден Зелёной Звезды\", который развился после разрушения баз \"Восход\" и \"Свобода\". Клан объявил войну \"Красному рассвету\", строил базы и мап-арты. После ухода Fr0o0Zzzy, клан пережил кризис, возрождение под руководством denis5556, объединение с \"Красным рассветом\" и, в конечном итоге, упадок",
      icon: "Star",
      color: "from-green-600 via-green-500 to-emerald-500",
      bgPattern: "bg-green-950/30",
      members: 76,
      level: 35,
      founded: "2021",
      leader: "denis5556",
      status: "Объединён"
    },
    {
      name: "Orthodox",
      description: "Клан основан владельцем сервера Freeman. Попасть в него очень сложно - принцип отбора неизвестен. Несмотря на кажущуюся мирность, вёл две войны против игроков Гурончика и Синаила, одержав победу в обеих",
      icon: "Crown",
      color: "from-blue-600 via-blue-500 to-cyan-500",
      bgPattern: "bg-blue-950/30",
      members: 98,
      level: 38,
      founded: "2020",
      leader: "Freeman",
      status: "Активен"
    },
    {
      name: "Торговая Федерация",
      description: "Основана Серена Ямано. Изначально помогала новичкам, но переключилась на торговлю ресурсами. Во время войны между Рассветом и Семгаку Серена продавал информацию о базах обеим сторонам, нажив огромное состояние на конфликте",
      icon: "Coins",
      color: "from-purple-600 via-purple-500 to-indigo-500",
      bgPattern: "bg-purple-950/30",
      members: 156,
      level: 52,
      founded: "2021",
      leader: "Серена Ямано",
      status: "Активен"
    },
    {
      name: "Пурпурный Закат",
      description: "Создан sanchopancho, стремившимся к силе Красного Рассвета. Первая база Закат стала легендарной, но угасла. Сайранос возродил клан, построив подземную базу, которую уничтожили. Клан запомнился тем, что воспитал сильных и самостоятельных игроков",
      icon: "Sunset",
      color: "from-purple-600 via-purple-500 to-pink-500",
      bgPattern: "bg-purple-950/30",
      members: 89,
      level: 41,
      founded: "2022",
      leader: "Сайранос",
      status: "Неактивен"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          >
            Freedom
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/gallery")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Image" size={18} className="mr-2" />
              Галерея
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/history")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              Наша История
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/clans")}
              className="text-primary border-b-2 border-primary"
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Кланы
            </Button>
            <a 
              href="https://fdm.trademc.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Магазин
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-12 relative z-10">
        <header className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Icon name="Shield" size={48} className="text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent minecraft-text">
              🛡️ Кланы Freedom ⚔️
            </h1>
            <Icon name="Swords" size={48} className="text-accent" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto minecraft-text">
            Легендарные объединения игроков, которые оставили свой след в истории сервера
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clans.map((clan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border-2 transition-all duration-500 minecraft-card ${
                hoveredClan === index 
                  ? 'scale-105 shadow-2xl border-primary' 
                  : 'border-border/50 hover:border-primary/50'
              }`}
              onMouseEnter={() => setHoveredClan(index)}
              onMouseLeave={() => setHoveredClan(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${clan.color} opacity-10`}></div>
              <div className={`absolute inset-0 ${clan.bgPattern}`}></div>
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 bg-gradient-to-br ${clan.color} rounded-xl shadow-lg`}>
                      {clan.name === "Orthodox" ? (
                        <div className="text-4xl">✝️</div>
                      ) : (
                        <Icon name={clan.icon as any} size={40} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">{clan.name}</h2>
                    </div>
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
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-2 border-primary/40 p-8 shadow-2xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Хочешь создать свой клан?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Объединяйся с друзьями, стройте легендарные базы и вписывайте своё имя в историю Freedom!
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all shadow-lg"
              onClick={() => navigate("/")}
            >
              <Icon name="Swords" size={20} className="mr-2" />
              Начать играть
            </Button>
          </div>
        </Card>

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