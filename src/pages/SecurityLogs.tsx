import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { getAuthUser, clearAuth } from "@/lib/auth";

interface LoginAttempt {
  id: number;
  ip_address: string;
  username: string;
  attempt_time: string;
  success: boolean;
}

const API_URL = "https://functions.poehali.dev/0c4c5b9d-0281-482d-9c0a-66ae15c5a2fd";

export default function SecurityLogs() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    uniqueIPs: 0
  });

  const authUser = getAuthUser();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    fetchLogs();
  }, [authUser, navigate]);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${API_URL}?limit=200`, {
        headers: {
          "X-Auth-Token": authUser?.token || ""
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAttempts(data.attempts || []);
        
        const successful = data.attempts.filter((a: LoginAttempt) => a.success).length;
        const failed = data.attempts.filter((a: LoginAttempt) => !a.success).length;
        const uniqueIPs = new Set(data.attempts.map((a: LoginAttempt) => a.ip_address)).size;
        
        setStats({
          total: data.total || 0,
          successful,
          failed,
          uniqueIPs
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить историю",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const clearOldLogs = async () => {
    if (!confirm("Удалить записи старше 30 дней?")) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": authUser?.token || ""
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Успешно!",
          description: `Удалено записей: ${data.deleted}`
        });
        fetchLogs();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось очистить логи",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить операцию",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  if (!authUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Логи безопасности
          </h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">
              <Icon name="User" size={16} className="inline mr-1" />
              {authUser.username}
            </span>
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего попыток</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <Icon name="Activity" size={32} className="text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Успешных</p>
                <p className="text-3xl font-bold text-green-500">{stats.successful}</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-500/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Неудачных</p>
                <p className="text-3xl font-bold text-red-500">{stats.failed}</p>
              </div>
              <Icon name="XCircle" size={32} className="text-red-500/50" />
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Уникальных IP</p>
                <p className="text-3xl font-bold text-blue-500">{stats.uniqueIPs}</p>
              </div>
              <Icon name="Globe" size={32} className="text-blue-500/50" />
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Icon name="Shield" size={24} className="mr-2 text-primary" />
              История входов
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchLogs} size="sm">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Обновить
              </Button>
              <Button variant="destructive" onClick={clearOldLogs} size="sm">
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить старые
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : attempts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Icon name="FileText" size={48} className="mx-auto mb-4" />
              <p>Нет записей</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-3 text-sm font-semibold">Дата и время</th>
                    <th className="text-left p-3 text-sm font-semibold">IP адрес</th>
                    <th className="text-left p-3 text-sm font-semibold">Логин</th>
                    <th className="text-left p-3 text-sm font-semibold">Результат</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr
                      key={attempt.id}
                      className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    >
                      <td className="p-3 text-sm">{formatDate(attempt.attempt_time)}</td>
                      <td className="p-3 text-sm font-mono">{attempt.ip_address}</td>
                      <td className="p-3 text-sm">{attempt.username || "—"}</td>
                      <td className="p-3">
                        {attempt.success ? (
                          <span className="inline-flex items-center gap-1 text-green-500 text-sm">
                            <Icon name="CheckCircle" size={16} />
                            Успешно
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500 text-sm">
                            <Icon name="XCircle" size={16} />
                            Ошибка
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
