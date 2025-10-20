import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ForumMessage {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
  status: string;
  admin_reply: string | null;
  replied_at: string | null;
}

const Forum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(() => localStorage.getItem('forumNickname') || "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answeredMessages, setAnsweredMessages] = useState<ForumMessage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchAnsweredMessages = async () => {
      const savedNickname = localStorage.getItem('forumNickname');
      if (!savedNickname) return;
      
      try {
        const response = await fetch(`https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b?status=answered&nickname=${encodeURIComponent(savedNickname)}`);
        const data = await response.json();
        setAnsweredMessages(data.messages || []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchAnsweredMessages();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "❌ Ошибка",
        description: "Заполните все поля!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: name,
          message: message
        })
      });

      if (response.ok) {
        // Сохраняем nickname в localStorage
        localStorage.setItem('forumNickname', name);
        
        toast({
          title: "✅ Отправлено!",
          description: "Ваше сообщение получено. Ответ появится здесь, когда администратор ответит.",
        });
        setMessage("");
        
        // Обновляем список сообщений
        const refreshResponse = await fetch(`https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b?status=answered&nickname=${encodeURIComponent(name)}`);
        const refreshData = await refreshResponse.json();
        setAnsweredMessages(refreshData.messages || []);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshAnswers = async () => {
    const savedNickname = localStorage.getItem('forumNickname');
    if (!savedNickname) {
      toast({
        title: "📝 Сначала отправьте сообщение",
        description: "Отправьте первое сообщение, чтобы видеть ответы",
        variant: "destructive"
      });
      return;
    }
    
    setIsRefreshing(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b?status=answered&nickname=${encodeURIComponent(savedNickname)}`);
      const data = await response.json();
      setAnsweredMessages(data.messages || []);
      
      toast({
        title: "✅ Обновлено!",
        description: data.messages?.length > 0 ? `Найдено ответов: ${data.messages.length}` : "Новых ответов пока нет",
      });
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось загрузить ответы",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImJsb2NrIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYmxvY2spIi8+PC9zdmc+')] opacity-40"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <h1 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            Freedom
          </h1>
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary transition-colors text-sm md:text-base"
          >
            <Icon name="Home" size={16} className="mr-1 md:mr-2" />
            На главную
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10 max-w-4xl">
        <div className="space-y-6 md:space-y-8 animate-fade-in">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="inline-block p-3 md:p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border-2 border-green-500/40 minecraft-card">
              <Icon name="MessageSquare" size={36} className="text-green-400 md:w-12 md:h-12" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent minecraft-text px-2">
              📜 Форум обратной связи
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">
              Поделись своим мнением, предложением или вопросом
            </p>
          </div>

          <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 p-4 sm:p-6 md:p-8 shadow-2xl minecraft-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Icon name="User" size={16} className="text-green-400" />
                  Твой никнейм в игре
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Steve"
                  className="bg-background/50 border-green-500/30 focus:border-green-500 transition-all minecraft-input text-lg"
                  maxLength={50}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} className="text-green-400" />
                  Твоё сообщение
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напиши здесь свои предложения, вопросы или отзывы о сервере..."
                  className="bg-background/50 border-green-500/30 focus:border-green-500 transition-all minecraft-input min-h-[200px] text-lg resize-none"
                  maxLength={1000}
                  disabled={isSubmitting}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {message.length}/1000 символов
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 md:py-6 text-base md:text-lg shadow-lg hover:shadow-green-500/50 transition-all minecraft-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} className="mr-2" />
                    ✉️ Отправить сообщение
                  </>
                )}
              </Button>
            </form>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-500/30 p-4 md:p-6 minecraft-card">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded border border-blue-500/40">
                  <Icon name="Info" size={20} className="text-blue-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-base md:text-lg text-foreground">📋 Правила форума</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">⚔️</span>
                      <span>Будь вежлив и уважителен к другим игрокам</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">🛡️</span>
                      <span>Не используй оскорбления и нецензурную лексику</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">💎</span>
                      <span>Предлагай конструктивные идеи для улучшения сервера</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">🔥</span>
                      <span>Сообщай о багах и проблемах для их быстрого решения</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 p-4 md:p-6 text-center minecraft-card md:hover:scale-105 transition-transform">
              <Icon name="Lightbulb" size={28} className="mx-auto mb-2 md:mb-3 text-purple-400" />
              <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">💡 Предложения</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Делись идеями по улучшению сервера</p>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 p-4 md:p-6 text-center minecraft-card md:hover:scale-105 transition-transform">
              <Icon name="Bug" size={28} className="mx-auto mb-2 md:mb-3 text-red-400" />
              <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">🐛 Баги</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Сообщай об ошибках и глюках</p>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 p-4 md:p-6 text-center minecraft-card md:hover:scale-105 transition-transform">
              <Icon name="Star" size={28} className="mx-auto mb-2 md:mb-3 text-yellow-400" />
              <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">⭐ Отзывы</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Расскажи о своём опыте игры</p>
            </Card>
          </div>

          {(answeredMessages.length > 0 || localStorage.getItem('forumNickname')) && (
            <div className="space-y-4 md:space-y-6">
              <div className="text-center space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent minecraft-text">
                  💬 Твои сообщения и ответы
                </h2>
                <p className="text-muted-foreground text-sm md:text-base px-4">Здесь показаны только твои сообщения с ответами администрации</p>
                <Button
                  onClick={refreshAnswers}
                  disabled={isRefreshing}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold minecraft-button text-sm md:text-base"
                >
                  {isRefreshing ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Обновление...
                    </>
                  ) : (
                    <>
                      <Icon name="RefreshCw" size={18} className="mr-2" />
                      🔄 Обновить ответы
                    </>
                  )}
                </Button>
              </div>

              {answeredMessages.length === 0 ? (
                <Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 border-2 border-purple-500/30 p-6 md:p-8 text-center minecraft-card">
                  <Icon name="MessageCircle" size={40} className="mx-auto mb-3 md:mb-4 text-purple-400" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">⏳ Ожидаем ответа</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Администрация ещё не ответила на твои сообщения.<br />
                    Нажми "Обновить ответы" чтобы проверить наличие новых ответов.
                  </p>
                </Card>
              ) : (
                answeredMessages.map((msg) => {
                  return (
                    <Card key={msg.id} className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-cyan-500/30 p-4 md:p-6 minecraft-card">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Icon name="User" size={18} className="text-cyan-400" />
                              <span className="font-bold text-lg">{msg.nickname}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Icon name="Clock" size={12} />
                              {formatDate(msg.created_at)}
                            </div>
                          </div>
                        </div>

                        <div className="bg-background/50 rounded-lg p-4 border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">❓ Вопрос:</p>
                          <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                        </div>

                        {msg.admin_reply && (
                          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon name="Shield" size={16} className="text-green-400" />
                              <p className="text-xs font-bold text-green-400">✅ Ответ администрации:</p>
                              {msg.replied_at && (
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {formatDate(msg.replied_at)}
                                </span>
                              )}
                            </div>
                            <p className="whitespace-pre-wrap text-sm">{msg.admin_reply}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;