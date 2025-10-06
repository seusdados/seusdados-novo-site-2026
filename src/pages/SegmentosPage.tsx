import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building, Heart, FileText, Users, Search, Filter } from 'lucide-react'
import { toast } from 'sonner'

interface SegmentoCatalog {
  slug: string
  nome: string
  tagline: string
  dor_principal: string
  beneficio_chave: string
  kpi_exibir: string
  cta_label: string
}

const SegmentosPage: React.FC = () => {
  const [segmentos, setSegmentos] = useState<SegmentoCatalog[]>([])
  const [filteredSegmentos, setFilteredSegmentos] = useState<SegmentoCatalog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [isLoading, setIsLoading] = useState(true)

  // Categorias de segmentos
  const categorias = {
    'todos': 'Todos os segmentos',
    'saude': 'Saúde',
    'educacao': 'Educação',
    'varejo': 'Varejo',
    'publico': 'Setor Público',
    'outros': 'Outros'
  }

  // Mapear segmentos para categorias
  const getCategoriaSegmento = (slug: string): string => {
    if (['planos-de-saude', 'hospitais', 'laboratorios', 'consultorios-medicos', 'planos-odontologicos', 'dentistas', 'farmacias'].includes(slug)) {
      return 'saude'
    }
    if (['escolas', 'universidades'].includes(slug)) {
      return 'educacao'
    }
    if (['supermercados', 'lojistas', 'academias'].includes(slug)) {
      return 'varejo'
    }
    if (['camaras-municipais', 'prefeituras'].includes(slug)) {
      return 'publico'
    }
    return 'outros'
  }

  // Obter ícone do segmento
  const getSegmentoIcon = (slug: string) => {
    if (getCategoriaSegmento(slug) === 'saude') return Heart
    if (getCategoriaSegmento(slug) === 'educacao') return FileText
    if (getCategoriaSegmento(slug) === 'publico') return Building
    return Users
  }

  useEffect(() => {
    const loadSegmentos = async () => {
      try {
        const response = await fetch('/data/segmentos_catalog.csv')
        const csvText = await response.text()
        
        // Parsear CSV
        const lines = csvText.trim().split('\n')
        const headers = lines[0].split(',')
        
        const segmentosData: SegmentoCatalog[] = lines.slice(1).map(line => {
          const values = line.split(',')
          return {
            slug: values[0],
            nome: values[1],
            tagline: values[2],
            dor_principal: values[3],
            beneficio_chave: values[4],
            kpi_exibir: values[5],
            cta_label: values[6]
          }
        })
        
        setSegmentos(segmentosData)
        setFilteredSegmentos(segmentosData)
      } catch (error) {
        console.error('Erro ao carregar segmentos:', error)
        toast.error('Erro ao carregar lista de segmentos')
      } finally {
        setIsLoading(false)
      }
    }

    loadSegmentos()
  }, [])

  // Filtrar segmentos
  useEffect(() => {
    let filtered = segmentos

    // Filtro por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(seg => getCategoriaSegmento(seg.slug) === selectedCategory)
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(seg => 
        seg.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seg.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredSegmentos(filtered)
  }, [segmentos, selectedCategory, searchTerm])

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-glow w-12 h-12 bg-brand-primary rounded-full mx-auto mb-4"></div>
          <p className="text-body-l text-ink-300">Carregando segmentos...</p>
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
            <h1 className="text-h1 lg:text-display-1 font-heading text-surface-on-surface mb-6">
              Especialistas no seu <span className="text-gradient">segmento</span>
            </h1>
            
            <p className="text-body-xl text-ink-300 mb-8 max-w-2xl mx-auto">
              Soluções LGPD personalizadas para os desafios específicos da sua área de atuação.
              Escolha seu segmento e descubra nossa abordagem especializada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                type="text"
                placeholder="Buscar segmento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-ink-700 rounded-lg text-surface-on-surface placeholder-ink-400 focus:border-brand-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Filtros por categoria */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-ink-300" />
              <div className="flex flex-wrap gap-2">
                {Object.entries(categorias).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg text-body-s font-medium transition-colors ${
                      selectedCategory === key
                        ? 'bg-brand-primary text-white'
                        : 'bg-surface text-ink-300 hover:bg-surface-alt hover:text-surface-on-surface'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Segmentos */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          {filteredSegmentos.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="w-16 h-16 text-ink-400 mx-auto mb-6" />
              <h3 className="text-h3 font-heading text-surface-on-surface mb-4">
                Nenhum segmento encontrado
              </h3>
              <p className="text-body-l text-ink-300 mb-8">
                Tente ajustar os filtros ou termo de busca.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('todos')
                }}
                className="btn-secondary"
              >
                Limpar filtros
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSegmentos.map((segmento, index) => {
                const Icon = getSegmentoIcon(segmento.slug)
                return (
                  <motion.div
                    key={segmento.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      to={`/segmentos/${segmento.slug}`}
                      className="block card-glass h-full group hover:shadow-elevated transition-all duration-300"
                    >
                      <div className="p-6">
                        {/* Ícone e categoria */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-body-xs text-ink-400 uppercase tracking-wide font-medium">
                            {categorias[getCategoriaSegmento(segmento.slug) as keyof typeof categorias]}
                          </span>
                        </div>

                        {/* Nome do segmento */}
                        <h3 className="text-h4 font-heading text-surface-on-surface mb-2 group-hover:text-brand-primary transition-colors">
                          {segmento.nome}
                        </h3>

                        {/* Tagline */}
                        <p className="text-body-m text-ink-300 mb-4 line-clamp-2">
                          {segmento.tagline}
                        </p>

                        {/* KPI */}
                        <div className="mb-6">
                          <div className="text-body-xs text-ink-400 uppercase tracking-wide font-medium mb-1">
                            KPI Principal
                          </div>
                          <div className="text-body-s text-surface-on-surface">
                            {segmento.kpi_exibir}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center text-brand-primary group-hover:translate-x-1 transition-transform duration-200">
                          <span className="text-body-s font-medium">{segmento.cta_label}</span>
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-surface-elevated">
        <div className="container-custom">
          <motion.div
            className="card-glass text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Não encontrou seu segmento?
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8">
              Nossa metodologia se adapta a qualquer área de atuação. 
              Fale conosco e descubra como podemos ajudar sua empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/diagnostico" className="btn-primary">
                Fazer diagnóstico gratuito
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link to="/contato" className="btn-secondary">
                Falar com especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SegmentosPage