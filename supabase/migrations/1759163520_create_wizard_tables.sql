-- Migration: create_wizard_tables
-- Created at: 1759163520

-- Criar tabela para progresso do wizard de diagnóstico
CREATE TABLE IF NOT EXISTS wizard_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL UNIQUE,
    user_data JSONB DEFAULT '{}',
    responses JSONB DEFAULT '{}',
    progress INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_wizard_progress_session_id ON wizard_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_wizard_progress_completed ON wizard_progress(completed);
CREATE INDEX IF NOT EXISTS idx_wizard_progress_created_at ON wizard_progress(created_at);;