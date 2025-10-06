import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Users, Shield, Zap, BarChart3, AlertCircle } from 'lucide-react'
import { getServiceImage } from '../lib/imageMapping'
import GearVisualization from '../components/GearVisualization'
import ExperimentalGear from '../components/ExperimentalGear'
import DpoContent from '../components/dpo/DpoContent'
import DpoFases from '../components/dpo/DpoFases'
import DpoFAQ from '../components/dpo/DpoFAQ'
import DpoAnimation from '../components/dpo/DpoAnimation'

interface SolucaoPageProps {
  tipo: 'implementacao' | 'dpo' | 'governanca' | 'treinamentos' | 'auditorias'
}

const SolucaoPage: React.FC<SolucaoPageProps> = ({ tipo }) => {

  const solutionData = {
    implementacao: {
      title: 'Programa de Privacidade (setup) — Metodologia contínua',
      subtitle: 'Principais transformações em 90 dias, governança para toda vida.',
      description: 'Nosso programa de privacidade é um processo contínuo com 12 componentes integrados que devem ser revisados anualmente. A metodologia funciona como uma engrenagem onde cada elemento trabalha em harmonia para garantir conformidade sustentável.',
      icon: Shield,
      benefits: [
        'Análise e mapeamento de dados pessoais',
        'Criação de base legal e políticas',
        'Estruturação organizacional e governança',
        'Implementação de medidas técnicas e treinamento',
        'Gestão de riscos e controle de fornecedores',
        'Sistema de monitoramento e auditoria contínua'
      ],
      phases: [
        {
          title: 'Setup Inicial (0–30 dias)',
          items: [
            'Kickoff executivo e RACI',
            'Mapeamento de dados e processos',
            'Diagnóstico de maturidade',
            'Plano de transformação'
          ]
        },
        {
          title: 'Implementação Core (31–60 dias)',
          items: [
            'Políticas e base legal',
            'Estrutura organizacional',
            'Medidas técnicas essenciais',
            'Trilhas de treinamento'
          ]
        },
        {
          title: 'Operação e Governança (61–90 dias)',
          items: [
            'Canal do titular ativo',
            'Sistema de monitoramento',
            'Ciclo de auditoria',
            'Plano de evolução anual'
          ]
        }
      ],
      faq: [
        {
          q: 'Quanto tempo leva para as principais transformações?',
          a: 'As principais transformações ocorrem em 90 dias, mas o programa é contínuo e deve ser revisado anualmente.'
        },
        {
          q: 'Por que é um processo contínuo?',
          a: 'A privacidade não é um projeto com início e fim, mas um programa permanente que evolui com as mudanças regulatórias, tecnológicas e de negócio.'
        },
        {
          q: 'Como funciona a metodologia da engrenagem?',
          a: 'Os 12 componentes trabalham de forma integrada e contínua, como engrenagens que se movimentam juntas para garantir conformidade sustentável.'
        }
      ]
    },
    dpo: {
      title: 'DPO as a Service (DPO+)',
      subtitle: 'Seu Encarregado(a) de Dados profissional, independente e multidisciplinar — com gestão recorrente do programa de privacidade.',
      description: 'Exercemos formalmente a função de Encarregado(a) da sua organização na modalidade de consultoria remota multidisciplinar, com SLA de atendimento, gestão sistematizada e atualizações periódicas do programa, documentos e assessments.',
      icon: Users,
      benefits: [],
      phases: [],
      faq: []
    },
    governanca: {
      title: 'Governança em Proteção de Dados — Sistema Operacional (OS)',
      subtitle: 'Sistematização da operação de privacidade: comitê, RACI, rituais, indicadores, políticas e ciclo de melhoria contínua.',
      description: 'Transforme a governança de dados em um sistema operacional eficiente e sustentável.',
      icon: BarChart3,
      benefits: [
        'Comitê de Privacidade e papéis claros (RACI)',
        'Rituais e calendário de governança (mensal/trimestral)',
        'Indicadores executivos (KPIs) e dashboard por área',
        'Ciclo de políticas e evidências (versões, aprovação, revisões)',
        'Matriz de riscos, trilhas de auditoria e plano anual',
        'Gestão de terceiros e contratos com cláusulas padrão'
      ],
      phases: [
        {
          title: 'Semanas 1–4',
          items: [
            'Kickoff executivo e RACI',
            'Calendário de rituais',
            'Mapa de indicadores prioritários'
          ]
        },
        {
          title: 'Semanas 5–8',
          items: [
            'Comitê instalado',
            'Políticas essenciais versionadas',
            'Dashboard inicial (dados de base)'
          ]
        },
        {
          title: 'Semanas 9–12',
          items: [
            'Plano anual de auditorias',
            'Governança de terceiros',
            'Relatório executivo ao board'
          ]
        }
      ],
      faq: [
        {
          q: 'Isso substitui a Implementação LGPD?',
          a: 'Não. A Governança organiza e sustenta a operação contínua de privacidade.'
        },
        {
          q: 'Quem participa?',
          a: 'Representantes de áreas-chave e patrocínio executivo, com papéis definidos em um RACI.'
        },
        {
          q: 'Quais indicadores são acompanhados?',
          a: 'SLA do titular, incidentes, conclusão de treinamentos, auditorias, maturidade por área e avanço de planos de ação.'
        }
      ]
    },
    treinamentos: {
      title: 'Treinamentos & Cultura — Trilhas por função',
      subtitle: 'Do C-level à operação, todos aprendem o que precisam na hora certa.',
      description: 'Desenvolva uma cultura de privacidade sólida com treinamentos personalizados para cada função.',
      icon: Zap,
      benefits: [
        'Trilhas personalizadas por função e nível',
        'Conteúdo prático com casos reais do mercado',
        'Certificados de conclusão e acompanhamento',
        'Atualizações contínuas da legislação'
      ],
      phases: [
        {
          title: 'Diagnóstico',
          items: [
            'Mapeamento de funções',
            'Níveis de conhecimento',
            'Plano de capacitação'
          ]
        },
        {
          title: 'Implementação',
          items: [
            'Treinamentos por trilha',
            'Sessões práticas',
            'Avaliações e feedback'
          ]
        },
        {
          title: 'Sustentação',
          items: [
            'Atualizações regulares',
            'Reforços temáticos',
            'Métricas de adesão'
          ]
        }
      ],
      faq: [
        {
          q: 'Quanto tempo dura cada treinamento?',
          a: 'Varia por trilha: executivos (2h), líderes (4h), operação (6h) com módulos flexíveis.'
        },
        {
          q: 'Podem ser remotos?',
          a: 'Sim, oferecemos modalidades presencial, remota e híbrida conforme sua necessidade.'
        },
        {
          q: 'Há certificado?',
          a: 'Todos os participantes recebem certificado de conclusão com validade de 2 anos.'
        }
      ]
    },
    auditorias: {
      title: 'Auditorias & Segurança — Riscos, incidentes e testes',
      subtitle: 'Identifique vulnerabilidades antes que se tornem problemas.',
      description: 'Garanta a efetividade do seu programa de privacidade com auditorias especializadas.',
      icon: AlertCircle,
      benefits: [
        'Auditorias internas de conformidade LGPD',
        'Testes de vazamento e simulações de incidente',
        'Avaliação de riscos de terceiros',
        'Planos de resposta a incidentes'
      ],
      phases: [
        {
          title: 'Planejamento',
          items: [
            'Escopo da auditoria',
            'Cronograma e recursos',
            'Critérios de avaliação'
          ]
        },
        {
          title: 'Execução',
          items: [
            'Coleta de evidências',
            'Testes e simulações',
            'Entrevistas e observação'
          ]
        },
        {
          title: 'Relatório',
          items: [
            'Achados e recomendações',
            'Plano de ação corretiva',
            'Cronograma de acompanhamento'
          ]
        }
      ],
      faq: [
        {
          q: 'Com que frequência deve ser feita?',
          a: 'Recomendamos auditorias anuais completas e trimestrais temáticas.'
        },
        {
          q: 'Vocês auditam terceiros?',
          a: 'Sim, oferecemos auditoria de fornecedores e parceiros críticos.'
        },
        {
          q: 'E se encontrarem problemas?',
          a: 'Fornecemos plano de ação detalhado com prioridades e prazos para correção.'
        }
      ]
    }
  }

  const solution = solutionData[tipo]
  const Icon = solution.icon

  // Para DPO, usar layout completamente novo
  if (tipo === 'dpo') {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-surface">
        {/* Conteúdo DPO */}
        <DpoContent />

        {/* Animação CSC Dinâmica */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container-custom my-16"
        >
          <DpoAnimation />
        </motion.div>

        {/* Entregas/Fases */}
        <DpoFases />

        {/* FAQ */}
        <DpoFAQ />
      </div>
    );
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
            <div className="w-16 h-16 bg-gradient-brand rounded-lg flex items-center justify-center mx-auto mb-8">
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-h1 lg:text-display-1 font-heading text-surface-on-surface mb-6">
              {solution.title}
            </h1>
            
            <p className="text-body-xl text-ink-300 mb-8 max-w-2xl mx-auto">
              {solution.subtitle}
            </p>
            
            <p className="text-body-l text-surface-on-surface mb-8">
              {solution.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contato" className="btn-primary">
                Agendar conversa
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link to="/diagnostico" className="btn-secondary">
                Fazer diagnóstico gratuito
              </Link>
            </div>
            
            {/* Hero Image / Gear Visualization */}
            <motion.div
              className="mt-12 max-w-7xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {tipo === 'implementacao' ? (
                <div className="text-center">
                  <ExperimentalGear className="w-full" />
                  <p className="text-body-s text-ink-400 mt-6 max-w-3xl mx-auto">
                    A metodologia da engrenagem representa nossa abordagem contínua: 12 componentes integrados 
                    trabalhando em harmonia para garantir conformidade sustentável e evolução permanente do programa de privacidade.
                  </p>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elevated">
                  <img 
                    src={getServiceImage(tipo)}
                    alt={`Ilustração para ${solution.title}`}
                    className="w-full h-full object-contain bg-gradient-to-br from-surface-elevated to-surface-alt"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-surface-elevated border-y border-ink-700">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              O que está <span className="text-gradient">incluído</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solution.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 card-glass"
              >
                <CheckCircle className="w-6 h-6 text-semantic-success mt-1 flex-shrink-0" />
                <span className="text-body-l text-surface-on-surface">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





      {/* Roadmap */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Como <span className="text-gradient">funciona</span>
            </h2>
            <p className="text-body-l text-ink-300 max-w-2xl mx-auto">
              Nosso processo estruturado garante resultados previsíveis e sustentáveis.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solution.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector line */}
                {index < solution.phases.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-brand transform translate-x-4"></div>
                )}
                
                <div className="card-glass text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-h4 font-heading text-surface-on-surface mb-4">
                    {phase.title}
                  </h3>
                  
                  <ul className="space-y-2 text-left">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-body-m text-ink-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card bg-surface-elevated p-6 max-w-2xl mx-auto">
              <p className="text-body-s text-ink-500">
                <strong>Importante:</strong> Este roteiro é um exemplo inicial. O ritmo e as entregas variam conforme diagnóstico e prioridades de cada cliente.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-surface-elevated border-y border-ink-700">
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
            {solution.faq.map((item, index) => (
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

      {/* CTA */}
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
              Pronto para começar?
            </h2>
            
            <p className="text-body-xl text-ink-300 mb-8">
              Agende uma conversa com nossos especialistas e descubra como podemos ajudar sua empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contato" className="btn-primary">
                Falar com especialista
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link to="/planos" className="btn-secondary">
                Ver todos os planos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SolucaoPage