import Icon from "@/components/ui/icon";

export const ClansHeader = () => {
  return (
    <header className="text-center space-y-4 animate-fade-in">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Icon name="Shield" size={48} className="text-primary" />
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Кланы Freedom
        </h1>
        <Icon name="Swords" size={48} className="text-accent" />
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Легендарные объединения игроков, которые оставили свой след в истории сервера
      </p>
    </header>
  );
};
