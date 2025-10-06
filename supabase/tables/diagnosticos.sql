CREATE TABLE diagnosticos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID,
    company_name VARCHAR(255) NOT NULL,
    responses JSONB NOT NULL,
    score INTEGER NOT NULL,
    maturity_level VARCHAR(50) NOT NULL,
    recommendations TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);