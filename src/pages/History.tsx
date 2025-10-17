import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const History = () => {
  const navigate = useNavigate();
  const [visiblePlayers, setVisiblePlayers] = useState<Set<number>>(new Set());
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const legendaryPlayers = [
    {
      name: "_GACHI_MAN",
      role: "Основатель Красного Рассвета",
      story: "Легендарный игрок, основавший крупнейший клан сервера вместе с Waseee и PRO100DIMA. Прошёл путь от создателя Красного Рассвета до лидера Анархистов. Его аккаунт был взломан, что привело к распаду клана Анархистов. Оставил неизгладимый след в истории сервера, участвуя в эпических войнах и строительстве легендарных баз.",
      icon: "Flame",
      color: "from-red-600 to-orange-500"
    },
    {
      name: "lopalopa",
      role: "Возродитель Рассвета",
      story: "После ухода основателя именно lopalopa возродил Красный Рассвет из пепла. Создатель легендарных баз Союз и Восход, которые стали символом мощи клана. Его лидерство привело клан к новому расцвету и укрепило позиции как сильнейшей силы на сервере в самые тяжёлые времена.",
      icon: "Sunrise",
      color: "from-amber-600 to-yellow-500"
    },
    {
      name: "Fr0o0Zzzy",
      role: "Создатель Ордена Зелёной Звезды",
      story: "Основатель одного из самых влиятельных кланов сервера. После разрушения баз Восход и Свобода создал Орден, который объявил войну Красному Рассвету. Известен созданием уникальных баз и мап-артов. Его уход привёл клан к кризису, но заложенные им традиции живут до сих пор в сердцах игроков.",
      icon: "Star",
      color: "from-green-600 to-emerald-500"
    },
    {
      name: "Freeman",
      role: "Владелец сервера",
      story: "Создатель и владелец сервера Freedom, основатель элитного клана Orthodox. Его принципы отбора в клан остаются загадкой по сей день. Несмотря на кажущуюся мирность, успешно провёл две военные кампании против сильнейших противников. Его влияние формирует судьбу всего сервера и определяет правила игры для тысяч игроков.",
      icon: "Crown",
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Серена Ямано",
      role: "Основатель Торговой Федерации",
      story: "Гениальный торговец и стратег, превративший простую помощь новичкам в могущественную торговую империю. Во время войны между Рассветом и Семгаку продавал информацию о базах обеим сторонам, нажив огромное состояние. Его хитрость и деловая хватка сделали Федерацию самым богатым кланом сервера с 156 участниками.",
      icon: "Coins",
      color: "from-purple-600 to-indigo-500"
    },
    {
      name: "CATAHA",
      role: "Основатель Анархистов",
      story: "Харизматичный лидер, отделивший Анархистов от Красного Рассвета и создавший альтернативное движение свободы. Построил знаменитую базу Свободу, ставшую символом независимости. После того как база была частично уничтожена Darkmen, а затем и самими Анархистами, продолжил борьбу. Его идеалы анархии повлияли на целое поколение игроков сервера.",
      icon: "Flame",
      color: "from-gray-700 to-slate-600"
    },
    {
      name: "sanchopancho",
      role: "Создатель Пурпурного Заката",
      story: "Амбициозный основатель клана, стремившийся достичь величия Красного Рассвета. Создал первую базу Закат, которая стала легендарной и вдохновила многих. Хотя его клан переживал взлёты и падения, сам sanchopancho запомнился как лидер, воспитавший поколение сильных и самостоятельных игроков, которые продолжили его дело после ухода.",
      icon: "Sunset",
      color: "from-purple-600 to-pink-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = playerRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisiblePlayers((prev) => new Set(prev).add(index));
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    playerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const TypewriterText = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 20);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, isVisible, text]);

    return <span>{displayedText}</span>;
  };

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
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/gallery")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Image" size={18} className="mr-2" />
              Галерея
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent minecraft-text">
            📖 Наша История ⚔️
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto minecraft-text">
            Легендарные игроки, которые создали историю сервера Freedom и оставили неизгладимый след в памяти тысяч игроков
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {legendaryPlayers.map((player, index) => (
            <div
              key={index}
              ref={(el) => (playerRefs.current[index] = el)}
              className="opacity-0 transition-opacity duration-500"
              style={{
                opacity: visiblePlayers.has(index) ? 1 : 0,
              }}
            >
              <Card className={`bg-gradient-to-br ${player.color} border-0 p-6 shadow-2xl hover:scale-105 transition-all duration-300 h-full minecraft-card`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      {player.icon === "Crown" && player.name === "Freeman" ? (
                        <div className="text-3xl">👑</div>
                      ) : (
                        <Icon name={player.icon as any} size={32} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                      <p className="text-white/80 text-sm">{player.role}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-h-[180px]">
                    <p className="text-white text-sm leading-relaxed">
                      <TypewriterText 
                        text={player.story} 
                        isVisible={visiblePlayers.has(index)} 
                      />
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground">
            © 2025 FDM.SU • История пишется игроками
          </p>
        </footer>
      </div>
    </div>
  );
};

export default History;