import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export const CreateClanCTA = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm border-2 border-primary/40 p-8 shadow-2xl">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Хочешь создать свой клан?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Объединяйся с друзьями, стройте легендарные базы и вписывайте своё имя в историю Freedom!
        </p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all shadow-lg"
          onClick={() => navigate("/")}
        >
          <Icon name="Swords" size={20} className="mr-2" />
          Начать играть
        </Button>
      </div>
    </Card>
  );
};
