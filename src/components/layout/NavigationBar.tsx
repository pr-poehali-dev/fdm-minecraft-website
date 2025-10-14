import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Freedom
        </h1>
        <div className="flex gap-4">
          <Button 
            variant="ghost"
            onClick={() => navigate("/gallery")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Icon name="Image" size={18} className="mr-2" />
            Галерея
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate("/history")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Icon name="BookOpen" size={18} className="mr-2" />
            Наша История
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate("/clans")}
            className="text-foreground hover:text-primary transition-colors"
          >
            <Icon name="Shield" size={18} className="mr-2" />
            Кланы
          </Button>
          <a 
            href="https://fdm.trademc.org/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Магазин
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};
