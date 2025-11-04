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
            {/* Термины и общие положения */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="BookOpen" className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Термины и общие положения</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Правила —</span>
                      <span>это свод рекомендаций, который устанавливает нормы поведения для пользователей в игре и в социальных сетях. Каждый зарегистрированный участник обязан соблюдать эти правила, независимо от должности, статуса или других заслуг.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Флуд —</span>
                      <span>это часто повторяющиеся или бессмысленные сообщения, которые составляют более трех сообщений подряд.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Спам —</span>
                      <span>это нежелательные рекламные сообщения, которые могут отвлекать от игры.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Бан —</span>
                      <span>это ограничение доступа пользователя к игровому серверу.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Кик —</span>
                      <span>это принудительное отключение пользователя от игрового сервера.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Мут —</span>
                      <span>временное ограничение доступа пользователя к игровому чату.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Варн —</span>
                      <span>это предупреждение (два варна — кик, три варна — перманентный бан).</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Игрок —</span>
                      <span>это человек, который играет на игровом сервере.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Приватные чаты —</span>
                      <span>это личные сообщения и клановые чаты, доступные только для определённых участников.</span>
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm">Если пользователь неоднократно нарушает какие-либо правила, наказание будет увеличиваться с каждым новым нарушением вплоть до перманентного бана.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-[150px]">Администратор —</span>
                      <span>это владелец проекта.</span>
                    </div>
                    <div className="mt-2 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm">Администратор сервера имеет право выбирать меру наказания, исходя из конкретной ситуации, и не обязательно следовать правилам. Он самостоятельно оценивает, насколько адекватно было применено наказание.</p>
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
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.1.</span>
                      <span>Каждый пользователь, который регистрируется на проекте или присоединяется к сообществу в социальных сетях (ВК, Telegram, Discord), автоматически соглашается со всеми правилами, изложенными ниже. Незнание правил не освобождает от ответственности.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.2.</span>
                      <span>Вы сами отвечаете за безопасность своего аккаунта и должны принимать все необходимые меры для его защиты. Взлом аккаунта не является оправданием, если игрок обвиняется в нарушении правил.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.3.</span>
                      <span>Сервис предоставляется бесплатно и без каких-либо гарантий корректной работы. Администрация оставляет за собой право не возвращать вещи, потерянные в результате технических сбоев, отката, смерти игрока, нестабильной работы серверов и т.д.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.4.</span>
                      <span>В случае блокировки аккаунта все игровые ценности, такие как предметы в инвентаре, территория, содержимое сундуков и прочее, не подлежат передаче другим игрокам или возврату.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.5.</span>
                      <span>Администрация оставляет за собой право в любое время вмешиваться в игровой процесс и принимать меры, если сочтет это необходимым. Под «необходимостью» подразумеваются ситуации, которые могут угрожать нормальной работе игрового сервера/проекта, создавать неудобства для игроков и т.д.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.6.</span>
                      <span>Любые игровые ценности, принадлежащие игроку, могут быть изъяты и удалены, если они были получены нечестным путем или стали результатом ошибки в работе игрового сервера.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.7.</span>
                      <span>Запрещается реклама и упоминание сторонних проектов в любом виде, а также призывы покинуть сервер.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.8.</span>
                      <div className="space-y-2">
                        <span>Не допускается регистрация никнеймов и установка префиксов, которые прямо или косвенно нарушают другие пункты правил, а также:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Использование символов или линий, которые затрудняют восприятие никнейма;</li>
                          <li>Наличие эротического или аморального содержания;</li>
                          <li>Явная отсылка к администрации проекта;</li>
                          <li>Упоминание содержимого никнейма, а также родных и близких.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.9.</span>
                      <span>Запрещается лжесвидетельствовать против игроков, подделывать доказательства и шантажировать ими.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.10.</span>
                      <span>Жалобы на нарушения должны быть поданы в течение 48 часов с момента их обнаружения.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.11.</span>
                      <span>Если у игрока уже есть забаненный аккаунт, модерация может заблокировать все остальные его учетные записи.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.12.</span>
                      <span>В случае необходимости игрок может быть временно заблокирован на время, необходимое для разрешения инцидента, связанного с нарушением правил.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.13.</span>
                      <div className="space-y-2">
                        <span>Запрещается создавать или устанавливать кланы, которые прямо или косвенно нарушают другие пункты правил, а также:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Имеющие эротический или аморальный характер;</li>
                          <li>Содержащие явные отсылки к администрации проекта;</li>
                          <li>Упоминающие содержание никнейма, родных и близких;</li>
                          <li>Имеющие названия, похожие на названия других, более популярных кланов.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.14.</span>
                      <span>Администратор имеет право наложить бан, не ссылаясь на конкретный пункт правил.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">1.15.</span>
                      <span>Администрация проекта может вносить изменения в свод правил без предварительного уведомления игроков.</span>
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
                  <h2 className="text-2xl font-bold mb-4">Правила поведения игроков в чате</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.0.</span>
                      <span>Приватные чаты (клановые и личные) не модерируются. Если вам кто-то мешает, воспользуйтесь функцией игнорирования.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.1.</span>
                      <div className="space-y-2">
                        <span className="font-semibold text-foreground">Запрещено:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Отправлять повторяющиеся сообщения (флуд);</li>
                          <li>Размещать рекламные объявления (куплю, продам и прочее) с интервалом менее 5 минут;</li>
                          <li>Отправлять бессмысленные сообщения;</li>
                          <li>Провоцировать флуд.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.2.</span>
                      <div className="space-y-2">
                        <span className="font-semibold text-foreground">Также запрещено:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Оскорблять игроков и их родственников;</li>
                          <li>Критиковать администрацию, сервер или проект в целом;</li>
                          <li>Создавать конфликты, отправляя провокационные сообщения в чат;</li>
                          <li>Разжигать межнациональную рознь;</li>
                          <li>Подстрекать других к нарушению правил;</li>
                          <li>Отправлять сообщения сексуального характера;</li>
                          <li>Угрожать физической расправой в реальной жизни;</li>
                          <li>Высказывать аморальные суждения в общем чате;</li>
                          <li>Вести себя неадекватно в общем чате.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.3.</span>
                      <span>Любые виды попрошайничества.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.4.</span>
                      <span>Публичная критика, оспаривание или обсуждение действий администрации проекта запрещены. Для этих целей существуют специальные каналы технической поддержки.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.5.</span>
                      <span>Запрещается распространять ложные сведения о вайпе. Все вайпы всегда публикуются в новостях проекта.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.6.</span>
                      <span>Любые призывы к действиям, которые критикуют администрацию или проект в целом, являются попыткой нанести вред игровому серверу.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">2.7.</span>
                      <span>Запрещается подталкивать игроков к нарушению правил проекта.</span>
                    </div>
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
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.1.</span>
                      <span>Игрок не обязан возвращать предметы, потерянные в PvP или случайно выброшенные им.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.2.</span>
                      <div className="space-y-2">
                        <span className="font-semibold text-foreground">Запрещается:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Хранение, использование или обсуждение дюпов, ошибок (багов) в работе игрового сервера и любых сторонних программ, которые могут дать дополнительные преимущества в игре или нанести вред игровому процессу и серверу;</li>
                          <li>Использование, распространение или хранение предметов, полученных нечестным путем.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.3.</span>
                      <div className="space-y-2">
                        <span className="font-semibold text-foreground">Запрещено:</span>
                        <ul className="ml-4 space-y-1 list-disc">
                          <li>Вводить в заблуждение игроков с целью получения собственной выгоды;</li>
                          <li>Вводить в заблуждение представителей администрации;</li>
                          <li>Выдавать себя за должностное лицо проекта/сервера, если вы таковым не являетесь.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.6.</span>
                      <span>Любые действия, направленные на помощь забаненному игроку (до или после бана), могут расцениваться как соучастие.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.7.</span>
                      <span>Игрок вправе отказаться от проверки, если его требует об этом обычный игрок.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.8.</span>
                      <span>Игрок не имеет права использовать скин, у которого полностью или частично отсутствует текстура, а также скин, который носит аморальный или провокационный характер.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.9.</span>
                      <span>Игроку запрещается пытаться нанести вред игровому серверу.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[40px]">3.10.</span>
                      <span>Игровой аккаунт является собственностью, и любые попытки взлома и входа на чужой аккаунт будут караться перманентным баном для нарушителя. Если аккаунт подвергся попыткам взлома, он будет временно заблокирован до выяснения обстоятельств и восстановления.</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
