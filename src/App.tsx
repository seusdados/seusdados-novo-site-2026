import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

// Pages
import Home from './pages/Home'
import DiagnosticoPage from './pages/DiagnosticoPage'
import ContatoPage from './pages/ContatoPage'
import PlanosPage from './pages/PlanosPage'
import SegmentoPage from './pages/SegmentoPage'
import SolucaoPage from './pages/SolucaoPage'
import SegmentosPage from './pages/SegmentosPage'
import ExperimentalPage from './pages/ExperimentalPage'

// Páginas Específicas Consolidadas
import ImplementacaoLGPDPage from './pages/ImplementacaoLGPDPage'
import DPOAsServicePage from './pages/DPOAsServicePage'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-surface text-surface-on-surface">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diagnostico" element={<DiagnosticoPage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/planos" element={<PlanosPage />} />
              <Route path="/segmentos" element={<SegmentosPage />} />
              <Route path="/segmentos/:slug" element={<SegmentoPage />} />
              <Route path="/solucoes/implementacao-lgpd" element={<ImplementacaoLGPDPage />} />
              <Route path="/solucoes/dpo-as-a-service" element={<DPOAsServicePage />} />
              <Route path="/solucoes/governanca" element={<SolucaoPage tipo="governanca" />} />
              <Route path="/solucoes/treinamentos" element={<SolucaoPage tipo="treinamentos" />} />
              <Route path="/solucoes/auditorias" element={<SolucaoPage tipo="auditorias" />} />
              <Route path="/experimental" element={<ExperimentalPage />} />
            </Routes>
          </main>
          
          <Footer />
          <CookieBanner />
          
          <Toaster 
            position="top-right"
            theme="dark"
            richColors
            closeButton
          />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App