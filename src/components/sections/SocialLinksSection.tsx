import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface SocialLinksSectionProps {
  links: SocialLink[];
}

export const SocialLinksSection = ({ links }: SocialLinksSectionProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl text-center font-bold text-primary">Присоединяйся</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className={`${link.color} border-0 p-6 hover:scale-105 transition-all shadow-lg cursor-pointer`}>
              <div className="flex flex-col items-center text-center space-y-3 text-white">
                <Icon name={link.icon as any} size={32} />
                <h3 className="text-base font-bold">{link.name}</h3>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
};
