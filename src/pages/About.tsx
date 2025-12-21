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
      story: "Гениальный торговец и стратег, превративший простую помощь новичкам в могущественную торговую империю. Во время войны между Рассветом и Семгаку продавал информацию о базах обеим сторонам, нажив огромное состояние. Его хитрость и деловая хватка сделали Федерацию самым богатым кланом сервера.",
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

  const handleVideoFactsClick = () => {
    navigate("/video-facts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 flex justify-between items-center">
          <h1 
            className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            Freedom
          </h1>
          <div className="flex gap-1.5 sm:gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4"
            >
              <Icon name="Home" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/wiki")}
              className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4"
            >
              <Icon name="BookOpen" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              О Сервере
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-3 sm:px-4">
            Познакомься с историей, кланами и легендарными игроками Freeman's Anarchy
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden transition-all duration-300 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 h-auto ${
                activeTab === tab.id ? 'shadow-lg shadow-primary/20' : ''
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Icon 
                  name={tab.icon} 
                  className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${activeTab === tab.id ? 'text-primary-foreground' : tab.color}`} 
                />
                <span className="font-medium">{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary-foreground to-transparent"></div>
              )}
            </Button>
          ))}
        </div>

        {activeTab === 'clans' && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {clans.map((clan, index) => (
                <Card
                  key={index}
                  onMouseEnter={() => setHoveredClan(index)}
                  onMouseLeave={() => setHoveredClan(null)}
                  className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer ${
                    hoveredClan === index ? 'scale-105 -translate-y-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${clan.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className={`absolute inset-0 ${clan.bgPattern} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="absolute top-0 right-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Icon name={clan.icon} className="w-full h-full" />
                  </div>

                  <div className="relative p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 lg:space-y-6">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${clan.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <Icon name={clan.icon} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${clan.color} shadow-lg`}>
                        <span className="text-xs sm:text-sm lg:text-base font-bold text-white">{clan.tag}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r ${clan.color} bg-clip-text text-transparent">
                        {clan.name}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {clan.description}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-primary/10">
                      <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        <Icon name="Users" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                        <span>Легендарный клан</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icon name="Flame" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2">Хочешь создать свой клан?</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                    На нашем сервере каждый может основать свой клан и войти в историю!
                  </p>
                </div>
                <Button 
                  variant="default" 
                  onClick={() => navigate("/")}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm lg:text-base px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 h-auto whitespace-nowrap"
                >
                  Подключиться
                  <Icon name="ArrowRight" className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 sm:p-6 lg:p-8">
              <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-600 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icon name="Scroll" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    История Сервера
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                    Путешествие от первых блоков до легендарных империй
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="relative pl-6 sm:pl-8 lg:pl-12 border-l-2 sm:border-l-4 border-primary/30 pb-4 sm:pb-6 lg:pb-8">
                  <div className="absolute -left-2 sm:-left-3 lg:-left-4 top-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg"></div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Эра Основания</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Сервер был основан владельцем Freeman с идеей истинной анархии. В первые дни игроки начали объединяться, что привело к созданию первых кланов. _GACHI_MAN вместе с Waseee и PRO100DIMA основали Красный Рассвет, который стал символом силы и единства.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 lg:pl-12 border-l-2 sm:border-l-4 border-primary/30 pb-4 sm:pb-6 lg:pb-8">
                  <div className="absolute -left-2 sm:-left-3 lg:-left-4 top-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-full shadow-lg"></div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Великие Войны</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Период массовых конфликтов между кланами. Красный Рассвет сражался против Terrible Dream, ОЗЗ и Анархистов. Эти войны определили баланс сил на сервере и породили множество легенд о героических сражениях и хитрых стратегиях.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 lg:pl-12 border-l-2 sm:border-l-4 border-primary/30 pb-4 sm:pb-6 lg:pb-8">
                  <div className="absolute -left-2 sm:-left-3 lg:-left-4 top-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full shadow-lg"></div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Расцвет Империй</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Время великих строительств. Lopalopa создал легендарные базы Союз и Восход. Fr0o0Zzzy основал Орден Зелёной Звезды и построил уникальные сооружения. Серена Ямано превратил Торговую Федерацию в экономическую силу сервера.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 lg:pl-12 border-l-2 sm:border-l-4 border-primary/30">
                  <div className="absolute -left-2 sm:-left-3 lg:-left-4 top-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-lg"></div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Современная Эра</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    Сегодня сервер продолжает развиваться. Hemister_Hunter возглавляет Красный Рассвет, кланы продолжают соперничать за влияние, а новые игроки пишут свою историю в этом удивительном мире полной свободы и бесконечных возможностей.
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Легендарные Игроки
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-3 sm:px-4">
                  Те, кто изменил судьбу сервера
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {legendaryPlayers.map((player, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${player.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${player.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg flex-shrink-0`}>
                          <Icon name={player.icon} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 truncate">{player.name}</h3>
                          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">{player.role}</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {player.story}
                      </p>

                      <div className="pt-3 sm:pt-4 border-t border-primary/10 flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                        <Icon name="Award" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
                        <span className="group-hover:text-primary transition-colors duration-300">Легенда сервера</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-500/20 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6 text-center sm:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icon name="Trophy" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-amber-600">Стань частью истории!</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                    Возможно, следующая легенда о великом игроке будет о тебе. Присоединяйся и твори историю!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Галерея
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Лучшие моменты из жизни сервера
                </p>
              </div>
              <Button
                onClick={handleVideoFactsClick}
                variant="outline"
                className="group border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 h-auto w-full sm:w-auto"
              >
                <Icon name="Video" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 text-purple-400" />
                Видео факты
                <Icon name="ArrowRight" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {loadingPhotos ? (
              <div className="flex items-center justify-center py-12 sm:py-16 lg:py-20">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Icon name="Loader2" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 animate-spin text-primary" />
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Загрузка фотографий...</p>
                </div>
              </div>
            ) : photos.length === 0 ? (
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-8 sm:p-12 lg:p-16 text-center">
                <Icon name="Image" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 text-muted-foreground opacity-50" />
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">Фотографий пока нет</h3>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                  Галерея скоро наполнится удивительными снимками из жизни сервера
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
                    onClick={() => setSelectedImage(photo.image_url)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Icon name="ZoomIn" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 lg:p-6">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1">{photo.title}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2">
                        {photo.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 sm:-top-12 lg:-top-16 right-0 text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            >
              <Icon name="X" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </Button>
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
