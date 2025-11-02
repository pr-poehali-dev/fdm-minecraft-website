import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const API_URL = "https://functions.poehali.dev/5cb318ce-7d10-4b48-ae74-369eb19c2392";

interface Video {
  id: number;
  title: string;
  author: string;
  video_url: string;
  is_short: boolean;
  created_at: string;
}

export default function VideoFacts() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"regular" | "shorts">("regular");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem('admin_token')
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить видео",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        setAuthToken(data.token);
        setIsAuthenticated(true);
        setPassword("");
        toast({
          title: "Успешно!",
          description: "Вы вошли в админ-панель"
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Неверный пароль",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось войти",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthToken(null);
    setIsAuthenticated(false);
    toast({
      title: "Вы вышли",
      description: "Вы вышли из админ-панели"
    });
  };

  const addVideo = async (e: React.FormEvent, isShort: boolean) => {
    e.preventDefault();
    
    if (!title || !author || !videoUrl) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify({
          title,
          author,
          video_url: videoUrl,
          is_short: isShort
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: isShort ? "Shorts добавлен" : "Видео добавлено"
        });
        setTitle("");
        setAuthor("");
        setVideoUrl("");
        fetchVideos();
      } else if (response.status === 401) {
        toast({
          title: "Ошибка",
          description: "Необходима авторизация",
          variant: "destructive"
        });
        handleLogout();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить видео",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': authToken || ''
        }
      });
      
      if (response.ok) {
        toast({
          title: "Удалено",
          description: "Видео удалено"
        });
        fetchVideos();
      } else if (response.status === 401) {
        toast({
          title: "Ошибка",
          description: "Необходима авторизация",
          variant: "destructive"
        });
        handleLogout();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить видео",
        variant: "destructive"
      });
    }
  };

  const getVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?)|(shorts\/))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[8] && match[8].length === 11) ? match[8] : null;
  };

  const regularVideos = videos.filter(v => !v.is_short);
  const shortsVideos = videos.filter(v => v.is_short);

  const renderVideoCard = (video: Video) => {
    const videoId = getVideoId(video.video_url);
    const isShort = video.is_short;
    
    return (
      <Card key={video.id} className="overflow-hidden backdrop-blur-sm bg-card/90 border-border/50">
        <div className={isShort ? "p-6" : "grid md:grid-cols-2 gap-4 p-6"}>
          <div className={isShort ? "aspect-[9/16] max-w-[300px] mx-auto rounded-lg overflow-hidden bg-muted" : "aspect-video rounded-lg overflow-hidden bg-muted"}>
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Icon name="Video" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className={isShort ? "mt-4" : "flex flex-col justify-between"}>
            <div>
              <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
              <p className="text-muted-foreground flex items-center gap-2 mb-4">
                <Icon name="User" size={16} />
                {video.author}
              </p>
              <a 
                href={video.video_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-2"
              >
                <Icon name="ExternalLink" size={16} />
                Смотреть на YouTube
              </a>
            </div>
            
            {isAuthenticated && (
              <Button 
                onClick={() => deleteVideo(video.id)} 
                variant="destructive"
                className="mt-4"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <nav className="border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Icon name="Home" size={20} className="mr-2" />
            На главную
          </Button>
          
          {isAuthenticated ? (
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="text-foreground hover:text-destructive"
            >
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => {
                const elem = document.getElementById('login-form');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-foreground hover:text-primary"
            >
              <Icon name="Lock" size={20} className="mr-2" />
              Войти
            </Button>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Icon name="Video" size={40} className="text-primary" />
          <h1 className="text-4xl font-bold">ВидеоФакты</h1>
        </div>

        {!isAuthenticated && (
          <Card id="login-form" className="p-6 backdrop-blur-sm bg-card/90 border-border/50 border-primary/30">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Вход в админ-панель
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль администратора"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </form>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "regular" | "shorts")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="regular" className="flex items-center gap-2">
              <Icon name="Video" size={18} />
              Обычные видео
            </TabsTrigger>
            <TabsTrigger value="shorts" className="flex items-center gap-2">
              <Icon name="Smartphone" size={18} />
              Shorts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="regular" className="space-y-6">
            {isAuthenticated && (
              <Card className="p-6 backdrop-blur-sm bg-card/90 border-border/50">
                <h2 className="text-2xl font-bold mb-4">Добавить видео</h2>
                <form onSubmit={(e) => addVideo(e, false)} className="space-y-4">
                  <div>
                    <Label htmlFor="title-regular">Название видео</Label>
                    <Input
                      id="title-regular"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Введите название"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author-regular">Автор</Label>
                    <Input
                      id="author-regular"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Укажите автора видео"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoUrl-regular">Ссылка на видео (YouTube)</Label>
                    <Input
                      id="videoUrl-regular"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Добавление..." : "Добавить видео"}
                  </Button>
                </form>
              </Card>
            )}

            <div className="grid gap-6">
              {regularVideos.map(renderVideoCard)}
              
              {regularVideos.length === 0 && (
                <Card className="p-12 text-center backdrop-blur-sm bg-card/90 border-border/50">
                  <Icon name="Video" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">Обычных видео пока нет. Добавьте первое!</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shorts" className="space-y-6">
            {isAuthenticated && (
              <Card className="p-6 backdrop-blur-sm bg-card/90 border-border/50">
                <h2 className="text-2xl font-bold mb-4">Добавить Shorts</h2>
                <form onSubmit={(e) => addVideo(e, true)} className="space-y-4">
                  <div>
                    <Label htmlFor="title-shorts">Название shorts</Label>
                    <Input
                      id="title-shorts"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Введите название"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author-shorts">Автор</Label>
                    <Input
                      id="author-shorts"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Укажите автора"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoUrl-shorts">Ссылка на Shorts (YouTube)</Label>
                    <Input
                      id="videoUrl-shorts"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/shorts/..."
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Добавление..." : "Добавить Shorts"}
                  </Button>
                </form>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortsVideos.map(renderVideoCard)}
              
              {shortsVideos.length === 0 && (
                <Card className="md:col-span-2 lg:col-span-3 p-12 text-center backdrop-blur-sm bg-card/90 border-border/50">
                  <Icon name="Smartphone" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">Shorts пока нет. Добавьте первый!</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
