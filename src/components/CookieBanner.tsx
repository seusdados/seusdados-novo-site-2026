import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings } from 'lucide-react'

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowBanner(false)
    
    // Here you would implement Google Consent Mode or other analytics
    // gtag('consent', 'update', {
    //   analytics_storage: 'granted',
    //   ad_storage: 'granted'
    // })
  }

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  const cookieTypes = [
    {
      key: 'necessary',
      title: 'Cookies Necessários',
      description: 'Essenciais para o funcionamento do site. Não podem ser desabilitados.',
      required: true
    },
    {
      key: 'functional',
      title: 'Cookies Funcionais',
      description: 'Melhoram a funcionalidade e personalização do site.',
      required: false
    },
    {
      key: 'analytics',
      title: 'Cookies de Análise',
      description: 'Nos ajudam a entender como você usa o site para melhorar sua experiência.',
      required: false
    },
    {
      key: 'marketing',
      title: 'Cookies de Marketing',
      description: 'Utilizados para personalizar anúncios e medir a eficácia das campanhas.',
      required: false
    }
  ]

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container-custom">
            <div className="bg-surface-elevated border border-ink-700 rounded-lg shadow-elevated p-6">
              {!showSettings ? (
                // Main banner
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex-1">
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Respeito à sua privacidade
                    </h3>
                    <p className="text-body-m text-ink-300 mb-4 lg:mb-0">
                      Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                      Você pode gerenciar suas preferências a qualquer momento.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:flex-shrink-0">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="btn-ghost flex items-center justify-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Personalizar</span>
                    </button>
                    
                    <button
                      onClick={handleRejectAll}
                      className="btn-secondary"
                    >
                      Rejeitar todos
                    </button>
                    
                    <button
                      onClick={handleAcceptAll}
                      className="btn-primary"
                    >
                      Aceitar todos
                    </button>
                  </div>
                </div>
              ) : (
                // Settings panel
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-h4 font-heading text-surface-on-surface">
                      Preferências de Cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 text-ink-300 hover:text-surface-on-surface transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6 mb-6">
                    {cookieTypes.map((type) => (
                      <div key={type.key} className="flex items-start space-x-3">
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            id={type.key}
                            checked={preferences[type.key as keyof typeof preferences]}
                            onChange={(e) => {
                              if (!type.required) {
                                setPreferences(prev => ({
                                  ...prev,
                                  [type.key]: e.target.checked
                                }))
                              }
                            }}
                            disabled={type.required}
                            className="w-4 h-4 text-brand-primary bg-surface-elevated border-ink-700 rounded focus:ring-brand-primary focus:ring-2"
                          />
                        </div>
                        <div className="flex-1">
                          <label 
                            htmlFor={type.key}
                            className="text-body-m font-medium text-surface-on-surface cursor-pointer"
                          >
                            {type.title}
                            {type.required && (
                              <span className="text-brand-primary ml-1">(Obrigatório)</span>
                            )}
                          </label>
                          <p className="text-body-s text-ink-300 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleRejectAll}
                      className="btn-secondary flex-1"
                    >
                      Rejeitar todos
                    </button>
                    
                    <button
                      onClick={handleSavePreferences}
                      className="btn-primary flex-1"
                    >
                      Salvar preferências
                    </button>
                  </div>
                  
                  <p className="text-body-s text-ink-500 mt-4">
                    Para mais informações, consulte nossa{' '}
                    <a href="/politicas/cookies" className="text-brand-primary hover:underline">
                      Política de Cookies
                    </a>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner