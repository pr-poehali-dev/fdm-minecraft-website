import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ServerRule {
  title: string;
  description: string;
  icon: string;
}

interface ServerRulesSectionProps {
  rules: ServerRule[];
}

export const ServerRulesSection = ({ rules }: ServerRulesSectionProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">Правила сервера</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rules.map((rule, index) => (
          <Card
            key={index}
            className="bg-card/60 backdrop-blur-sm border-2 border-border/50 p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Icon name={rule.icon as any} size={28} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{rule.title}</h3>
              <p className="text-xs text-muted-foreground">{rule.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
