import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface MusicAdminProps {
  tracks: Track[];
  onTracksUpdate: (tracks: Track[]) => void;
}

const MusicAdmin = ({ tracks, onTracksUpdate }: MusicAdminProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newTrack: Track = {
      id: Date.now().toString(),
      title: newTitle || file.name.replace('.mp3', ''),
      artist: newArtist || "Unknown Artist",
      url: url
    };

    onTracksUpdate([...tracks, newTrack]);
    setNewTitle("");
    setNewArtist("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    onTracksUpdate(tracks.filter(track => track.id !== id));
  };

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setNewTitle(track.title);
    setNewArtist(track.artist);
  };

  const handleSaveEdit = () => {
    if (!editingTrack) return;
    
    onTracksUpdate(
      tracks.map(track => 
        track.id === editingTrack.id 
          ? { ...track, title: newTitle, artist: newArtist }
          : track
      )
    );
    
    setEditingTrack(null);
    setNewTitle("");
    setNewArtist("");
  };

  const handleCancelEdit = () => {
    setEditingTrack(null);
    setNewTitle("");
    setNewArtist("");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-50"
      >
        <Icon name="Settings" size={16} className="mr-2" />
        Управление музыкой
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">Управление музыкой</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Добавить новый трек</h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="track-title">Название трека</Label>
                <Input
                  id="track-title"
                  placeholder="Например: Sweden"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="track-artist">Исполнитель</Label>
                <Input
                  id="track-artist"
                  placeholder="Например: C418"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="track-file">MP3 файл</Label>
                <Input
                  id="track-file"
                  type="file"
                  accept=".mp3,audio/mpeg"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Список треков ({tracks.length})</h3>
            
            {tracks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Треков пока нет. Добавьте первый трек!
              </p>
            ) : (
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <Card key={track.id} className="p-4">
                    {editingTrack?.id === track.id ? (
                      <div className="space-y-3">
                        <Input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Название трека"
                        />
                        <Input
                          value={newArtist}
                          onChange={(e) => setNewArtist(e.target.value)}
                          placeholder="Исполнитель"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            className="flex-1"
                          >
                            <Icon name="Check" size={16} className="mr-2" />
                            Сохранить
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Icon name="X" size={16} className="mr-2" />
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{track.title}</p>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(track)}
                            variant="ghost"
                            size="icon"
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            onClick={() => handleDelete(track.id)}
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MusicAdmin;
