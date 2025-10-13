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
      description: `Анархисты — один из двух кланов, отделившихся от Красного Рассвета. Этот клан был основан игроком CATAHA, к которому вскоре присоединился известный игрок _GACHI_MAN. Вместе они начали развивать свой клан и привлекать новых участников. В то время была построена знаменитая база Свобода, которая стала домом для многих известных игроков нашего времени и оказала им неоценимую помощь. Тогда же появилась ещё одна знаменитая база Восход от КР, и всё внимание переключилось на неё. Между КР и Анархистами были хорошие отношения, и они даже хотели объединиться, но из этого ничего не вышло. Базу Свободу, как и Восход, загриферил Darkmen, но не полностью. Участники Анархистов решили уничтожить Свободу, чтобы она не досталась ему. Анархисты остались без дома, но не унывали и вместе, под командованием игрока MineFaha, построили базу Паскуда. Несмотря на то, что Сатана был лидером клана, Майнфаха занимался им больше. Однако базу нашли дестроеры и уничтожили её. 7 января весь сервер узнал, что аккаунт админа гачимена был взломан Сатаной, который раздавал нелегальные вещи. В тот же день клан распался, но нелегальные вещи, несмотря на прошедшее время, всё ещё существуют и ими пользуются!`,
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
      description: `В то же время, когда строились базы «Восход» и «Свобода», на сервере появился игрок под ником Fr0o0Zzzy. Он быстро достиг всего, чего хотел в игре, и решил двигаться дальше. Он создал торговый кооператив, объединившись с кланами «Красный рассвет» и «Анархисты», и построил свою резиденцию. На тот момент в его клане было четыре игрока: Fr0o0Zzzy, sauranoss, LiteKris и denis5556. Однако из-за случая с игроком под ником rita_2001 базы «Свобода» и «Восход» были разрушены. Это предоставило Fr0o0Zzzy шанс на развитие своего клана. Он быстро взял под свой контроль множество хороших игроков и объявил войну клану «Красный рассвет». После строительства мап арта QR-кода и создания сайта произошёл слив базы «Орден Зелёной Звезды», и весь клан отправился на создание нового места для своего существования. Очень оперативно была создана база «Истоки». В клане было сделано много интересных вещей, включая создание ещё одного мап арта — любимой собаки главы, а также Зелёных марок — валюты внутри Ордена Зелёной Звезды. Однако появился новый враг — дестроеры, сильнейшие гриферы на сервере. Неизвестно, как они нашли базу «Истоки», предположительно, с помощью слива от игрока под ником Devil_Selika. Fr0o0Zzzy решил уйти из игры из-за личных проблем, оставив всё на своего великого война — игрока denis5556. Став главой, denis5556 оперативно построил сразу две базы. Однако клан «Анархисты» начал возрождаться, и почти все игроки ушли к ним, оставив в клане всего трёх человек: ari_chan, denis5556 и Curioty. Напротив была создана база «Новобранцев», куда пришли Lyntik7884 и Lobzika_biko. Параллельно этому произошёл слив Анархистов и крах одного из сильнейших кланов. На сервере Freedom наступило тёмное время, которое длилось до марта. Тогда глава «Ордена Зелёной Звезды» denis5556 решил возродить клан и сервер. Он созвал всех игроков, которых смог, и его правая рука Dis_Sledovatel ему в этом помог. Они пошли на сохранившуюся базу, но им быстро там наскучило, и весь клан с denis5... [truncated]
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
      description: `Всё началось с того, как Serena_Yamano впервые начал играть в Minecraft и попал на сервер Freedom. В то время на нём была активная реклама, и он решил поиграть именно на этом сервере. Сначала его клан носил название «Орден Севера». Он помогал новым игрокам с железом и ресурсами, но через некоторое время они уходили. Тогда Серена понял, что нужно дать им цель, и начал собирать вокруг себя мирных торговцев. Главным двигателем прогресса клана стала война. Воины тогда были обычными — использовали стрелы, мечи и щиты. Серена в основном продавал ресурсы Гачимену напрямую. С появлением своей деревни, фермы арбузов и элитр, дела пошли в гору. Тогда ещё никто не пользовался забедрожьем, и летать друг к другу было просто. Но и находить базы тоже было легко. Впервые Гачи отвёз Серену на свою секретную базу, и он был поражён тем, сколько всего они умели. Они заключили союз для торговли, но со временем этот договор изжил себя. Долгое время не было войны, и ТФ угасала. Но потом Семгаку нашёл базу рассвета, и начался кошмар. Всё было уничтожено, а игроки, которые пытались защитить, убиты. Гачи принял решение раздробить клан на мелкие поселения. А Серена понял, что ему нужна своя база и нейтралитет. Тогда ТФ получила независимость, свой статус, и начался золотой век для ТФ. Заказов было много, торговля и перепродажа шла вовсю. Чтобы защитить себя от гриферов, пришлось договориться с Семгаку. Серена продал расположение нескольких несущественных баз нескольких игроков. Он знал, что обрекает их на уничтожение, поэтому в расход пошли те, с кем они не торговали, или же те, кто давно не заходил в игру. Когда Красный Рассвет стал слишком много закупать у ТФ, Гачи разорвал один выгодный контракт на несколько шалкеров изумрудов. Через некоторое время поступило весьма выгодное предложение от Семгаку: базы рассвета за всевозможные ресурсы, чары, незерит, алмазы, элитры. Серена согласился. Полученные ресурсы он перепродавал рассвету, чтобы они восстановились, и снова продав... [truncated]
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
    },
    {
      name: "Terrible Dream",
      description: "Terrible Dream был известен своими достижениями в области грифинга. Его основателем стал Semgaku — игрок на сервере известный своими грифами. В состав клана входили только два человека — Semgaku и hirokkizzZ. Terrible Dream воевал с кланом Красный Рассвет. Однако, когда Semgaku и hirokkizzZ покинули сервер, клан перестал существовать.",
      icon: "Skull",
      color: "from-red-900 via-red-800 to-black",
      bgPattern: "bg-red-950/30",
      members: 2,
      level: 28,
      founded: "2021",
      leader: "Semgaku",
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
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Кланы Freedom
            </h1>
            <Icon name="Swords" size={48} className="text-accent" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Легендарные объединения игроков, которые оставили свой след в истории сервера
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clans.map((clan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border-2 transition-all duration-500 ${
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
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          clan.status === "Активен" 
                            ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                            : clan.status === "Объединён"
                            ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                            : "bg-gray-500/20 text-gray-500 border border-gray-500/30"
                        }`}>
                          {clan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                </div>

                <div className="flex justify-center">
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/30 min-w-[200px]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon name="Crown" size={20} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Глава клана</span>
                    </div>
                    <div className="text-xl font-bold text-foreground text-center">{clan.leader}</div>
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