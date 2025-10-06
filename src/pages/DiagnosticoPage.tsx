import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { loadQuestionnaireData, submitDiagnostic, getUtmParams } from '../lib/api'
import { toast } from 'sonner'

interface QuestionnaireData {
  id: string
  title: string
  steps: Array<{
    id: string
    title: string
    fields?: Array<{
      id: string
      label: string
      type: string
      options?: string[]
      scores?: Record<string, number>
    }>
    summary?: boolean
  }>
  output: Array<{
    threshold: number
    label: string
    recommendation: string
  }>
}

const DiagnosticoPage: React.FC = () => {
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadQuestionnaireData()
        setQuestionnaireData(data)
      } catch (error) {
        console.error('Erro ao carregar questionário:', error)
        toast.error('Erro ao carregar questionário')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleNext = () => {
    if (!questionnaireData) return
    
    const currentStepData = questionnaireData.steps[currentStep]
    
    // Validar se todas as perguntas obrigatórias foram respondidas
    if (currentStepData.fields) {
      const unansweredFields = currentStepData.fields.filter(
        field => !responses[field.id]
      )
      
      if (unansweredFields.length > 0) {
        toast.error('Por favor, responda todas as perguntas antes de continuar')
        return
      }
    }
    
    if (currentStep < questionnaireData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!questionnaireData || !responses.company_name) {
      toast.error('Por favor, preencha o nome da empresa')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const utmParams = getUtmParams()
      const resultData = await submitDiagnostic({
        company_name: responses.company_name,
        responses: responses,
        ...utmParams
      })
      
      setResult(resultData)
      toast.success('Diagnóstico concluído com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar diagnóstico')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const getProgressPercentage = () => {
    if (!questionnaireData) return 0
    return Math.round(((currentStep + 1) / questionnaireData.steps.length) * 100)
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            value={responses[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="form-field w-full"
            placeholder={field.label}
          />
        )
      
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option: string) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={responses[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-4 h-4 text-brand-primary bg-surface-elevated border-ink-700 focus:ring-brand-primary focus:ring-2"
                />
                <span className="text-body-m text-surface-on-surface group-hover:text-brand-primary transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  const renderResultCard = () => {
    if (!result) return null
    
    const getScoreColor = (score: number) => {
      if (score < 40) return 'text-semantic-danger'
      if (score < 70) return 'text-semantic-warning'
      return 'text-semantic-success'
    }
    
    const getScoreIcon = (score: number) => {
      if (score < 40) return AlertCircle
      if (score < 70) return TrendingUp
      return CheckCircle
    }
    
    const ScoreIcon = getScoreIcon(result.score)
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card-glass max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-elevated mb-4`}>
            <ScoreIcon className={`w-8 h-8 ${getScoreColor(result.score)}`} />
          </div>
          
          <h2 className="text-h2 font-heading text-surface-on-surface mb-2">
            Nível de Maturidade: <span className={getScoreColor(result.score)}>{result.maturityLevel}</span>
          </h2>
          
          <div className="text-h3 font-heading text-gradient mb-4">
            Pontuação: {result.score}/100
          </div>
          
          <div className="w-full bg-surface-elevated rounded-full h-3 mb-6">
            <motion.div
              className={`h-3 rounded-full ${
                result.score < 40 ? 'bg-semantic-danger' :
                result.score < 70 ? 'bg-semantic-warning' : 'bg-semantic-success'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-h4 font-heading text-surface-on-surface mb-4">
            Recomendações Personalizadas:
          </h3>
          
          <ul className="space-y-3">
            {result.recommendations?.map((recommendation: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <span className="text-body-m text-ink-300">
                  {recommendation}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => {
              setCurrentStep(0)
              setResponses({})
              setResult(null)
            }}
            className="btn-secondary flex-1"
          >
            Fazer novo diagnóstico
          </button>
          
          <a
            href="/contato"
            className="btn-primary flex-1 text-center"
          >
            Falar com especialista
          </a>
        </div>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-glow w-12 h-12 bg-brand-primary rounded-full mx-auto mb-4"></div>
          <p className="text-body-l text-ink-300">Carregando diagnóstico...</p>
        </div>
      </div>
    )
  }

  if (!questionnaireData) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-semantic-danger mx-auto mb-4" />
          <p className="text-body-l text-ink-300">Erro ao carregar o diagnóstico</p>
        </div>
      </div>
    )
  }

  const currentStepData = questionnaireData.steps[currentStep]
  const isLastStep = currentStep === questionnaireData.steps.length - 1
  const isResultStep = currentStepData.summary

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-surface">
      <div className="container-custom">
        {!result ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-h1 font-heading text-surface-on-surface mb-4">
                {questionnaireData.title}
              </h1>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between text-body-s text-ink-300 mb-2">
                  <span>Progresso</span>
                  <span>{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-surface-elevated rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-brand rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <p className="text-body-l text-ink-300">
                Etapa {currentStep + 1} de {questionnaireData.steps.length}: {currentStepData.title}
              </p>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="card-glass"
                >
                  {isResultStep ? (
                    // Summary step
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-semantic-success mx-auto mb-6" />
                      
                      <h2 className="text-h2 font-heading text-surface-on-surface mb-4">
                        Diagnóstico Pronto!
                      </h2>
                      
                      <p className="text-body-l text-ink-300 mb-8">
                        Clique em "Finalizar" para ver seus resultados personalizados e recomendações específicas.
                      </p>
                      
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn-primary text-lg px-8 py-4"
                      >
                        {isSubmitting ? 'Processando...' : 'Ver Resultado'}
                      </button>
                    </div>
                  ) : (
                    // Question steps
                    <div>
                      <h2 className="text-h3 font-heading text-surface-on-surface mb-6">
                        {currentStepData.title}
                      </h2>
                      
                      <div className="space-y-6">
                        {currentStepData.fields?.map((field) => (
                          <div key={field.id}>
                            <label className="form-label">
                              {field.label}
                            </label>
                            {renderField(field)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {!isResultStep && (
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="btn-ghost flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>{isLastStep ? 'Finalizar' : 'Próximo'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Result
          renderResultCard()
        )}
      </div>
    </div>
  )
}

export default DiagnosticoPage