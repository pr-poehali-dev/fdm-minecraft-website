import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "Главная база",
      description: "Эпический вид на нашу базу"
    },
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "Битва кланов",
      description: "Легендарная схватка"
    },
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "Постройки",
      description: "Невероятная архитектура"
    },
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "Ивенты",
      description: "События на сервере"
    },
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "Приключения",
      description: "Путешествия по миру"
    },
    {
      url: "https://media.discordapp.net/attachments/1062756965824086066/1414679374459965480/2024-12-30_14.02.14.png?ex=68ec9c96&is=68eb4b16&hm=3a3786bc261618dcb4eb119672440336ed4450bedf93b0999189907566ae5267&=&format=webp&quality=lossless&width=1521&height=856",
      title: "PvP",
      description: "Сражения игроков"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Freedom
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
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

      <div className="container mx-auto px-4 py-12 space-y-12 relative z-10">
        <header className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Фотогалерея
          </h1>
          <p className="text-muted-foreground">
            Лучшие моменты с сервера Freedom
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 transition-all cursor-pointer shadow-lg hover:shadow-primary/20"
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{image.title}</h3>
                    <p className="text-sm text-white/80">{image.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Полный размер"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
