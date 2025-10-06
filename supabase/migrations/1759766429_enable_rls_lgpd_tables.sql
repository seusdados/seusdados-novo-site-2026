-- Migration: enable_rls_lgpd_tables
-- Created at: 1759766429

-- Enable RLS on lgpd_leads table
ALTER TABLE lgpd_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from service role
CREATE POLICY "Allow service role to insert leads" ON lgpd_leads
FOR INSERT WITH CHECK (true);

-- Create policy to allow service role to read leads  
CREATE POLICY "Allow service role to read leads" ON lgpd_leads
FOR SELECT USING (true);

-- Enable RLS on lgpd_consultations table
ALTER TABLE lgpd_consultations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from service role
CREATE POLICY "Allow service role to insert consultations" ON lgpd_consultations
FOR INSERT WITH CHECK (true);

-- Create policy to allow service role to read consultations
CREATE POLICY "Allow service role to read consultations" ON lgpd_consultations
FOR SELECT USING (true);;