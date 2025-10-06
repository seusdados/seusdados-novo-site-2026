import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fayazqazhtauusfppele.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheWF6cWF6aHRhdXVzZnBwZWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODUwNjYsImV4cCI6MjA3MDY2MTA2Nn0.F66IogGlOm7-ofWgzF_jdb8fak1BhgWfPARqLQdNOFM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas
export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  company: string
  cnpj?: string
  segment?: string
  interest?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  created_at?: string
  updated_at?: string
}

export interface Diagnostic {
  id?: string
  lead_id?: string
  company_name: string
  responses: Record<string, any>
  score: number
  maturity_level: string
  recommendations: string[]
  created_at?: string
  completed_at?: string
}

export interface NewsletterSubscriber {
  id?: string
  email: string
  name?: string
  status?: 'active' | 'unsubscribed'
  subscribed_at?: string
  unsubscribed_at?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  subject?: string
  priority?: 'low' | 'normal' | 'high'
  status?: 'new' | 'processing' | 'completed'
  created_at?: string
  processed_at?: string
}