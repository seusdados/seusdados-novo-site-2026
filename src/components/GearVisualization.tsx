import React from 'react'
import { motion } from 'framer-motion'

interface GearVisualizationProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  showLabels?: boolean
}

const GearVisualization: React.FC<GearVisualizationProps> = ({ 
  size = 'medium', 
  className = '', 
  showLabels = true 
}) => {
  const sizeConfig = {
    small: { radius: 120, fontSize: 'text-xs', gearSize: 'w-8 h-8' },
    medium: { radius: 160, fontSize: 'text-sm', gearSize: 'w-10 h-10' },
    large: { radius: 200, fontSize: 'text-base', gearSize: 'w-12 h-12' }
  }

  const config = sizeConfig[size]

  const components = [
    { id: 1, name: 'Análise e mapeamento', color: '#3B82F6', angle: 0 },
    { id: 2, name: 'Base legal', color: '#06B6D4', angle: 30 },
    { id: 3, name: 'Políticas e procedimentos', color: '#14B8A6', angle: 60 },
    { id: 4, name: 'Estruturação organizacional', color: '#10B981', angle: 90 },
    { id: 5, name: 'Medidas técnicas', color: '#84CC16', angle: 120 },
    { id: 6, name: 'Treinamento', color: '#EAB308', angle: 150 },
    { id: 7, name: 'Gestão de riscos', color: '#F97316', angle: 180 },
    { id: 8, name: 'Controle de fornecedores', color: '#EF4444', angle: 210 },
    { id: 9, name: 'Resposta a incidentes', color: '#EC4899', angle: 240 },
    { id: 10, name: 'Direitos do titular', color: '#A855F7', angle: 270 },
    { id: 11, name: 'Documentação', color: '#6366F1', angle: 300 },
    { id: 12, name: 'Monitoramento', color: '#8B5CF6', angle: 330 }
  ]

  const getPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    }
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.svg
        width={config.radius * 2.8}
        height={config.radius * 2.8}
        className="overflow-visible"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* Central gear */}
        <motion.circle
          cx={config.radius * 1.4}
          cy={config.radius * 1.4}
          r={40}
          fill="url(#centralGradient)"
          stroke="#334155"
          strokeWidth="2"
        />
        
        {/* Central logo */}
        <text
          x={config.radius * 1.4}
          y={config.radius * 1.4}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-white font-bold text-xs fill-current"
        >
          LGPD
        </text>

        {/* Connecting lines */}
        {components.map((component) => {
          const pos = getPosition(component.angle, config.radius)
          return (
            <line
              key={`line-${component.id}`}
              x1={config.radius * 1.4}
              y1={config.radius * 1.4}
              x2={config.radius * 1.4 + pos.x}
              y2={config.radius * 1.4 + pos.y}
              stroke="#475569"
              strokeWidth="1"
              opacity="0.3"
            />
          )
        })}

        {/* Component gears */}
        {components.map((component, index) => {
          const pos = getPosition(component.angle, config.radius)
          const gearRadius = 20
          
          return (
            <g key={component.id}>
              {/* Gear circle */}
              <motion.circle
                cx={config.radius * 1.4 + pos.x}
                cy={config.radius * 1.4 + pos.y}
                r={gearRadius}
                fill={`url(#gradient-${component.id})`}
                stroke="#334155"
                strokeWidth="1.5"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.5
                }}
                style={{
                  transformOrigin: `${config.radius * 1.4 + pos.x}px ${config.radius * 1.4 + pos.y}px`
                }}
              />
              
              {/* Gear teeth */}
              {[...Array(8)].map((_, toothIndex) => {
                const toothAngle = (toothIndex * 45) * Math.PI / 180
                const toothX = Math.cos(toothAngle) * (gearRadius + 3)
                const toothY = Math.sin(toothAngle) * (gearRadius + 3)
                
                return (
                  <motion.rect
                    key={toothIndex}
                    x={config.radius * 1.4 + pos.x + toothX - 1}
                    y={config.radius * 1.4 + pos.y + toothY - 2}
                    width="2"
                    height="4"
                    fill="#475569"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.5
                    }}
                    style={{
                      transformOrigin: `${config.radius * 1.4 + pos.x}px ${config.radius * 1.4 + pos.y}px`
                    }}
                  />
                )
              })}
              
              {/* Component number */}
              <text
                x={config.radius * 1.4 + pos.x}
                y={config.radius * 1.4 + pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-white font-bold text-xs fill-current"
              >
                {component.id}
              </text>
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

      {/* Component labels */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none">
          {components.map((component) => {
            const pos = getPosition(component.angle, config.radius + 60)
            return (
              <div
                key={`label-${component.id}`}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${config.fontSize} text-center`}
                style={{
                  left: `${50 + (pos.x / (config.radius * 1.4)) * 50}%`,
                  top: `${50 + (pos.y / (config.radius * 1.4)) * 50}%`,
                  maxWidth: '80px'
                }}
              >
                <div className="bg-surface-elevated/90 backdrop-blur-sm rounded-lg px-2 py-1 text-surface-on-surface font-medium shadow-sm border border-ink-700/20">
                  {component.name}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GearVisualization