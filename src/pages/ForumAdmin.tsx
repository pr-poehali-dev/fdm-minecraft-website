import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import MusicAdmin from "@/components/MusicAdmin";

const VIDEO_API_URL = "https://functions.poehali.dev/5cb318ce-7d10-4b48-ae74-369eb19c2392";
const FORUM_API_URL = "https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b";
const ADMIN_PASSWORD = "202020lol";

interface ForumMessage {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
  status: string;
  admin_reply: string | null;
  replied_at: string | null;
  email_sent: boolean;
  is_read: boolean;
}

interface Video {
  id: number;
  title: string;
  author: string;
  video_url: string;
  is_short: boolean;
  views: number;
  created_at: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

const ForumAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem('admin_token')
  );
  const [musicTracks, setMusicTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem('musicTracks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const [videos, setVideos] = useState<Video[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      fetchMessages();
      fetchVideos();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  const handleMusicTracksUpdate = (newTracks: Track[]) => {
    setMusicTracks(newTracks);
    localStorage.setItem('musicTracks', JSON.stringify(newTracks));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await fetch(VIDEO_API_URL, {
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
          title: "✅ Вход выполнен",
          description: "Добро пожаловать в админ-панель!",
        });
        fetchMessages();
        fetchVideos();
      } else {
        toast({
          title: "❌ Ошибка входа",
          description: "Неверный пароль",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось войти",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('adminAuthenticated');
    setAuthToken(null);
    setPassword("");
    toast({
      title: "👋 Выход выполнен",
      description: "До встречи!",
    });
    navigate("/");
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(FORUM_API_URL);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось загрузить сообщения",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(VIDEO_API_URL);
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

  const addVideo = async (e: React.FormEvent, isShort: boolean) => {
    e.preventDefault();
    
    if (!videoTitle || !videoAuthor || !videoUrl) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setIsVideoLoading(true);
    try {
      const response = await fetch(VIDEO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || ''
        },
        body: JSON.stringify({
          title: videoTitle,
          author: videoAuthor,
          video_url: videoUrl,
          is_short: isShort
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: isShort ? "Shorts добавлен" : "Видео добавлено"
        });
        setVideoTitle("");
        setVideoAuthor("");
        setVideoUrl("");
        fetchVideos();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить видео",
        variant: "destructive"
      });
    } finally {
      setIsVideoLoading(false);
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      const response = await fetch(`${VIDEO_API_URL}?id=${id}`, {
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
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить видео",
        variant: "destructive"
      });
    }
  };

  const handleReply = async (messageId: number) => {
    const reply = replyText[messageId]?.trim();
    if (!reply) {
      toast({
        title: "❌ Ошибка",
        description: "Введите текст ответа",
        variant: "destructive",
      });
      return;
    }

    setReplyingTo(messageId);

    try {
      const response = await fetch(FORUM_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id: messageId,
          admin_reply: reply
        })
      });

      if (response.ok) {
        toast({
          title: "✅ Ответ отправлен!",
          description: "Ваш ответ опубликован на сайте",
        });
        setReplyText({ ...replyText, [messageId]: '' });
        fetchMessages();
      } else {
        throw new Error('Failed to reply');
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось отправить ответ",
        variant: "destructive",
      });
    } finally {
      setReplyingTo(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleReadStatus = async (messageId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(FORUM_API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id: messageId,
          is_read: !currentStatus
        })
      });

      if (response.ok) {
        toast({
          title: !currentStatus ? "✅ Отмечено прочитанным" : "📬 Отмечено непрочитанным",
          description: "Статус сообщения обновлён",
        });
        fetchMessages();
      } else {
        throw new Error('Failed to toggle');
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/40">🆕 Новое</span>;
      case 'answered':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/40">✅ Отвечено</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">{status}</span>;
    }
  };

  const regularVideos = videos.filter(v => !v.is_short);
  const shortsVideos = videos.filter(v => v.is_short);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImJsb2NrIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYmxvY2spIi8+PC9zdmc+')] opacity-40"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            Freedom
          </h1>
          <div className="flex gap-4">
            {isAuthenticated && (
              <Button 
                variant="ghost"
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            )}
            <Button 
              variant="ghost"
              onClick={() => navigate("/forum")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Форум
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        {!isAuthenticated ? (
          <div className="space-y-8 animate-fade-in max-w-md mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border-2 border-orange-500/40 minecraft-card">
                <Icon name="Lock" size={48} className="text-orange-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent">
                Админ-панель
              </h1>
              <p className="text-muted-foreground text-lg">
                Управление форумом и видеофактами
              </p>
            </div>

            <Card className="p-8 backdrop-blur-sm bg-card/90 border-border/50 border-orange-500/30 minecraft-card">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg">🔑 Пароль администратора</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="h-12 text-lg minecraft-button"
                    disabled={isLoggingIn}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 minecraft-button"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" size={20} className="mr-2" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border-2 border-orange-500/40">
                <Icon name="Shield" size={32} className="text-orange-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Админ-панель
              </h1>
            </div>

            <Tabs defaultValue="forum" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="forum" className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={18} />
                  Форум ({messages.filter(m => !m.is_read).length})
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Icon name="Video" size={18} />
                  ВидеоФакты ({videos.length})
                </TabsTrigger>
                <TabsTrigger value="music" className="flex items-center gap-2">
                  <Icon name="Music" size={18} />
                  Музыка ({musicTracks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forum" className="space-y-6 mt-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Загрузка сообщений...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Icon name="Mail" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-xl text-muted-foreground">Сообщений пока нет</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <Card 
                        key={msg.id} 
                        className={`p-6 backdrop-blur-sm border-border/50 transition-all ${
                          !msg.is_read ? 'bg-card/90 border-orange-500/40' : 'bg-card/70'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <Icon name="User" size={24} className="text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{msg.nickname}</h3>
                              <p className="text-sm text-muted-foreground">{formatDate(msg.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(msg.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleReadStatus(msg.id, msg.is_read)}
                              className="h-8"
                            >
                              <Icon name={msg.is_read ? "Mail" : "MailOpen"} size={16} />
                            </Button>
                          </div>
                        </div>

                        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                        </div>

                        {msg.admin_reply && (
                          <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name="Reply" size={16} className="text-primary" />
                              <span className="text-sm font-semibold text-primary">Ваш ответ:</span>
                              <span className="text-xs text-muted-foreground">{msg.replied_at ? formatDate(msg.replied_at) : ''}</span>
                            </div>
                            <p className="whitespace-pre-wrap text-sm">{msg.admin_reply}</p>
                          </div>
                        )}

                        {msg.status === 'new' && (
                          <div className="space-y-3">
                            <Textarea
                              placeholder="Введите ответ..."
                              value={replyText[msg.id] || ''}
                              onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                              className="min-h-[100px]"
                            />
                            <Button
                              onClick={() => handleReply(msg.id)}
                              disabled={replyingTo === msg.id}
                              className="w-full"
                            >
                              {replyingTo === msg.id ? (
                                <>
                                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                                  Отправка...
                                </>
                              ) : (
                                <>
                                  <Icon name="Send" size={16} className="mr-2" />
                                  Отправить ответ
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="videos" className="space-y-6 mt-6">
                <Tabs defaultValue="regular">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="regular">Обычные видео ({regularVideos.length})</TabsTrigger>
                    <TabsTrigger value="shorts">Shorts ({shortsVideos.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="regular" className="space-y-6 mt-6">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Добавить видео</h3>
                      <form onSubmit={(e) => addVideo(e, false)} className="space-y-4">
                        <div>
                          <Label>Название</Label>
                          <Input
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            placeholder="Введите название видео"
                          />
                        </div>
                        <div>
                          <Label>Автор</Label>
                          <Input
                            value={videoAuthor}
                            onChange={(e) => setVideoAuthor(e.target.value)}
                            placeholder="Укажите автора"
                          />
                        </div>
                        <div>
                          <Label>Ссылка на YouTube</Label>
                          <Input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                        <Button type="submit" disabled={isVideoLoading} className="w-full">
                          {isVideoLoading ? "Добавление..." : "Добавить видео"}
                        </Button>
                      </form>
                    </Card>

                    <div className="grid gap-4">
                      {regularVideos.map((video) => (
                        <Card key={video.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold">{video.title}</h4>
                              <p className="text-sm text-muted-foreground">Автор: {video.author}</p>
                              <p className="text-sm text-muted-foreground">Просмотров: {video.views}</p>
                            </div>
                            <Button
                              onClick={() => deleteVideo(video.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="shorts" className="space-y-6 mt-6">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-4">Добавить Shorts</h3>
                      <form onSubmit={(e) => addVideo(e, true)} className="space-y-4">
                        <div>
                          <Label>Название</Label>
                          <Input
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                            placeholder="Введите название"
                          />
                        </div>
                        <div>
                          <Label>Автор</Label>
                          <Input
                            value={videoAuthor}
                            onChange={(e) => setVideoAuthor(e.target.value)}
                            placeholder="Укажите автора"
                          />
                        </div>
                        <div>
                          <Label>Ссылка на YouTube Shorts</Label>
                          <Input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/shorts/..."
                          />
                        </div>
                        <Button type="submit" disabled={isVideoLoading} className="w-full">
                          {isVideoLoading ? "Добавление..." : "Добавить Shorts"}
                        </Button>
                      </form>
                    </Card>

                    <div className="grid gap-4">
                      {shortsVideos.map((video) => (
                        <Card key={video.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold">{video.title}</h4>
                              <p className="text-sm text-muted-foreground">Автор: {video.author}</p>
                              <p className="text-sm text-muted-foreground">Просмотров: {video.views}</p>
                            </div>
                            <Button
                              onClick={() => deleteVideo(video.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="music" className="space-y-6 mt-6">
                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Управление музыкой</h3>
                    <p className="text-muted-foreground">
                      Добавляйте, редактируйте и удаляйте треки для музыкального плеера
                    </p>
                  </div>
                  <MusicAdmin tracks={musicTracks} onTracksUpdate={handleMusicTracksUpdate} />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumAdmin;