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
      description: "Анархисты — один из двух кланов, отделившихся от Красного Рассвета. Этот клан был основан игроком CATAHA, к которому вскоре присоединился известный игрок _GACHI_MAN. Вместе они начали развивать свой клан и привлекать новых участников. В то время была построена знаменитая база Свобода, которая стала домом для многих известных игроков нашего времени и оказала им неоценимую помощь. Тогда же появилась ещё одна знаменитая база Восход от КР, и всё внимание переключилось на неё. Между КР и Анархистами были хорошие отношения, и они даже хотели объединиться, но из этого ничего не вышло. Базу Свободу, как и Восход, загриферил Darkmen, но не полностью. Участники Анархистов решили уничтожить Свободу, чтобы она не досталась ему. Анархисты остались без дома, но не унывали и вместе, под командованием игрока MineFaha, построили базу Паскуда. Несмотря на то, что Сатана был лидером клана, Майнфаха занимался им больше. Однако базу нашли дестроеры и уничтожили её. 7 января весь сервер узнал, что аккаунт админа гачимена был взломан Сатаной, который раздавал нелегальные вещи. В тот же день клан распался, но нелегальные вещи, несмотря на прошедшее время, всё ещё существуют и ими пользуются!",
      icon: "Flame",
      color: "from-gray-700 to-slate-600",
      members: 64,
      level: 32
    },
    {
      name: "Орден Зелёной Звезды",
      description: "В то же время, когда строились базы «Восход» и «Свобода», на сервере появился игрок под ником Fr0o0Zzzy. Он быстро достиг всего, чего хотел в игре, и решил двигаться дальше. Он создал торговый кооператив, объединившись с кланами «Красный рассвет» и «Анархисты», и построил свою резиденцию. На тот момент в его клане было четыре игрока: Fr0o0Zzzy, sauranoss, LiteKris и denis5556. Однако из-за случая с игроком под ником rita_2001 базы «Свобода» и «Восход» были разрушены. Это предоставило Fr0o0Zzzy шанс на развитие своего клана. Он быстро взял под свой контроль множество хороших игроков и объявил войну клану «Красный рассвет». После строительства мап арта QR-кода и создания сайта произошёл слив базы «Орден Зелёной Звезды», и весь клан отправился на создание нового места для своего существования. Очень оперативно была создана база «Истоки». В клане было сделано много интересных вещей, включая создание ещё одного мап арта — любимой собаки главы, а также Зелёных марок — валюты внутри Ордена Зелёной Звезды. Однако появился новый враг — дестроеры, сильнейшие гриферы на сервере. Неизвестно, как они нашли базу «Истоки», предположительно, с помощью слива от игрока под ником Devil_Selika. Fr0o0Zzzy решил уйти из игры из-за личных проблем, оставив всё на своего великого война — игрока denis5556. Став главой, denis5556 оперативно построил сразу две базы. Однако клан «Анархисты» начал возрождаться, и почти все игроки ушли к ним, оставив в клане всего трёх человек: ari_chan, denis5556 и Curioty. Напротив была создана база «Новобранцев», куда пришли Lyntik7884 и Lobzika_biko. Параллельно этому произошёл слив Анархистов и крах одного из сильнейших кланов. На сервере Freedom наступило тёмное время, которое длилось до марта. Тогда глава «Ордена Зелёной Звезды» denis5556 решил возродить клан и сервер. Он созвал всех игроков, которых смог, и его правая рука Dis_Sledovatel ему в этом помог. Они пошли на сохранившуюся базу, но им быстро там наскучило, и весь клан с denis5556 полетели строить новую базу. Было очень много стараний и интересных проектов: объединение с Красным рассветом, восстановление старой базы. Однако denis5556 был вынужден уйти, и после этого постепенно всё начало рушиться. Был слив за сливом. Fr0o0Zzzy взял всё под свой контроль, но ничего не помогло, и в итоге Орден Зелёной Звезды вернулся к началу. Но это ещё не конец. Есть люди, готовые помочь, и будет ещё много интересного.",
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
      description: "Всё началось с того, как Serena_Yamano впервые начал играть в Minecraft и попал на сервер Freedom. В то время на нём была активная реклама, и он решил поиграть именно на этом сервере. Сначала его клан носил название «Орден Севера». Он помогал новым игрокам с железом и ресурсами, но через некоторое время они уходили. Тогда Серена понял, что нужно дать им цель, и начал собирать вокруг себя мирных торговцев. Главным двигателем прогресса клана стала война. Воины тогда были обычными — использовали стрелы, мечи и щиты. Серена в основном продавал ресурсы Гачимену напрямую. С появлением своей деревни, фермы арбузов и элитр, дела пошли в гору. Тогда ещё никто не пользовался забедрожьем, и летать друг к другу было просто. Но и находить базы тоже было легко. Впервые Гачи отвёз Серену на свою секретную базу, и он был поражён тем, сколько всего они умели. Они заключили союз для торговли, но со временем этот договор изжил себя. Долгое время не было войны, и ТФ угасала. Но потом Семгаку нашёл базу рассвета, и начался кошмар. Всё было уничтожено, а игроки, которые пытались защитить, убиты. Гачи принял решение раздробить клан на мелкие поселения. А Серена понял, что ему нужна своя база и нейтралитет. Тогда ТФ получила независимость, свой статус, и начался золотой век для ТФ. Заказов было много, торговля и перепродажа шла вовсю. Чтобы защитить себя от гриферов, пришлось договориться с Семгаку. Серена продал расположение нескольких несущественных баз нескольких игроков. Он знал, что обрекает их на уничтожение, поэтому в расход пошли те, с кем они не торговали, или же те, кто давно не заходил в игру. Когда Красный Рассвет стал слишком много закупать у ТФ, Гачи разорвал один выгодный контракт на несколько шалкеров изумрудов. Через некоторое время поступило весьма выгодное предложение от Семгаку: базы рассвета за всевозможные ресурсы, чары, незерит, алмазы, элитры. Серена согласился. Полученные ресурсы он перепродавал рассвету, чтобы они восстановились, и снова продав... [truncated]
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
    },
    {
      name: "Terrible Dream",
      description: "Terrible Dream был известен своими достижениями в области грифинга. Его основателем стал Semgaku — игрок на сервере известный своими грифами. В состав клана входили только два человека — Semgaku и hirokkizzZ. Terrible Dream воевал с кланом Красный Рассвет. Однако, когда Semgaku и hirokkizzZ покинули сервер, клан перестал существовать.",
      icon: "Skull",
      color: "from-red-900 to-black",
      members: 2,
      level: 28
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
              className="text-foreground hover:text-primary transition-colors"
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

      <div className="container mx-auto px-4 py-12 space-y-16 relative z-10">
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