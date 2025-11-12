-- Bibble 2.0 Database Schema
-- PostgreSQL Migration: Initial Setup

-- Tabella utenti
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella abbonamenti
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(50) DEFAULT 'free', -- free, premium, enterprise
  status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella utilizzo tool (per tracking limiti free tier)
CREATE TABLE IF NOT EXISTS tool_usage (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  tool_id VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_id ON tool_usage(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Inserimento utente demo (password: 'password' - hash bcrypt)
-- NOTA: In produzione usare bcrypt per hash password
INSERT INTO users (email, name, password_hash, premium) 
VALUES ('test@bibble.local', 'Test User', 'password', FALSE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, name, password_hash, premium)
VALUES ('demo@bibble.local', 'Demo User', 'demo123', TRUE)
ON CONFLICT (email) DO NOTHING;

