CREATE TABLE lgpd_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    telefone VARCHAR(50),
    data_preferida DATE,
    hora_preferida TIME,
    urgencia VARCHAR(50) DEFAULT 'normal',
    observacoes TEXT,
    status VARCHAR(50) DEFAULT 'agendada',
    lead_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);