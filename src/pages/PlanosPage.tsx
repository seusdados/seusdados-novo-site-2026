import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Star, Shield, Zap, Crown } from 'lucide-react'

const PlanosPage: React.FC = () => {
  const plans = [
    {
      name: 'Essencial',
      price: 'Sob consulta',
      description: 'Para quem está iniciando o programa contínuo de privacidade',
      icon: Shield,
      features: [
        'Programa de Privacidade (90 dias)',
        'Principais transformações iniciais',
        'Diagnóstico e mapeamento',
        'Políticas essenciais',
        'Treinamento básico',
        'Suporte por email'
      ],
      cta: 'Começar agora',
      popular: false
    },
    {
      name: 'Growth',
      price: 'Sob consulta',
      description: 'Para empresas que querem escalar com governança',
      icon: Zap,
      features: [
        'DPO as a Service',
        'Atendimento ao titular',
        'Relatórios executivos',
        'Governança & Gestão (OS)',
        'Treinamentos avançados',
        'SLA de 24h',
        'Dashboard exclusivo',
        'Auditorias trimestrais'
      ],
      cta: 'Plano mais popular',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      description: 'Para grandes organizações com múltiplas unidades',
      icon: Crown,
      features: [
        'Programa completo',
        'Múltiplas unidades',
        'Auditorias e testes',
        'Customização avançada',
        'Account manager dedicado',
        'SLA de 4h',
        'Integrações personalizadas',
        'Treinamentos presenciais'
      ],
      cta: 'Falar com especialista',
      popular: false
    }
  ]

  const benefits = [
    {
      title: 'Sem surpresas',
      description: 'Preços transparentes e previsíveis'
    },
    {
      title: 'Suporte especializado',
      description: 'Time multidisciplinar disponível'
    },
    {
      title: 'Resultados garantidos',
      description: 'Ou seu dinheiro de volta em 30 dias'
    },
    {
      title: 'Escalabilidade',
      description: 'Cresça sem se preocupar com compliance'
    }
  ]

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
            Planos para cada momento da sua <span className="text-gradient">jornada</span>
          </h1>
          
          <p className="text-body-xl text-ink-300 max-w-3xl mx-auto mb-8">
            Soluções escaláveis que acompanham o crescimento da sua empresa e maturidade em LGPD.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/diagnostico" className="btn-primary">
              Fazer diagnóstico gratuito
            </Link>
            
            <Link to="/contato" className="btn-secondary">
              Falar com consultor
            </Link>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative card-glass hover:shadow-elevated transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-brand-primary' : ''
                }`}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-brand text-white px-4 py-2 rounded-full text-body-s font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Mais popular</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ${
                    plan.popular ? 'bg-gradient-brand' : 'bg-surface-elevated'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.popular ? 'text-white' : 'text-brand-primary'
                    }`} />
                  </div>
                  
                  <h3 className="text-h3 font-heading text-surface-on-surface mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="text-h4 font-heading text-brand-primary mb-2">
                    {plan.price}
                  </div>
                  
                  <p className="text-body-m text-ink-300">
                    {plan.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-semantic-success flex-shrink-0" />
                      <span className="text-body-m text-surface-on-surface">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/contato"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-brand text-white hover:shadow-elevated' 
                      : 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            )
          })}
        </div>
        
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-heading text-surface-on-surface mb-12">
            Por que escolher a <span className="text-gradient">Seusdados</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-h4 font-heading text-surface-on-surface mb-3">
                  {benefit.title}
                </h3>
                <p className="text-body-m text-ink-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* ROI Calculator CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-glass text-center max-w-3xl mx-auto"
        >
          <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
            Calcule o ROI da LGPD na sua empresa
          </h2>
          
          <p className="text-body-xl text-ink-300 mb-8">
            Descubra quanto sua empresa pode economizar evitando multas e otimizando processos com a implementação adequada da LGPD.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/calculadora-roi" className="btn-primary">
              Calcular ROI
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            
            <Link to="/diagnostico" className="btn-secondary">
              Fazer diagnóstico primeiro
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlanosPage