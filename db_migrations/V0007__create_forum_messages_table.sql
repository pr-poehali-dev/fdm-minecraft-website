-- Таблица для хранения сообщений форума
CREATE TABLE IF NOT EXISTS t_p55599668_fdm_minecraft_websit.forum_messages (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'new',
    admin_reply TEXT,
    replied_at TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE
);

-- Индексы для быстрого поиска
CREATE INDEX idx_forum_messages_status ON t_p55599668_fdm_minecraft_websit.forum_messages(status);
CREATE INDEX idx_forum_messages_created_at ON t_p55599668_fdm_minecraft_websit.forum_messages(created_at DESC);
