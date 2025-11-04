import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            Freedom
          </h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/rules")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              Правила
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
