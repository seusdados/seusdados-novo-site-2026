import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react'
import { loadSegmentData } from '../lib/api'
import { getSegmentoImage } from '../lib/imageMapping'
import { toast } from 'sonner'

interface SegmentData {
  slug: string
  name: string
  hero: {
    h1: string
    subheading: string
  }
  value_prop: string
  pains: string[]
  benefits: string[]
  features: string[]
  kpi_highlight: string
  metrics_sugeridos: string[]
  faq: Array<{
    q: string
    a: string
  }>
  objections: Array<{
    objection: string
    response: string
  }>
  ctas: {
    primary: {
      label: string
      href: string
    }
    secondary: {
      label: string
      href: string
    }
  }
  lead_magnet: {
    title: string
    desc: string
  }
}

const SegmentoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [segmentData, setSegmentData] = useState<SegmentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showObjections, setShowObjections] = useState(false)



  useEffect(() => {
    const loadData = async () => {
      if (!slug) return
      
      try {
        const data = await loadSegmentData()
        console.log('🔍 Debug slug recebido:', slug);
        console.log('📁 Segmentos disponíveis:', Object.keys(data.segments));
        
        const segment = data.segments[slug]
        
        if (segment) {
          console.log('✅ Segmento encontrado:', segment.name);
          console.log('🖼️ Caminho da imagem:', getSegmentoImage(segment.slug));
          setSegmentData(segment)
        } else {
          console.error('❌ Segmento não encontrado para slug:', slug);
          toast.error('Segmento não encontrado')
        }
      } catch (error) {
        console.error('Erro ao carregar dados do segmento:', error)
        toast.error('Erro ao carregar dados do segmento')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-glow w-12 h-12 bg-brand-primary rounded-full mx-auto mb-4"></div>
          <p className="text-body-l text-ink-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!segmentData) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-semantic-warning mx-auto mb-4" />
          <h1 className="text-h2 font-heading text-surface-on-surface mb-4">Segmento não encontrado</h1>
          <p className="text-body-l text-ink-300 mb-8">O segmento que você está procurando não existe.</p>
          <a href="/" className="btn-primary">Voltar ao início</a>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-h1 lg:text-display-1 font-heading text-surface-on-surface mb-6"
              dangerouslySetInnerHTML={{ __html: segmentData.hero.h1 }}
            />
            
            <p className="text-body-xl text-ink-300 mb-8 max-w-2xl mx-auto">
              {segmentData.hero.subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href={segmentData.ctas.primary.href} className="btn-primary">
                {segmentData.ctas.primary.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              
              <a href={segmentData.ctas.secondary.href} className="btn-secondary">
                {segmentData.ctas.secondary.label}
              </a>
            </div>
            
            {/* Hero Image */}
            <motion.div
              className="mt-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elevated bg-gradient-to-br from-surface-elevated to-surface-alt">
                {/* Debug info */}
                <div className="hidden">
                  Slug: {segmentData.slug} | Image: {getSegmentoImage(segmentData.slug)}
                </div>
                
                <img 
                  src={getSegmentoImage(segmentData.slug)}
                  alt={`Ilustração para o segmento ${segmentData.name}`}
                  className="w-full h-full object-contain"
                  onLoad={(e) => {
                    console.log('✅ Imagem carregada com sucesso:', {
                      src: e.currentTarget.src,
                      naturalWidth: e.currentTarget.naturalWidth,
                      naturalHeight: e.currentTarget.naturalHeight,
                      slug: segmentData.slug
                    });
                    e.currentTarget.style.opacity = '1';
                  }}
                  onError={(e) => {
                    console.error('❌ ERRO: Falha ao carregar imagem:', {
                      src: e.currentTarget.src,
                      slug: segmentData.slug,
                      expectedPath: getSegmentoImage(segmentData.slug)
                    });
                    // Tentar fallback mais robusto
                    if (!e.currentTarget.dataset.fallbackTried) {
                      e.currentTarget.dataset.fallbackTried = 'true';
                      e.currentTarget.src = '/images/segments/segmento-planos-saude-sem-fundo.png';
                    } else {
                      // Se o fallback também falhou, exibir placeholder
                      console.error('⚠️ Fallback também falhou. Problema sistemático.');
                      e.currentTarget.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full flex items-center justify-center text-ink-300 text-center p-8';
                      placeholder.innerHTML = `<div><div class="text-4xl mb-4">🖼️</div><div>Imagem indisponível</div><div class="text-sm mt-2">Slug: ${segmentData.slug}</div></div>`;
                      e.currentTarget.parentNode?.appendChild(placeholder);
                    }
                  }}
                  style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-body-xl text-surface-on-surface font-medium">
              {segmentData.value_prop}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pain Points & Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pain Points */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-glass h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-semantic-warning" />
                  <h2 className="text-h3 font-heading text-surface-on-surface">
                    Principais desafios
                  </h2>
                </div>
                
                <ul className="space-y-4">
                  {segmentData.pains.map((pain, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-semantic-warning rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-body-m text-ink-300">{pain}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card-glass h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-semantic-success" />
                  <h2 className="text-h3 font-heading text-surface-on-surface">
                    Benefícios da solução
                  </h2>
                </div>
                
                <ul className="space-y-4">
                  {segmentData.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-semantic-success mt-0.5 flex-shrink-0" />
                      <span className="text-body-m text-ink-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPI Highlight */}
      <section className="py-12 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <TrendingUp className="w-8 h-8 text-brand-primary" />
              <h2 className="text-h3 font-heading text-surface-on-surface">
                KPI Principal
              </h2>
            </div>
            
            <p className="text-h4 font-heading text-gradient mb-8">
              {segmentData.kpi_highlight}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {segmentData.metrics_sugeridos.slice(0, 3).map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card bg-surface p-4"
                >
                  <p className="text-body-m text-ink-300">{metric}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Nossa <span className="text-gradient">abordagem</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segmentData.features.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass"
              >
                <CheckCircle className="w-6 h-6 text-brand-primary mb-3" />
                <p className="text-body-m text-surface-on-surface">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16 lg:py-24 bg-surface-elevated">
        <div className="container-custom">
          <motion.div
            className="card-glass max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Download className="w-12 h-12 text-brand-primary mx-auto mb-6" />
            
            <h2 className="text-h2 font-heading text-surface-on-surface mb-4">
              {segmentData.lead_magnet.title}
            </h2>
            
            <p className="text-body-l text-ink-300 mb-8">
              {segmentData.lead_magnet.desc}
            </p>
            
            <a href="/contato" className="btn-primary">
              Baixar material gratuito
              <Download className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Perguntas <span className="text-gradient">frequentes</span>
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {segmentData.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glass"
              >
                <h3 className="text-h4 font-heading text-surface-on-surface mb-3">
                  {item.q}
                </h3>
                <p className="text-body-m text-ink-300">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objections (Optional) */}
      {segmentData.objections && segmentData.objections.length > 0 && (
        <section className="py-12 bg-surface-elevated border-y border-ink-700">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setShowObjections(!showObjections)}
                className="w-full text-left flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-alt transition-colors"
              >
                <span className="text-h4 font-heading text-surface-on-surface">
                  Dúvidas comuns
                </span>
                <motion.div
                  animate={{ rotate: showObjections ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 text-ink-300" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: showObjections ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-6">
                  {segmentData.objections.map((objection, index) => (
                    <div key={index} className="border-l-4 border-brand-primary pl-4">
                      <p className="text-body-m text-surface-on-surface font-medium mb-2">
                        {objection.objection}
                      </p>
                      <p className="text-body-m text-ink-300">
                        {objection.response}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="card-glass text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Pronto para começar sua jornada LGPD?
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8">
              Faça um diagnóstico gratuito e descubra o nível de maturidade da sua empresa em relação à LGPD.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href={segmentData.ctas.primary.href} className="btn-primary">
                {segmentData.ctas.primary.label}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              <a href={segmentData.ctas.secondary.href} className="btn-secondary">
                {segmentData.ctas.secondary.label}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SegmentoPage