import { Card } from "@/components/ui/card";

export const OnlineChartSection = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">График онлайна</h2>
      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 p-6 shadow-lg">
        <iframe 
          src="https://minecraftrating.ru/server_chart/282092/" 
          width="100%" 
          height="300" 
          frameBorder="0"
          title="График онлайна сервера"
        />
      </Card>
    </section>
  );
};
