import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";
import MusicAdmin from "./MusicAdmin";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

const DEFAULT_TRACKS: Track[] = [
  { id: "1", title: "Key", artist: "C418", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "2", title: "Subwoofer Lullaby", artist: "C418", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "3", title: "Living Mice", artist: "C418", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "4", title: "Haggstrom", artist: "C418", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "5", title: "Minecraft", artist: "C418", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const MusicPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem('musicTracks');
    return saved ? JSON.parse(saved) : DEFAULT_TRACKS;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTracksUpdate = (newTracks: Track[]) => {
    setTracks(newTracks);
    localStorage.setItem('musicTracks', JSON.stringify(newTracks));
    if (currentTrack >= newTracks.length) {
      setCurrentTrack(0);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume / 100;
    audio.preload = "metadata";
    
    audio.addEventListener('ended', () => {
      handleNext();
    });

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('error', () => {
      handleNext();
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying && tracks.length > 0) {
      audioRef.current.src = tracks[currentTrack].url;
      
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying, tracks]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (tracks.length === 0) {
    return (
      <>
        <MusicAdmin tracks={tracks} onTracksUpdate={handleTracksUpdate} />
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="p-4 backdrop-blur-md bg-card/95 border-primary/40">
            <p className="text-sm text-muted-foreground">
              Нет треков. Откройте админ-панель для добавления музыки.
            </p>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <MusicAdmin tracks={tracks} onTracksUpdate={handleTracksUpdate} />
      <div className="fixed bottom-6 right-6 z-50">
        <Card 
        className={`backdrop-blur-md bg-card/95 border-primary/40 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-16 h-16' : 'w-80'
        }`}
      >
        {isMinimized ? (
          <Button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-2 border-green-500/40"
            size="icon"
          >
            <div className="relative">
              <Icon name="Music" size={24} className="text-green-400" />
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
          </Button>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-500/20 rounded-lg relative">
                  <Icon name="Music" size={20} className="text-green-400" />
                  {isPlaying && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{tracks[currentTrack].artist}</h3>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {tracks[currentTrack].title}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsMinimized(true)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Icon name="ChevronDown" size={16} />
              </Button>
            </div>

            <div className="space-y-1">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Icon name="SkipBack" size={18} />
              </Button>
              
              <Button
                onClick={togglePlay}
                size="icon"
                className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>

              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Icon name="SkipForward" size={18} />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Volume2" size={16} className="text-muted-foreground" />
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-wrap max-h-24 overflow-y-auto scrollbar-thin">
              {tracks.map((track, index) => (
                <Button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    if (!isPlaying) setIsPlaying(true);
                  }}
                  variant={currentTrack === index ? "default" : "ghost"}
                  size="sm"
                  className="text-xs h-7"
                >
                  {track.title}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
    </>
  );
};

export default MusicPlayer;