-- Изменение структуры таблицы admin_users (добавление новых полей)
ALTER TABLE t_p55599668_fdm_minecraft_websit.admin_users 
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS full_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'admin',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;

-- Изменение структуры таблицы login_attempts
ALTER TABLE t_p55599668_fdm_minecraft_websit.login_attempts
ADD COLUMN IF NOT EXISTS user_agent TEXT,
ADD COLUMN IF NOT EXISTS failure_reason VARCHAR(100);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_login_ip_time ON t_p55599668_fdm_minecraft_websit.login_attempts(ip_address, attempt_time);
CREATE INDEX IF NOT EXISTS idx_login_username_time ON t_p55599668_fdm_minecraft_websit.login_attempts(username, attempt_time);

-- Обновление существующего администратора или добавление нового
INSERT INTO t_p55599668_fdm_minecraft_websit.admin_users 
(username, password_hash, email, full_name, role, is_active) 
VALUES 
('superadmin', '$2b$10$rQZ8JZKj8zKq5Q7YxJZLU.O5H7W5fXKkj3Q8J7ZLU5Q7YxJZLU.O5', 'admin@minecraft.local', 'Главный администратор', 'superadmin', TRUE)
ON CONFLICT (username) DO NOTHING;