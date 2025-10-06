CREATE TABLE lgpd_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    telefone VARCHAR(50),
    tipo_interesse VARCHAR(100) NOT NULL,
    mensagem TEXT,
    origem VARCHAR(100) DEFAULT 'implementacao_lgpd',
    ip_address INET,
    user_agent TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);