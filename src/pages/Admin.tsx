import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { getAuthUser, clearAuth } from "@/lib/auth";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

const GALLERY_API_URL = "https://functions.poehali.dev/96ce21ed-e22a-41d3-a430-bb779560e271";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    description: "",
    image_url: ""
  });

  const authUser = getAuthUser();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    fetchPhotos();
  }, [authUser, navigate]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(GALLERY_API_URL);
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

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch(GALLERY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": authUser?.token || ""
        },
        body: JSON.stringify(newPhoto)
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Фотография добавлена"
        });
        setNewPhoto({ title: "", description: "", image_url: "" });
        fetchPhotos();
      } else {
        const data = await response.json();
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось добавить фото",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить фото",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (!confirm("Удалить эту фотографию?")) return;

    try {
      const response = await fetch(`${GALLERY_API_URL}?id=${id}`, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": authUser?.token || ""
        }
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Фотография удалена"
        });
        fetchPhotos();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить фото",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить фото",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
    toast({
      title: "Выход",
      description: "Вы вышли из админ-панели"
    });
  };

  if (!authUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAwIEwgMjAgMjAgTCAwIDIwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      <nav className="relative z-20 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Админ-панель
          </h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">
              <Icon name="User" size={16} className="inline mr-1" />
              {authUser.username}
            </span>
            <Button variant="ghost" onClick={() => navigate("/admin/security")}>
              <Icon name="Shield" size={18} className="mr-2" />
              Безопасность
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <Icon name="Home" size={18} className="mr-2" />
              На сайт
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-8 relative z-10">
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Icon name="Plus" size={24} className="mr-2 text-primary" />
            Добавить фотографию
          </h2>
          
          <form onSubmit={handleAddPhoto} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                placeholder="Название фото"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                placeholder="Описание фото"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL изображения</Label>
              <Input
                id="image_url"
                value={newPhoto.image_url}
                onChange={(e) => setNewPhoto({ ...newPhoto, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={18} className="mr-2" />
                  Добавить фото
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Icon name="Image" size={24} className="mr-2 text-primary" />
            Все фотографии ({photos.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Icon name="ImageOff" size={48} className="mx-auto mb-4" />
              <p>Нет фотографий</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden group">
                  <div className="relative">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{photo.title}</h3>
                    <p className="text-sm text-muted-foreground">{photo.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}