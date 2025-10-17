import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL = "https://functions.poehali.dev/96ce21ed-e22a-41d3-a430-bb779560e271";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPhotos(data.photos || []);
  };

  const deletePhoto = async (id: number) => {
    await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'X-Auth-Token': 'admin-temp-token'
      }
    });
    fetchPhotos();
  };

  const deleteTestPhotos = async () => {
    await deletePhoto(1);
    await deletePhoto(2);
    await deletePhoto(4);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Админка галереи</h1>
        
        <Button onClick={deleteTestPhotos} variant="destructive" size="lg">
          Удалить Test Photo и дубликат Красный Рассвет
        </Button>

        <div className="grid gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="p-4 flex items-center gap-4">
              <img src={photo.image_url} alt={photo.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">ID: {photo.id} - {photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
              <Button onClick={() => deletePhoto(photo.id)} variant="destructive">
                Удалить
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
