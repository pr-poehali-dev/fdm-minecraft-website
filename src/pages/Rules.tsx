import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const Rules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Правила сервера
            </h1>
            <p className="text-muted-foreground text-lg">
              Следуйте правилам для комфортной игры!
            </p>
          </div>

          <div className="space-y-6">
            {/* Термины */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="BookOpen" className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Основные термины и положения</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Правила:</span>
                      <span>Нормы поведения для пользователей в игре и соцсетях. Все участники обязаны их соблюдать.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Флуд:</span>
                      <span>Повторяющиеся или бессмысленные сообщения (более 3 подряд).</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Спам:</span>
                      <span>Нежелательная реклама, отвлекающая от игры.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Бан:</span>
                      <span>Ограничение доступа к серверу.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Кик:</span>
                      <span>Принудительное отключение от сервера.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Мут:</span>
                      <span>Временное отключение от чата.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Варн:</span>
                      <span>Предупреждение (2 варна — кик, 3 варна — бан).</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Игрок:</span>
                      <span>Пользователь, играющий на сервере.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[120px]">Приватные чаты:</span>
                      <span>Личные сообщения и клановые чаты.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Общие правила */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Общие правила</h2>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">1.</span>
                      <div>
                        <span className="font-semibold text-foreground">Согласие:</span>
                        <span className="text-muted-foreground"> Регистрация = согласие с правилами. Незнание не освобождает от ответственности.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">2.</span>
                      <div>
                        <span className="font-semibold text-foreground">Безопасность аккаунта:</span>
                        <span className="text-muted-foreground"> Пользователь отвечает за защиту своего аккаунта.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">3.</span>
                      <div>
                        <span className="font-semibold text-foreground">Бесплатный сервис:</span>
                        <span className="text-muted-foreground"> Администрация не гарантирует корректную работу и не возвращает потерянные вещи.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">4.</span>
                      <div>
                        <span className="font-semibold text-foreground">Блокировка:</span>
                        <span className="text-muted-foreground"> При блокировке аккаунта ценности не возвращаются.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">5.</span>
                      <div>
                        <span className="font-semibold text-foreground">Вмешательство:</span>
                        <span className="text-muted-foreground"> Администрация может вмешиваться в игровой процесс при необходимости.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">6.</span>
                      <div>
                        <span className="font-semibold text-foreground">Запрещенные действия:</span>
                        <span className="text-muted-foreground"> Нельзя рекламировать сторонние проекты, создавать оскорбительные никнеймы, лжесвидетельствовать, шантажировать и т.д.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">7.</span>
                      <div>
                        <span className="font-semibold text-foreground">Жалобы:</span>
                        <span className="text-muted-foreground"> Подавать в течение 48 часов.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">8.</span>
                      <div>
                        <span className="font-semibold text-foreground">Кланы:</span>
                        <span className="text-muted-foreground"> Запрещены кланы с аморальным содержанием или с отсылками к администрации.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Правила чата */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="MessageSquare" className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Правила поведения в чате</h2>
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground mb-2">Запрещено:</p>
                    <ul className="space-y-2 text-muted-foreground ml-4">
                      <li className="flex gap-2">
                        <Icon name="X" size={16} className="text-destructive mt-1 flex-shrink-0" />
                        <span>Флудить и спамить</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="X" size={16} className="text-destructive mt-1 flex-shrink-0" />
                        <span>Оскорблять или провоцировать конфликты</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="X" size={16} className="text-destructive mt-1 flex-shrink-0" />
                        <span>Угрожать и обсуждать администрацию</span>
                      </li>
                      <li className="flex gap-2">
                        <Icon name="X" size={16} className="text-destructive mt-1 flex-shrink-0" />
                        <span>Попрошайничество и публичная критика</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Игровой процесс */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="Gamepad2" className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Игровой процесс</h2>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">1.</span>
                      <div>
                        <span className="font-semibold text-foreground">Потеря предметов:</span>
                        <span className="text-muted-foreground"> Игрок не обязан возвращать потерянные вещи.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">2.</span>
                      <div>
                        <span className="font-semibold text-foreground">Запрещенные действия:</span>
                        <span className="text-muted-foreground"> Нельзя использовать дюпы и баги, обманывать игроков и администрацию.</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[30px]">3.</span>
                      <div>
                        <span className="font-semibold text-foreground">Попытки взлома:</span>
                        <span className="text-muted-foreground"> Наказуемы перманентным баном. Аккаунты, подвергшиеся взлому, блокируются до выяснения.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Заключение */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="text-center">
                <Icon name="Heart" className="text-primary mx-auto mb-3" size={32} />
                <p className="text-lg font-medium text-foreground">
                  Следуйте правилам, чтобы избежать наказаний и обеспечить комфортное времяпрепровождение в игре!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
