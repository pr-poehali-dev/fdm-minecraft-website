import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/5cb318ce-7d10-4b48-ae74-369eb19c2392";

interface Video {
  id: number;
  title: string;
  author: string;
  video_url: string;
  created_at: string;
}

export default function VideoFacts() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить видео",
        variant: "destructive"
      });
    }
  };

  const addVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !videoUrl) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          video_url: videoUrl
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Видео добавлено"
        });
        setTitle("");
        setAuthor("");
        setVideoUrl("");
        fetchVideos();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить видео",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
      });
      toast({
        title: "Удалено",
        description: "Видео удалено"
      });
      fetchVideos();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить видео",
        variant: "destructive"
      });
    }
  };

  const getVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Icon name="Video" size={40} className="text-primary" />
          <h1 className="text-4xl font-bold">ВидеоФакты</h1>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-card/90 border-border/50">
          <h2 className="text-2xl font-bold mb-4">Добавить видео</h2>
          <form onSubmit={addVideo} className="space-y-4">
            <div>
              <Label htmlFor="title">Название видео</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="author">Автор</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Укажите автора видео"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="videoUrl">Ссылка на видео (YouTube)</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="mt-1"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Добавление..." : "Добавить видео"}
            </Button>
          </form>
        </Card>

        <div className="grid gap-6">
          {videos.map((video) => {
            const videoId = getVideoId(video.video_url);
            return (
              <Card key={video.id} className="overflow-hidden backdrop-blur-sm bg-card/90 border-border/50">
                <div className="grid md:grid-cols-2 gap-4 p-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    {videoId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Icon name="Video" size={48} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
                      <p className="text-muted-foreground flex items-center gap-2 mb-4">
                        <Icon name="User" size={16} />
                        {video.author}
                      </p>
                      <a 
                        href={video.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <Icon name="ExternalLink" size={16} />
                        Смотреть на YouTube
                      </a>
                    </div>
                    
                    <Button 
                      onClick={() => deleteVideo(video.id)} 
                      variant="destructive"
                      className="mt-4"
                    >
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
          
          {videos.length === 0 && (
            <Card className="p-12 text-center backdrop-blur-sm bg-card/90 border-border/50">
              <Icon name="Video" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">Видео пока нет. Добавьте первое!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
