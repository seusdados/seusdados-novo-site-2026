import { supabase } from './supabase'
import type { Lead, Diagnostic, NewsletterSubscriber, ContactSubmission } from './supabase'

// Função para submeter leads
export async function submitLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase.functions.invoke('lead-submission', {
      body: leadData
    })

    if (error) {
      throw new Error(error.message || 'Erro ao enviar lead')
    }

    return data?.data || data
  } catch (error) {
    console.error('Erro ao submeter lead:', error)
    throw error
  }
}

// Função para submeter diagnósticos
export async function submitDiagnostic(diagnosticData: {
  company_name: string
  responses: Record<string, any>
  lead_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}) {
  try {
    const { data, error } = await supabase.functions.invoke('diagnostic-submission', {
      body: diagnosticData
    })

    if (error) {
      throw new Error(error.message || 'Erro ao enviar diagnóstico')
    }

    return data?.data || data
  } catch (error) {
    console.error('Erro ao submeter diagnóstico:', error)
    throw error
  }
}

// Função para inscrever na newsletter
export async function subscribeNewsletter(subscriptionData: Omit<NewsletterSubscriber, 'id' | 'subscribed_at' | 'status'>) {
  try {
    const { data, error } = await supabase.functions.invoke('newsletter-subscription', {
      body: subscriptionData
    })

    if (error) {
      throw new Error(error.message || 'Erro ao inscrever na newsletter')
    }

    return data?.data || data
  } catch (error) {
    console.error('Erro ao inscrever newsletter:', error)
    throw error
  }
}

// Função para submeter contato
export async function submitContact(contactData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  try {
    const { data, error } = await supabase.functions.invoke('contact-submission', {
      body: contactData
    })

    if (error) {
      throw new Error(error.message || 'Erro ao enviar contato')
    }

    return data?.data || data
  } catch (error) {
    console.error('Erro ao submeter contato:', error)
    throw error
  }
}

// Função para carregar dados dos segmentos
export async function loadSegmentData() {
  try {
    const response = await fetch('/data/segmentos_content_and_art.json')
    if (!response.ok) {
      throw new Error('Erro ao carregar dados dos segmentos')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar dados dos segmentos:', error)
    throw error
  }
}

// Função para carregar catálogo de segmentos
export async function loadSegmentCatalog() {
  try {
    const response = await fetch('/data/segmentos_catalog.csv')
    if (!response.ok) {
      throw new Error('Erro ao carregar catálogo de segmentos')
    }
    
    const csvText = await response.text()
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',')
    
    return lines.slice(1).map(line => {
      const values = line.split(',')
      const obj: Record<string, string> = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''
      })
      return obj
    })
  } catch (error) {
    console.error('Erro ao carregar catálogo de segmentos:', error)
    throw error
  }
}

// Função para carregar questionário LGPD
export async function loadQuestionnaireData() {
  try {
    const response = await fetch('/data/questionnaire_lgpd_maturity.json')
    if (!response.ok) {
      throw new Error('Erro ao carregar questionário')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar questionário:', error)
    throw error
  }
}

// Funções de utilidade para UTM
export function getUtmParams() {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
  }
}

// Função para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar CNPJ (básica)
export function isValidCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  return cleanCNPJ.length === 14
}

// Função para formatar CNPJ
export function formatCNPJ(cnpj: string): string {
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

// Função para formatar telefone
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}