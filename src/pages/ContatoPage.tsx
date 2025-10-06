import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { submitContact, getUtmParams, isValidEmail } from '../lib/api'
import { toast } from 'sonner'

const ContatoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    subject: 'Contato pelo site'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = {
    address: 'Rua Eduardo Tomanik, 121, salas 10 e 11, Chácara Urbana, Jundiaí-SP',
    site: 'www.seusdados.com',
    email: 'comercial@seusdados.com',
    phone: '+55 11 4040 5552',
    whatsapp: '+55 11 91172 7789'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }
    
    if (!isValidEmail(formData.email)) {
      toast.error('Por favor, insira um email válido')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const utmParams = getUtmParams()
      await submitContact({
        ...formData,
        ...utmParams
      })
      
      setIsSubmitted(true)
      toast.success('Mensagem enviada com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar mensagem')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="card-glass">
              <CheckCircle className="w-16 h-16 text-semantic-success mx-auto mb-6" />
              
              <h1 className="text-h1 font-heading text-surface-on-surface mb-4">
                Mensagem Enviada!
              </h1>
              
              <p className="text-body-xl text-ink-300 mb-8">
                Obrigado pelo seu contato. Nossa equipe irá analisar sua mensagem e retornar em até 24 horas.
              </p>
              
              <div className="space-y-4">
                <p className="text-body-m text-ink-300">
                  <strong>Próximos passos:</strong>
                </p>
                
                <ul className="text-left space-y-2 text-body-m text-ink-300 max-w-md mx-auto">
                  <li>• Analise de necessidades pela nossa equipe</li>
                  <li>• Agendamento de reunião inicial</li>
                  <li>• Proposta personalizada</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      message: '',
                      subject: 'Contato pelo site'
                    })
                  }}
                  className="btn-secondary flex-1"
                >
                  Enviar nova mensagem
                </button>
                
                <a
                  href="/diagnostico"
                  className="btn-primary flex-1 text-center"
                >
                  Fazer diagnóstico gratuito
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-surface">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-h1 font-heading text-surface-on-surface mb-6">
            Vamos <span className="text-gradient">conversar</span>
          </h1>
          
          <p className="text-body-xl text-ink-300 max-w-2xl mx-auto">
            Entre em contato para agendar uma conversa ou fazer seu diagnóstico gratuito.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-glass">
              <h2 className="text-h3 font-heading text-surface-on-surface mb-6">
                Envie uma mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-field w-full"
                      placeholder="Como devemos te chamar?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-field w-full"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-field w-full"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-field w-full"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="form-label">
                    Assunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-field w-full"
                    placeholder="Sobre o que você gostaria de falar?"
                  />
                </div>
                
                <div>
                  <label className="form-label">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="form-field w-full resize-none"
                    placeholder="Conte-nos sobre seus desafios de LGPD e como podemos ajudar..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar mensagem</span>
                    </>
                  )}
                </button>
                
                <p className="text-body-s text-ink-500">
                  * Campos obrigatórios. Ao enviar, você concorda com nossa Política de Privacidade.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="card-glass">
              <h2 className="text-h3 font-heading text-surface-on-surface mb-6">
                Informações de contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-body-l font-medium text-surface-on-surface mb-1">
                      Endereço
                    </h3>
                    <p className="text-body-m text-ink-300">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-body-l font-medium text-surface-on-surface mb-1">
                      Email
                    </h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-body-m text-brand-primary hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-body-l font-medium text-surface-on-surface mb-1">
                      Telefone
                    </h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-body-m text-brand-primary hover:underline block"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-body-l font-medium text-surface-on-surface mb-1">
                      WhatsApp
                    </h3>
                    <a 
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-m text-brand-primary hover:underline"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="card-glass">
              <h2 className="text-h3 font-heading text-surface-on-surface mb-6">
                Ações rápidas
              </h2>
              
              <div className="space-y-4">
                <a
                  href="/diagnostico"
                  className="btn-primary w-full text-center block"
                >
                  Fazer diagnóstico gratuito
                </a>
                
                <a
                  href="/planos"
                  className="btn-secondary w-full text-center block"
                >
                  Ver nossos planos
                </a>
                
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=Olá, gostaria de saber mais sobre os serviços da Seusdados`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full text-center block"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="card-glass">
              <h2 className="text-h3 font-heading text-surface-on-surface mb-6">
                Horário de atendimento
              </h2>
              
              <div className="space-y-3 text-body-m">
                <div className="flex justify-between">
                  <span className="text-ink-300">Segunda a sexta:</span>
                  <span className="text-surface-on-surface">8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-300">Sábado:</span>
                  <span className="text-surface-on-surface">8h às 12h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-300">Domingo:</span>
                  <span className="text-ink-500">Fechado</span>
                </div>
              </div>
              
              <p className="text-body-s text-ink-500 mt-4">
                Emergências LGPD são atendidas 24h via WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContatoPage