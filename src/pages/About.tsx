import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

type TabType = 'clans' | 'history' | 'gallery';

const About = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('clans');
  const [hoveredClan, setHoveredClan] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const clans = [
    {
      name: "Красный Рассвет",
      tag: "[КР]",
      description: "Старейший и крупнейший клан сервера. Основан _GACHI_MAN с первыми участниками Waseee и PRO100DIMA. Пережил множество войн с Terrible Dream, ОЗЗ и Анархистами. После ухода основателя клан возродил lopalopa, создав легендарные базы Союз и Восход. Так же главой был игрок под ником Lyntik7884. Сейчас главой является Hemister_Hunter",
      icon: "Sunrise" as const,
      color: "from-red-600 via-red-500 to-orange-500",
      bgPattern: "bg-red-950/30"
    },
    {
      name: "Анархисты",
      tag: "[А]",
      description: "Клан Анархистов, отделившийся от Красного Рассвета, был основан CATAHA и вскоре к нему присоединился _GACHI_MAN. Они построили знаменитую базу Свободу, которую частично загриферил Darkmen, а затем уничтожили сами Анархисты. После потери базы они создали базу Паскуда под командованием MineFaha, но и она была уничтожена. Клан распался после того, как аккаунт GACHI_MAN был взломан, а Сатана раздавал нелегальные вещи",
      icon: "Flame" as const,
      color: "from-gray-800 via-gray-700 to-slate-600",
      bgPattern: "bg-gray-950/30"
    },
    {
      name: "Орден Зелёной Звезды",
      tag: "[ОЗЗ]",
      description: "Fr0o0Zzzy основал \"Орден Зелёной Звезды\", который развился после разрушения баз \"Восход\" и \"Свобода\". Клан объявил войну \"Красному рассвету\", строил базы и мап-арты. После ухода Fr0o0Zzzy, клан пережил кризис, возрождение под руководством denis5556, объединение с \"Красным рассветом\" и, в конечном итоге, упадок",
      icon: "Star" as const,
      color: "from-green-600 via-green-500 to-emerald-500",
      bgPattern: "bg-green-950/30"
    },
    {
      name: "Orthodox",
      tag: "[Orth]",
      description: "Клан основан владельцем сервера Freeman. Попасть в него очень сложно - принцип отбора неизвестен. Несмотря на кажущуюся мирность, вёл две войны против игроков Гурончика и Синаила, одержав победу в обеих",
      icon: "Crown" as const,
      color: "from-blue-600 via-blue-500 to-cyan-500",
      bgPattern: "bg-blue-950/30"
    },
    {
      name: "Торговая Федерация",
      tag: "[ТФ]",
      description: "Основана Серена Ямано. Изначально помогала новичкам, но переключилась на торговлю ресурсами. Во время войны между Рассветом и Семгаку Серена продавал информацию о базах обеим сторонам, нажив огромное состояние на конфликте",
      icon: "Coins" as const,
      color: "from-purple-600 via-purple-500 to-indigo-500",
      bgPattern: "bg-purple-950/30"
    },
    {
      name: "Пурпурный Закат",
      tag: "[ПЗ]",
      description: "Создан sanchopancho, стремившимся к силе Красного Рассвета. Первая база Закат стала легендарной, но угасла. Сайранос возродил клан, построив подземную базу, которую уничтожили. Клан запомнился тем, что воспитал сильных и самостоятельных игроков",
      icon: "Sunset" as const,
      color: "from-purple-600 via-purple-500 to-pink-500",
      bgPattern: "bg-purple-950/30"
    }
  ];

  const legendaryPlayers = [
    {
      name: "_GACHI_MAN",
      role: "Основатель Красного Рассвета",
      story: "Легендарный игрок, основавший крупнейший клан сервера вместе с Waseee и PRO100DIMA. Прошёл путь от создателя Красного Рассвета до лидера Анархистов. Его аккаунт был взломан, что привело к распаду клана Анархистов. Оставил неизгладимый след в истории сервера, участвуя в эпических войнах и строительстве легендарных баз.",
      icon: "Flame" as const,
      color: "from-red-600 to-orange-500"
    },
    {
      name: "lopalopa",
      role: "Возродитель Рассвета",
      story: "После ухода основателя именно lopalopa возродил Красный Рассвет из пепла. Создатель легендарных баз Союз и Восход, которые стали символом мощи клана. Его лидерство привело клан к новому расцвету и укрепило позиции как сильнейшей силы на сервере в самые тяжёлые времена.",
      icon: "Sunrise" as const,
      color: "from-amber-600 to-yellow-500"
    },
    {
      name: "Fr0o0Zzzy",
      role: "Создатель Ордена Зелёной Звезды",
      story: "Основатель одного из самых влиятельных кланов сервера. После разрушения баз Восход и Свобода создал Орден, который объявил войну Красному Рассвету. Известен созданием уникальных баз и мап-артов. Его уход привёл клан к кризису, но заложенные им традиции живут до сих пор в сердцах игроков.",
      icon: "Star" as const,
      color: "from-green-600 to-emerald-500"
    },
    {
      name: "Freeman",
      role: "Владелец сервера",
      story: "Создатель и владелец сервера Freedom, основатель элитного клана Orthodox. Его принципы отбора в клан остаются загадкой по сей день. Несмотря на кажущуюся мирность, успешно провёл две военные кампании против сильнейших противников. Его влияние формирует судьбу всего сервера и определяет правила игры для тысяч игроков.",
      icon: "Crown" as const,
      color: "from-blue-600 to-cyan-500"
    },
    {
      name: "Серена Ямано",
      role: "Основатель Торговой Федерации",
      story: "Гениальный торговец и стратег, превративший простую помощь новичкам в могущественную торговую империю. Во время войны между Рассветом и Семгаку продавал информацию о базах обеим сторонам, нажив огромное состояние. Его хитрость и деловая хватка сделали Федерацию самым богатым кланом сервера с 156 участниками.",
      icon: "Coins" as const,
      color: "from-purple-600 to-indigo-500"
    },
    {
      name: "CATAHA",
      role: "Основатель Анархистов",
      story: "Харизматичный лидер, который отделился от Красного Рассвета и основал клан Анархистов. Вместе с _GACHI_MAN создал легендарную базу Свободу. После разрушения базы и проблем с нелегальными предметами клан распался, но история Анархистов осталась одной из самых ярких страниц сервера.",
      icon: "Zap" as const,
      color: "from-gray-600 to-slate-500"
    }
  ];

  useEffect(() => {
    if (activeTab === 'gallery' && photos.length === 0) {
      fetchPhotos();
    }
  }, [activeTab]);

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const response = await fetch('https://functions.poehali.dev/96ce21ed-e22a-41d3-a430-bb779560e271');
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фотографии",
        variant: "destructive"
      });
    } finally {
      setLoadingPhotos(false);
    }
  };

  const tabs = [
    { id: 'clans' as TabType, label: 'Кланы', icon: 'Shield' as const, color: 'text-red-400' },
    { id: 'history' as TabType, label: 'Наша История', icon: 'BookOpen' as const, color: 'text-amber-400' },
    { id: 'gallery' as TabType, label: 'Галерея', icon: 'Image' as const, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            Freedom
          </h1>
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block p-3 md:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/40 minecraft-card">
            <Icon name="BookOpen" size={36} className="text-primary md:w-12 md:h-12" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent minecraft-text px-2">
            📖 О сервере Freedom
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            История, кланы и легендарные моменты нашего сервера
          </p>

          <div className="flex flex-wrap gap-2 md:gap-4 justify-center pt-4 md:pt-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  minecraft-button px-4 py-3 md:px-8 md:py-6 text-sm md:text-lg font-bold transition-all
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-primary to-accent text-white scale-105 shadow-lg' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105'
                  }
                `}
              >
                <Icon name={tab.icon} size={18} className={`mr-1 md:mr-2 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>

        {activeTab === 'clans' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                ⚔️ Кланы сервера
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">Великие фракции, определяющие судьбу Freedom</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {clans.map((clan, index) => (
                <Card
                  key={index}
                  className={`
                    ${clan.bgPattern} border-2 border-primary/30 p-4 md:p-6 minecraft-card
                    md:hover:scale-105 transition-all duration-300 cursor-pointer
                    ${hoveredClan === index ? 'shadow-2xl shadow-primary/30' : ''}
                  `}
                  onMouseEnter={() => setHoveredClan(index)}
                  onMouseLeave={() => setHoveredClan(null)}
                >
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 bg-gradient-to-br ${clan.color} rounded-lg flex-shrink-0`}>
                        <Icon name={clan.icon} size={24} className="text-white md:w-8 md:h-8" />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`text-lg md:text-2xl font-bold bg-gradient-to-r ${clan.color} bg-clip-text text-transparent truncate`}>
                          {clan.name}
                        </h3>
                        <span className={`text-xs md:text-sm font-mono bg-gradient-to-r ${clan.color} bg-clip-text text-transparent opacity-80`}>
                          {clan.tag}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{clan.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                ⭐ Легендарные игроки
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">Герои, чьи имена навсегда вписаны в историю сервера</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {legendaryPlayers.map((player, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-muted/50 to-background border-2 border-primary/30 p-4 md:p-6 minecraft-card md:hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                      <div className={`p-3 md:p-4 bg-gradient-to-br ${player.color} rounded-lg shadow-lg`}>
                        <Icon name={player.icon} size={32} className="text-white md:w-10 md:h-10" />
                      </div>
                      <div>
                        <h3 className={`text-lg md:text-xl font-bold bg-gradient-to-r ${player.color} bg-clip-text text-transparent`}>
                          {player.name}
                        </h3>
                        <p className="text-xs md:text-sm text-primary font-semibold mt-1">{player.role}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-primary/20 pt-3 md:pt-4">
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{player.story}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🖼️ Галерея сервера
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">Лучшие моменты и постройки игроков</p>
            </div>

            {loadingPhotos ? (
              <div className="text-center py-20">
                <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Загрузка галереи...</p>
              </div>
            ) : photos.length === 0 ? (
              <Card className="p-8 md:p-12 text-center">
                <Icon name="ImageOff" size={48} className="mx-auto mb-4 text-muted-foreground md:w-16 md:h-16" />
                <h3 className="text-lg md:text-xl font-bold mb-2">Галерея пуста</h3>
                <p className="text-muted-foreground text-sm md:text-base">Фотографии скоро появятся</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="overflow-hidden minecraft-card md:hover:scale-105 transition-all duration-300 cursor-pointer group border-2 border-primary/30 hover:shadow-2xl hover:shadow-primary/20"
                    onClick={() => setSelectedImage(photo.image_url)}
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold text-base md:text-lg truncate">{photo.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <Icon name="X" size={24} />
            </Button>
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;