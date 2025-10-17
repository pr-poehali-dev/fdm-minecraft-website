import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Forum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    setTimeout(() => {
      toast({
        title: "✅ Отправлено!",
        description: "Ваше сообщение получено. Спасибо за обратную связь!",
      });
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
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

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border-2 border-green-500/40 minecraft-card">
              <Icon name="MessageSquare" size={48} className="text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent minecraft-text">
              📜 Форум обратной связи
            </h1>
            <p className="text-muted-foreground text-lg">
              Поделись своим мнением, предложением или вопросом
            </p>
          </div>

          <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 p-8 shadow-2xl minecraft-card">
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-6 text-lg shadow-lg hover:shadow-green-500/50 transition-all minecraft-button"
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

          <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-500/30 p-6 minecraft-card">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded border border-blue-500/40">
                  <Icon name="Info" size={20} className="text-blue-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg text-foreground">📋 Правила форума</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 p-6 text-center minecraft-card hover:scale-105 transition-transform">
              <Icon name="Lightbulb" size={32} className="mx-auto mb-3 text-purple-400" />
              <h3 className="font-bold text-lg mb-2">💡 Предложения</h3>
              <p className="text-sm text-muted-foreground">Делись идеями по улучшению сервера</p>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 p-6 text-center minecraft-card hover:scale-105 transition-transform">
              <Icon name="Bug" size={32} className="mx-auto mb-3 text-red-400" />
              <h3 className="font-bold text-lg mb-2">🐛 Баги</h3>
              <p className="text-sm text-muted-foreground">Сообщай об ошибках и глюках</p>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 p-6 text-center minecraft-card hover:scale-105 transition-transform">
              <Icon name="Star" size={32} className="mx-auto mb-3 text-yellow-400" />
              <h3 className="font-bold text-lg mb-2">⭐ Отзывы</h3>
              <p className="text-sm text-muted-foreground">Расскажи о своём опыте игры</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
