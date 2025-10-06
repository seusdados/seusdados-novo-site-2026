-- Migration: create_questionnaire_table
-- Created at: 1759163641

CREATE TABLE questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    step_id TEXT NOT NULL,
    response JSONB,
    score INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questionnaire_session_id ON questionnaire_responses(session_id);
CREATE INDEX idx_questionnaire_step_id ON questionnaire_responses(step_id);;