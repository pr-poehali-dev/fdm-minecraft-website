import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          Freedom
        </h1>
        <div className="flex gap-4">
          <Button 
            variant="ghost"
            onClick={() => navigate("/gallery")}
            className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300"
          >
            <Icon name="Image" size={18} className="mr-2" />
            Галерея
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate("/history")}
            className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300"
          >
            <Icon name="BookOpen" size={18} className="mr-2" />
            Наша История
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate("/clans")}
            className="text-foreground hover:text-primary hover:scale-105 transition-all duration-300"
          >
            <Icon name="Shield" size={18} className="mr-2" />
            Кланы
          </Button>
          <a 
            href="https://fdm.trademc.org/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Магазин
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};