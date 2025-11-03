
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Forum from "./pages/Forum";
import ForumAdmin from "./pages/ForumAdmin";
import GalleryAdmin from "./pages/GalleryAdmin";
import VideoFacts from "./pages/VideoFacts";
import NotFound from "./pages/NotFound";
import MusicPlayer from "./components/MusicPlayer";

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MusicPlayer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery-admin" element={<GalleryAdmin />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum-admin" element={<ForumAdmin />} />
          <Route path="/video-facts" element={<VideoFacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;