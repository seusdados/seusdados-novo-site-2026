import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lightbulb, Zap, Settings } from 'lucide-react'
import ExperimentalGear from '../components/ExperimentalGear'

const ExperimentalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-8 bg-surface-elevated border-b border-ink-700/20">
        <div className="container-custom">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="p-2 rounded-lg bg-surface-elevated border border-ink-700/20 hover:bg-ink-800 transition-colors"
                aria-label="Voltar ao início"
              >
                <ArrowLeft className="w-5 h-5 text-surface-on-surface" />
              </Link>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                    Demonstração Conceitual
                  </span>
                </div>
                <h1 className="text-h2 font-heading text-surface-on-surface">
                  Engrenagem Evolucionária Sincronizada
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-lg">
              <Zap className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-brand-primary font-medium">Versão Experimental</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6 leading-tight">
              Metodologia <span className="text-gradient">Dinâmica</span> em Ação
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8 leading-relaxed">
              Experimente nossa abordagem revolucionária onde o movimento da engrenagem 
              sincroniza perfeitamente com a evolução do conteúdo explicativo. 
              Cada rotação revela uma nova camada da metodologia de 12 componentes.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ink-400">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>12 Componentes Integrados</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Sincronização Perfeita</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>Narrativa Evolutiva</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Experimental Section */}
      <section className="py-16 lg:py-24 bg-surface-elevated">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-surface rounded-3xl p-8 lg:p-12 shadow-elevated border border-ink-700/10"
          >
            <ExperimentalGear className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6">
              Características <span className="text-gradient">Inovadoras</span>
            </h2>
            <p className="text-body-xl text-ink-300 max-w-3xl mx-auto">
              Esta demonstração conceitual apresenta funcionalidades avançadas que serão 
              integradas à experiência principal após validação.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Settings className="w-8 h-8 text-brand-primary" />,
                title: 'Sincronização Visual',
                description: 'Movimento da engrenagem perfeitamente alinhado com a evolução do conteúdo explicativo'
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: 'Transições Fluidas',
                description: 'Animações suaves que guiam o usuário através da complexidade da metodologia'
              },
              {
                icon: <Lightbulb className="w-8 h-8 text-purple-400" />,
                title: 'Narrativa Progressiva',
                description: 'Cada componente revela detalhes específicos criando uma experiência de aprendizado imersiva'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card-glass text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-h4 font-heading text-surface-on-surface mb-3">
                  {feature.title}
                </h3>
                <p className="text-body-m text-ink-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Info */}
      <section className="py-16 lg:py-24 bg-surface-elevated">
        <div className="container-custom">
          <motion.div
            className="card-glass text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-primary/10 rounded-2xl">
                <Settings className="w-8 h-8 text-brand-primary" />
              </div>
            </div>
            
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6">
              Próximos Passos
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8 leading-relaxed">
              Esta demonstração conceitual representa o futuro da experiência de usuário 
              em nossa plataforma. Após validação e refinamentos, estes recursos serão 
              integrados à experiência principal do site.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/solucoes/implementacao-lgpd" 
                className="btn-primary text-lg px-8 py-4"
              >
                Explorar Metodologia Completa
              </Link>
              
              <Link 
                to="/diagnostico" 
                className="btn-secondary text-lg px-8 py-4"
              >
                Fazer Diagnóstico Gratuito
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ExperimentalPage