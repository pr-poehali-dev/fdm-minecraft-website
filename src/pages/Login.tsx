import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { setAuthToken } from "@/lib/auth";

const API_URL = "https://functions.poehali.dev/cb189d68-b747-493c-b6b9-5a939f355c3d";
const TELEGRAM_AUTH_URL = "https://functions.poehali.dev/1de901ae-f25c-4c6f-8148-f992954a8a15";
const TELEGRAM_BOT_USERNAME = "YOUR_BOT_USERNAME";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [loginMethod, setLoginMethod] = useState<'password' | 'telegram'>('password');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const telegramData: Record<string, string> = {};
    
    urlParams.forEach((value, key) => {
      telegramData[key] = value;
    });
    
    if (telegramData.id && telegramData.hash) {
      handleTelegramAuth(telegramData);
    }
  }, []);

  const handleTelegramAuth = async (telegramData: Record<string, string>) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(telegramData).toString();
      const response = await fetch(`${TELEGRAM_AUTH_URL}?${queryString}`);
      const data = await response.json();

      if (response.ok) {
        setAuthToken(data.token, data.username);
        toast({
          title: "Добро пожаловать!",
          description: data.full_name ? `${data.full_name} (@${data.username})` : `Вы вошли через Telegram`,
        });
        window.history.replaceState({}, document.title, "/login");
        navigate("/admin");
      } else {
        toast({
          title: "Ошибка Telegram",
          description: data.error || "Не удалось войти через Telegram",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthToken(data.token, data.username);
        toast({
          title: "Добро пожаловать!",
          description: data.full_name ? `${data.full_name} (${data.role})` : `Вы вошли как ${data.username}`,
        });
        navigate("/admin");
      } else if (response.status === 429) {
        setIsLocked(true);
        toast({
          title: "Аккаунт заблокирован",
          description: data.error || `Слишком много попыток входа. Попробуйте через ${data.lockout_minutes || 15} минут`,
          variant: "destructive",
        });
      } else if (response.status === 403) {
        toast({
          title: "Доступ запрещен",
          description: data.error || "Ваш аккаунт отключен",
          variant: "destructive",
        });
      } else {
        if (data.remaining_attempts !== undefined) {
          setRemainingAttempts(data.remaining_attempts);
        }
        
        let description = data.error || "Неверные данные";
        if (data.remaining_attempts !== undefined && data.remaining_attempts > 0) {
          description += `. Осталось попыток: ${data.remaining_attempts}`;
        } else if (data.remaining_attempts === 0) {
          description = "Слишком много неудачных попыток. Аккаунт заблокирован на 15 минут";
          setIsLocked(true);
        }
        
        toast({
          title: "Ошибка",
          description,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      <Card className="w-full max-w-md p-8 space-y-6 relative z-10 bg-card/80 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Icon name="Lock" size={48} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Вход в админ-панель
          </h1>
          <p className="text-muted-foreground">Minecraft Server - Панель управления</p>
        </div>

        {isLocked && (
          <div className="p-4 bg-destructive/10 border-2 border-destructive/30 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <Icon name="ShieldAlert" size={20} />
              <p className="text-sm font-semibold">Доступ временно заблокирован</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Слишком много неудачных попыток входа. Попробуйте через 15 минут.
            </p>
          </div>
        )}

        {!isLocked && remainingAttempts !== null && remainingAttempts <= 2 && (
          <div className="p-4 bg-orange-500/10 border-2 border-orange-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-orange-500">
              <Icon name="AlertTriangle" size={20} />
              <p className="text-sm font-semibold">Осталось попыток: {remainingAttempts}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              disabled={isLocked}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={isLocked}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading || isLocked}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">или</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.async = true;
            script.setAttribute('data-telegram-login', TELEGRAM_BOT_USERNAME);
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-auth-url', window.location.href);
            script.setAttribute('data-request-access', 'write');
            document.getElementById('telegram-login-container')?.appendChild(script);
          }}
          disabled={isLocked}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.122.098.155.231.171.324.016.093.036.305.02.469z"/>
          </svg>
          Войти через Telegram
        </Button>
        <div id="telegram-login-container" className="hidden"></div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate("/")}
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          На главную
        </Button>
      </Card>
    </div>
  );
}