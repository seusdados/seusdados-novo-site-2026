import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Rocket, Radar, Sparkles, BarChart3, Users, Award, Building } from 'lucide-react'
import { featuredSegments, featuredServices } from '../lib/imageMapping'
import GearVisualization from '../components/GearVisualization'

const Home: React.FC = () => {
  const metrics = [
    { label: 'Clientes atendidos', value: '+200' },
    { label: 'Atendimentos DPO', value: '+11.000' },
    { label: 'Pessoas treinadas', value: '+40.000' },
    { label: 'Áreas de atuação', value: '5' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Time multidisciplinar',
      text: 'Jurídico, processos, SI, tecnologia e governança trabalhando juntos.'
    },
    {
      icon: Rocket,
      title: 'Principais transformações',
      text: 'Principais transformações em 90 dias.'
    },
    {
      icon: Radar,
      title: 'Processo contínuo',
      text: 'Programa de privacidade em evolução permanente.'
    },
    {
      icon: Sparkles,
      title: 'Cultura viva',
      text: 'Trilhas por função, do C‑level à operação.'
    }
  ]

  // Usar segmentos em destaque do sistema centralizado

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-surface"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-display-1 lg:text-display-2 font-heading text-gradient mb-6 leading-tight">
                LGPD sem mistério.
                <br />
                <span className="text-surface-on-surface">
                  Privacidade que acelera o seu negócio.
                </span>
              </h1>
              
              <p className="text-body-xl text-ink-300 mb-8 max-w-2xl mx-auto">
                Consultoria + DPOaaS.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/diagnostico" className="btn-primary text-lg px-8 py-4">
                  Fazer diagnóstico gratuito
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
                <Link to="/solucoes/dpo-as-a-service" className="btn-secondary text-lg px-8 py-4">
                  Conhecer o DPO as a Service
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-12 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-h2 font-heading text-brand-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-body-m text-ink-300">
                  {metric.label}
                </div>
              </motion.div>
            ))}
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
              Por que a <span className="text-gradient">Seusdados</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="card-glass text-center group hover:shadow-elevated transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-h4 font-heading text-surface-on-surface mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-body-m text-ink-300">
                    {feature.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Segmentos em Destaque */}
      <section className="py-16 lg:py-24 bg-surface-elevated">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6">
              <span className="text-gradient">Especialistas</span> no seu segmento
            </h2>
            <p className="text-body-xl text-ink-300 max-w-3xl mx-auto">
              Soluções personalizadas para os desafios específicos da sua área de atuação
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredSegments.map((segmento, index) => (
              <motion.div
                key={segmento.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Link 
                  to={`/segmentos/${segmento.slug}`}
                  className="block h-72 p-8 group relative overflow-hidden rounded-lg bg-gradient-to-br from-surface-elevated to-surface-alt hover:shadow-elevated transition-all duration-300"
                >
                  {/* Imagem centralizada sem fundo */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img 
                      src={segmento.image}
                      alt={segmento.nome}
                      className="max-h-44 max-w-full object-contain"
                    />
                  </div>
                  
                  {/* Informações com gradiente inferior */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent">
                    <h3 className="text-h4 font-heading text-white mb-2 group-hover:text-brand-primary transition-colors duration-300">
                      {segmento.nome}
                    </h3>
                    
                    <p className="text-body-m text-gray-300 mb-4 line-clamp-2">
                      {segmento.tagline}
                    </p>
                    
                    <div className="flex items-center text-brand-primary group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-body-s font-semibold">Saiba mais</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/segmentos" className="btn-secondary inline-flex items-center gap-2 text-nowrap">
              Ver todos os segmentos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metodologia Seusdados */}
      <section className="py-16 lg:py-24 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6">
              Metodologia <span className="text-gradient">Seusdados</span>
            </h2>
            <p className="text-body-xl text-ink-300 max-w-3xl mx-auto mb-8">
              Nosso programa de privacidade é um <strong>processo contínuo</strong> com 12 componentes integrados 
              que devem ser revisados anualmente para garantir conformidade permanente.
            </p>
            <p className="text-body-l text-surface-on-surface max-w-2xl mx-auto">
              Principais transformações em 90 dias, governança para toda vida.
            </p>
          </motion.div>
          
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GearVisualization size="large" showLabels={true} />
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-body-m text-ink-400 mb-6">
              A engrenagem representa a natureza contínua e interconectada dos 12 componentes 
              do nosso programa de privacidade. Cada elemento trabalha em harmonia para garantir 
              conformidade sustentável e evolução permanente.
            </p>
            
            <Link to="/solucoes/implementacao-lgpd" className="btn-secondary inline-flex items-center gap-2">
              Conhecer a metodologia completa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Nossas Soluções */}
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
              Nossas <span className="text-gradient">soluções</span>
            </h2>
            <p className="text-body-xl text-ink-300 max-w-3xl mx-auto">
              Metodologia comprovada para transformar conformidade em vantagem competitiva
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((solucao, index) => (
              <motion.div
                key={solucao.tipo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link 
                  to={`/solucoes/${solucao.tipo}`}
                  className="block card-glass overflow-hidden group hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={solucao.image}
                      alt={solucao.nome}
                      className="w-full h-full object-contain bg-gradient-to-br from-surface-elevated to-surface-alt group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-h4 font-heading text-surface-on-surface mb-2 group-hover:text-brand-primary transition-colors">
                    {solucao.nome}
                  </h3>
                  
                  <p className="text-body-m text-ink-300 mb-4">
                    {solucao.tagline}
                  </p>
                  
                  <div className="flex items-center text-brand-primary group-hover:translate-x-1 transition-transform duration-200">
                    <span className="text-body-s font-medium">Conhecer solução</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="card-glass text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-heading text-surface-on-surface mb-6">
              Pronto para começar sua jornada LGPD?
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8">
              Faça um diagnóstico gratuito e descubra o nível de maturidade da sua empresa em relação à LGPD.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/diagnostico" className="btn-primary text-lg px-8 py-4">
                Fazer diagnóstico gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link to="/contato" className="btn-secondary text-lg px-8 py-4">
                Falar com especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home