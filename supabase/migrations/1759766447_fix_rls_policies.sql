-- Migration: fix_rls_policies
-- Created at: 1759766447

-- Drop existing policies
DROP POLICY IF EXISTS "Allow service role to insert leads" ON lgpd_leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON lgpd_leads;
DROP POLICY IF EXISTS "Allow service role to insert consultations" ON lgpd_consultations;  
DROP POLICY IF EXISTS "Allow service role to read consultations" ON lgpd_consultations;

-- Disable RLS temporarily to test
ALTER TABLE lgpd_leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE lgpd_consultations DISABLE ROW LEVEL SECURITY;;