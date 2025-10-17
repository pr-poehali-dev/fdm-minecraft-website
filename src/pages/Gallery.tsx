import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

const API_URL = "https://functions.poehali.dev/96ce21ed-e22a-41d3-a430-bb779560e271";

export default function Gallery() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фотографии",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="ImageOff" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">Пока нет фотографий в галерее</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card 
                key={photo.id}
                className="group overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/60 transition-all cursor-pointer shadow-lg hover:shadow-primary/20"
                onClick={() => setSelectedImage(photo.image_url)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={photo.image_url} 
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{photo.title}</h3>
                      <p className="text-sm text-white/80">{photo.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
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