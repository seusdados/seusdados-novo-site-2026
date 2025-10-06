import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react'

interface ExperimentalGearProps {
  className?: string
}

const ExperimentalGear: React.FC<ExperimentalGearProps> = ({ className = '' }) => {
  const [currentComponent, setCurrentComponent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotation, setRotation] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const components = [
    {
      id: 1,
      name: 'Análise e mapeamento',
      color: '#3B82F6',
      angle: 0,
      title: 'Análise e Mapeamento de Dados',
      description: 'Identificação e categorização de todos os dados pessoais processados pela organização, mapeando fluxos, origens e destinos das informações.',
      details: [
        'Inventário completo de dados pessoais',
        'Mapeamento de fluxos de dados',
        'Identificação de riscos iniciais',
        'Classificação por sensibilidade'
      ]
    },
    {
      id: 2,
      name: 'Base legal',
      color: '#06B6D4',
      angle: 30,
      title: 'Fundamentação Legal',
      description: 'Definição da base legal adequada para cada operação de tratamento de dados, garantindo conformidade jurídica total.',
      details: [
        'Consentimento adequado',
        'Legítimo interesse empresarial',
        'Cumprimento de obrigação legal',
        'Proteção da vida ou incolumidade física'
      ]
    },
    {
      id: 3,
      name: 'Políticas e procedimentos',
      color: '#14B8A6',
      angle: 60,
      title: 'Políticas e Procedimentos',
      description: 'Desenvolvimento de políticas internas e procedimentos operacionais que norteiam o tratamento adequado de dados pessoais.',
      details: [
        'Política de Privacidade robusta',
        'Procedimentos operacionais padrão',
        'Diretrizes para colaboradores',
        'Protocolos de segurança'
      ]
    },
    {
      id: 4,
      name: 'Estruturação organizacional',
      color: '#10B981',
      angle: 90,
      title: 'Estrutura Organizacional',
      description: 'Estabelecimento de governança, papéis e responsabilidades claras para gestão de dados e privacidade na organização.',
      details: [
        'Comitê de Privacidade',
        'DPO - Encarregado de Dados',
        'Matriz RACI definida',
        'Cultura organizacional de privacidade'
      ]
    },
    {
      id: 5,
      name: 'Medidas técnicas',
      color: '#84CC16',
      angle: 120,
      title: 'Medidas Técnicas de Segurança',
      description: 'Implementação de controles técnicos robustos para proteger dados pessoais contra acessos não autorizados, vazamentos e incidentes.',
      details: [
        'Criptografia de dados',
        'Controles de acesso',
        'Backup e recuperação',
        'Monitoramento de segurança'
      ]
    },
    {
      id: 6,
      name: 'Treinamento',
      color: '#EAB308',
      angle: 150,
      title: 'Capacitação e Treinamento',
      description: 'Programas de conscientização e capacitação para todos os colaboradores sobre práticas adequadas de proteção de dados.',
      details: [
        'Treinamento LGPD para toda equipe',
        'Capacitação específica por área',
        'Avaliação de conhecimento',
        'Atualizações periódicas'
      ]
    },
    {
      id: 7,
      name: 'Gestão de riscos',
      color: '#F97316',
      angle: 180,
      title: 'Gestão de Riscos',
      description: 'Avaliação sistemática e mitigação de riscos relacionados ao tratamento de dados pessoais e potenciais impactos.',
      details: [
        'Análise de impacto de privacidade',
        'Matriz de riscos atualizada',
        'Planos de mitigação',
        'Monitoramento contínuo'
      ]
    },
    {
      id: 8,
      name: 'Controle de fornecedores',
      color: '#EF4444',
      angle: 210,
      title: 'Gestão de Terceiros',
      description: 'Controle e supervisão de fornecedores e parceiros que tenham acesso a dados pessoais, garantindo conformidade na cadeia.',
      details: [
        'Contratos com cláusulas de proteção',
        'Auditoria de fornecedores',
        'Avaliação de segurança',
        'Monitoramento contínuo'
      ]
    },
    {
      id: 9,
      name: 'Resposta a incidentes',
      color: '#EC4899',
      angle: 240,
      title: 'Resposta a Incidentes',
      description: 'Procedimentos estruturados para identificação, contenção e resposta eficaz a incidentes de segurança envolvendo dados pessoais.',
      details: [
        'Plano de resposta a incidentes',
        'Equipe de resposta rápida',
        'Comunicação com autoridades',
        'Notificação aos titulares'
      ]
    },
    {
      id: 10,
      name: 'Direitos do titular',
      color: '#A855F7',
      angle: 270,
      title: 'Direitos dos Titulares',
      description: 'Implementação de mecanismos eficientes para atendimento e garantia dos direitos dos titulares de dados pessoais.',
      details: [
        'Canal de atendimento dedicado',
        'Processo de confirmação de identidade',
        'Sistema de solicitações',
        'Prazos de atendimento definidos'
      ]
    },
    {
      id: 11,
      name: 'Documentação',
      color: '#6366F1',
      angle: 300,
      title: 'Documentação e Registros',
      description: 'Manutenção de registros completos e atualizados de todas as atividades de tratamento de dados para demonstração de conformidade.',
      details: [
        'Registro de atividades de tratamento',
        'Documentação de processos',
        'Evidências de conformidade',
        'Histórico de mudanças'
      ]
    },
    {
      id: 12,
      name: 'Monitoramento',
      color: '#8B5CF6',
      angle: 330,
      title: 'Monitoramento e Melhoria Contínua',
      description: 'Acompanhamento sistemático da eficácia do programa de privacidade através de indicadores e métricas específicas.',
      details: [
        'KPIs de privacidade',
        'Auditorias internas regulares',
        'Relatórios de conformidade',
        'Planos de melhoria contínua'
      ]
    }
  ]

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentComponent((prev) => (prev + 1) % components.length)
        setRotation((prev) => prev + 30)
      }, 4000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, components.length])

  const handleNext = () => {
    setCurrentComponent((prev) => (prev + 1) % components.length)
    setRotation((prev) => prev + 30)
  }

  const handlePrev = () => {
    setCurrentComponent((prev) => (prev - 1 + components.length) % components.length)
    setRotation((prev) => prev - 30)
  }

  const handleReset = () => {
    setCurrentComponent(0)
    setRotation(0)
  }

  const getPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    }
  }

  const radius = 180
  const currentComp = components[currentComponent]

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Controls */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 bg-surface-elevated/50 backdrop-blur-sm rounded-xl p-4 border border-ink-700/20">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-surface-elevated border border-ink-700/20 hover:bg-ink-800 transition-colors"
            aria-label="Componente anterior"
          >
            <ChevronLeft className="w-5 h-5 text-surface-on-surface" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover transition-colors"
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-surface-elevated border border-ink-700/20 hover:bg-ink-800 transition-colors"
            aria-label="Reiniciar"
          >
            <RotateCcw className="w-5 h-5 text-surface-on-surface" />
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-surface-elevated border border-ink-700/20 hover:bg-ink-800 transition-colors"
            aria-label="Próximo componente"
          >
            <ChevronRight className="w-5 h-5 text-surface-on-surface" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Gear Visualization */}
        <div className="relative flex items-center justify-center order-2 lg:order-1">
          <motion.svg
            width={radius * 2.8}
            height={radius * 2.8}
            className="overflow-visible drop-shadow-2xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: rotation }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut'
            }}
          >
            {/* Central gear */}
            <motion.circle
              cx={radius * 1.4}
              cy={radius * 1.4}
              r={50}
              fill="url(#centralGradient)"
              stroke="#334155"
              strokeWidth="3"
            />
            
            {/* Central logo */}
            <text
              x={radius * 1.4}
              y={radius * 1.4}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-white font-bold text-sm fill-current"
            >
              LGPD
            </text>

            {/* Connecting lines */}
            {components.map((component, index) => {
              const pos = getPosition(component.angle, radius)
              const isActive = index === currentComponent
              return (
                <motion.line
                  key={`line-${component.id}`}
                  x1={radius * 1.4}
                  y1={radius * 1.4}
                  x2={radius * 1.4 + pos.x}
                  y2={radius * 1.4 + pos.y}
                  stroke={isActive ? component.color : '#475569'}
                  strokeWidth={isActive ? "3" : "1"}
                  opacity={isActive ? "0.8" : "0.3"}
                  animate={{
                    stroke: isActive ? component.color : '#475569',
                    strokeWidth: isActive ? 3 : 1,
                    opacity: isActive ? 0.8 : 0.3
                  }}
                  transition={{ duration: 0.3 }}
                />
              )
            })}

            {/* Component gears */}
            {components.map((component, index) => {
              const pos = getPosition(component.angle, radius)
              const gearRadius = 25
              const isActive = index === currentComponent
              
              return (
                <g key={component.id}>
                  {/* Gear circle */}
                  <motion.circle
                    cx={radius * 1.4 + pos.x}
                    cy={radius * 1.4 + pos.y}
                    r={gearRadius}
                    fill={`url(#gradient-${component.id})`}
                    stroke="#334155"
                    strokeWidth={isActive ? "3" : "2"}
                    animate={{
                      strokeWidth: isActive ? 3 : 2,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transformOrigin: `${radius * 1.4 + pos.x}px ${radius * 1.4 + pos.y}px`
                    }}
                  />
                  
                  {/* Gear teeth */}
                  {[...Array(10)].map((_, toothIndex) => {
                    const toothAngle = (toothIndex * 36) * Math.PI / 180
                    const toothX = Math.cos(toothAngle) * (gearRadius + 4)
                    const toothY = Math.sin(toothAngle) * (gearRadius + 4)
                    
                    return (
                      <motion.rect
                        key={toothIndex}
                        x={radius * 1.4 + pos.x + toothX - 1.5}
                        y={radius * 1.4 + pos.y + toothY - 3}
                        width="3"
                        height="6"
                        fill="#475569"
                        animate={{
                          scale: isActive ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          transformOrigin: `${radius * 1.4 + pos.x}px ${radius * 1.4 + pos.y}px`
                        }}
                      />
                    )
                  })}
                  
                  {/* Component number */}
                  <motion.text
                    x={radius * 1.4 + pos.x}
                    y={radius * 1.4 + pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-white font-bold text-sm fill-current"
                    animate={{
                      scale: isActive ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {component.id}
                  </motion.text>
                </g>
              )
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="centralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              
              {components.map((component) => (
                <linearGradient key={component.id} id={`gradient-${component.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={component.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={component.color} stopOpacity="0.7" />
                </linearGradient>
              ))}
            </defs>
          </motion.svg>

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {components.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentComponent ? 'bg-brand-primary' : 'bg-ink-600'
                  }`}
                  animate={{
                    scale: index === currentComponent ? 1.2 : 1,
                    backgroundColor: index === currentComponent ? '#3B82F6' : '#64748B'
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Evolution */}
        <div className="order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentComponent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Component Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ink-700/20"
                style={{ backgroundColor: `${currentComp.color}15` }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentComp.color }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-surface-on-surface">
                  Componente {currentComp.id} de 12
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-h1 font-heading text-surface-on-surface leading-tight"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {currentComp.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-body-xl text-ink-300 leading-relaxed"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentComp.description}
              </motion.p>

              {/* Details */}
              <motion.div
                className="space-y-3"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {currentComp.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: currentComp.color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, delay: index * 0.1, repeat: Infinity }}
                    />
                    <span className="text-body-m text-ink-200">{detail}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ExperimentalGear