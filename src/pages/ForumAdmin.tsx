import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  email_sent: boolean;
}

const ForumAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b');
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

  useEffect(() => {
    fetchMessages();
  }, []);

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
      const response = await fetch('https://functions.poehali.dev/1fd0019a-4f24-45a7-8653-c476463bb23b', {
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
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border-2 border-orange-500/40 minecraft-card">
              <Icon name="Shield" size={48} className="text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent minecraft-text">
              🛡️ Админ-панель форума
            </h1>
            <p className="text-muted-foreground text-lg">
              Управление сообщениями и ответы игрокам
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Загрузка сообщений...</p>
            </div>
          ) : messages.length === 0 ? (
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 p-12 text-center minecraft-card">
              <Icon name="Inbox" size={64} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Пока нет сообщений</h3>
              <p className="text-muted-foreground">Когда игроки отправят сообщения через форум, они появятся здесь</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <Card key={msg.id} className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-2 border-purple-500/30 p-6 minecraft-card">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Icon name="User" size={20} className="text-purple-400" />
                          <span className="font-bold text-lg">{msg.nickname}</span>
                          {getStatusBadge(msg.status)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={14} />
                          {formatDate(msg.created_at)}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/40">
                          ID: #{msg.id}
                        </span>
                      </div>
                    </div>

                    <div className="bg-background/50 rounded-lg p-4 border border-purple-500/20">
                      <p className="text-sm font-bold text-purple-400 mb-2">💬 Сообщение игрока:</p>
                      <p className="whitespace-pre-wrap text-foreground">{msg.message}</p>
                    </div>

                    {msg.admin_reply ? (
                      <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400" />
                          <p className="text-sm font-bold text-green-400">✅ Ваш ответ:</p>
                          {msg.replied_at && (
                            <span className="text-xs text-muted-foreground ml-auto">
                              {formatDate(msg.replied_at)}
                            </span>
                          )}
                        </div>
                        <p className="whitespace-pre-wrap text-foreground">{msg.admin_reply}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Textarea
                          value={replyText[msg.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                          placeholder="Напишите ответ игроку..."
                          className="bg-background/50 border-purple-500/30 focus:border-purple-500 transition-all minecraft-input min-h-[120px] resize-none"
                          disabled={replyingTo === msg.id}
                        />
                        <Button
                          onClick={() => handleReply(msg.id)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 shadow-lg hover:shadow-purple-500/50 transition-all minecraft-button"
                          disabled={replyingTo === msg.id}
                        >
                          {replyingTo === msg.id ? (
                            <>
                              <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                              Отправка...
                            </>
                          ) : (
                            <>
                              <Icon name="Send" size={18} className="mr-2" />
                              📨 Отправить ответ
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumAdmin;
