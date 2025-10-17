-- Добавляем поле для отметки прочитано/не прочитано
ALTER TABLE t_p55599668_fdm_minecraft_websit.forum_messages 
ADD COLUMN is_read BOOLEAN DEFAULT FALSE;

-- Создаем индекс для быстрого поиска непрочитанных
CREATE INDEX idx_forum_messages_is_read ON t_p55599668_fdm_minecraft_websit.forum_messages(is_read);
