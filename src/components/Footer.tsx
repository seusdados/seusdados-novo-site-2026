import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import { subscribeNewsletter, getUtmParams } from '../lib/api'
import { toast } from 'sonner'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Por favor, insira seu email')
      return
    }

    setIsSubmitting(true)
    
    try {
      const utmParams = getUtmParams()
      await subscribeNewsletter({
        email,
        ...utmParams
      })
      
      toast.success('Inscrição realizada com sucesso!')
      setEmail('')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao inscrever na newsletter')
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = {
    institucional: [
      { label: 'Sobre nós', href: '/sobre' },
      { label: 'Carreiras', href: '/carreiras' },
      { label: 'Políticas de Privacidade', href: '/politicas/privacidade' },
      { label: 'Política de Cookies', href: '/politicas/cookies' }
    ],
    solucoes: [
      { label: 'Implementação LGPD', href: '/solucoes/implementacao-lgpd' },
      { label: 'DPO as a Service', href: '/solucoes/dpo-as-a-service' },
      { label: 'Treinamentos', href: '/solucoes/treinamentos' },
      { label: 'Auditorias', href: '/solucoes/auditorias' },
      { label: 'Governança', href: '/solucoes/governanca' }
    ]
  }

  const contactInfo = {
    address: 'Rua Eduardo Tomanik, 121, salas 10 e 11, Chácara Urbana, Jundiaí-SP',
    site: 'www.seusdados.com',
    email: 'comercial@seusdados.com',
    phone: '+55 11 4040 5552',
    whatsapp: '+55 11 91172 7789'
  }

  return (
    <footer className="bg-surface-elevated border-t border-ink-700">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-ink-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-h3 font-heading text-gradient mb-4">
              Fique por dentro das novidades em LGPD
            </h3>
            <p className="text-body-l text-ink-300 mb-8">
              Receba insights práticos, atualizações regulatórias e conteúdo exclusivo sobre privacidade e proteção de dados.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                className="form-field flex-1"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary whitespace-nowrap"
              >
                {isSubmitting ? 'Inscrevendo...' : 'Inscrever-se'}
              </button>
            </form>
            
            <p className="text-body-s text-ink-500 mt-3">
              Ao se inscrever, você concorda com nossa Política de Privacidade.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <img 
                  src="/images/logo.png" 
                  alt="Seusdados" 
                  className="h-8 w-auto"
                />
              </Link>
              
              <p className="text-body-m text-ink-300 mb-6">
                LGPD sem mistério. Consultoria multidisciplinar de privacidade e proteção de dados que acelera o seu negócio.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <span className="text-body-s text-ink-300">
                    {contactInfo.address}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-body-s text-ink-300 hover:text-brand-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-body-s text-ink-300 hover:text-brand-primary transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-s text-ink-300 hover:text-brand-primary transition-colors"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Institutional Links */}
            <div>
              <h4 className="text-h4 font-heading text-surface-on-surface mb-6">
                Institucional
              </h4>
              <ul className="space-y-3">
                {footerLinks.institucional.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-body-m text-ink-300 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Links */}
            <div>
              <h4 className="text-h4 font-heading text-surface-on-surface mb-6">
                Soluções
              </h4>
              <ul className="space-y-3">
                {footerLinks.solucoes.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-body-m text-ink-300 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-h4 font-heading text-surface-on-surface mb-6">
                Começar agora
              </h4>
              <div className="space-y-4">
                <Link
                  to="/diagnostico"
                  className="btn-primary w-full text-center block"
                >
                  Fazer diagnóstico
                </Link>
                
                <Link
                  to="/contato"
                  className="btn-secondary w-full text-center block"
                >
                  Agendar conversa
                </Link>
                
                <Link
                  to="/planos"
                  className="btn-ghost w-full text-center block"
                >
                  Ver planos
                </Link>
                
                <Link
                  to="/experimental"
                  className="text-xs text-ink-500 hover:text-brand-primary transition-colors text-center block mt-2"
                >
                  Demonstração Conceitual
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-ink-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-body-s text-ink-500">
              © {new Date().getFullYear()} Seusdados. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-body-s text-ink-500">
                Desenvolvido por MiniMax Agent
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer