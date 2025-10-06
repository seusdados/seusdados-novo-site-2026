import React from 'react'

// Esta página renderiza o conteúdo específico do DPO as a Service
// integrado ao design e navegação do site principal

const DPOAsServicePage: React.FC = () => {
  React.useEffect(() => {
    // Carrega o conteúdo específico da página DPO via iframe ou importação
    const loadDPOContent = () => {
      // O conteúdo específico está em /pages/dpo-as-service/
      window.location.href = '/pages/dpo-as-service/index.html'
    }
    
    loadDPOContent()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Carregando DPO as a Service...</h1>
          <p className="text-gray-600">Redirecionando para a página específica...</p>
        </div>
      </div>
    </div>
  )
}

export default DPOAsServicePage