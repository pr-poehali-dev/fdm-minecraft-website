import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

export const MinecraftAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Пожалуйста, введите вопрос");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("https://functions.poehali.dev/6085a04a-e3f8-4157-b321-3b15d66887c7", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при получении ответа");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Icon name="Brain" size={40} className="text-accent animate-pulse-subtle" />
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            AI-Помощник по Minecraft
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Задай любой вопрос о Minecraft, и AI ответит с логическим мышлением и детальными объяснениями
        </p>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/30 p-6 max-w-4xl mx-auto shadow-lg hover:shadow-accent/20 transition-all duration-300">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="MessageSquare" size={16} className="text-accent" />
              Твой вопрос:
            </label>
            <Textarea
              placeholder="Например: Как создать ферму мобов? Какие есть способы защиты базы? Как работает редстоун?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[100px] bg-background/50 border-accent/20 focus:border-accent transition-all duration-300 resize-none"
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="w-full bg-gradient-to-r from-accent to-primary hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                Думаю...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={20} className="mr-2" />
                Получить ответ
              </>
            )}
          </Button>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-fade-in">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}

          {answer && (
            <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 rounded-lg space-y-3 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Bot" size={24} className="text-accent" />
                <h3 className="text-lg font-bold text-accent">Ответ AI:</h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="p-4 bg-card/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Логическое мышление</h4>
              <p className="text-xs text-muted-foreground">AI анализирует вопрос и дает подробный ответ</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-3">
            <Icon name="BookOpen" size={20} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Знания о сервере</h4>
              <p className="text-xs text-muted-foreground">Учитывает особенности Freedom</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-card/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-start gap-3">
            <Icon name="Zap" size={20} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Быстрые ответы</h4>
              <p className="text-xs text-muted-foreground">Получи ответ за несколько секунд</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
