import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { setAuthToken } from "@/lib/auth";

const API_URL = "https://functions.poehali.dev/cb189d68-b747-493c-b6b9-5a939f355c3d";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

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
          title: "Успешно!",
          description: "Вы вошли в админ-панель",
        });
        navigate("/admin");
      } else if (response.status === 429) {
        setIsLocked(true);
        toast({
          title: "Аккаунт заблокирован",
          description: data.error || `Слишком много попыток входа. Попробуйте через ${data.lockout_minutes || 15} минут`,
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
            Админ-панель
          </h1>
          <p className="text-muted-foreground">Войдите для управления сайтом</p>
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