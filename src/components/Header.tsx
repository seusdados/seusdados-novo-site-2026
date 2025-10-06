import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolucoesOpen, setIsSolucoesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const solucoesLinks = [
    {
      title: 'Implementação LGPD',
      href: '/solucoes/implementacao-lgpd',
      description: 'Programa completo'
    },
    {
      title: 'DPO as a Service',
      href: '/solucoes/dpo-as-a-service',
      description: 'Governança contínua'
    },
    {
      title: 'Governança & Gestão',
      href: '/solucoes/governanca',
      description: 'Sistema Operacional (OS)'
    },
    {
      title: 'Treinamentos & Cultura',
      href: '/solucoes/treinamentos',
      description: 'Trilhas por função'
    },
    {
      title: 'Auditorias & Segurança',
      href: '/solucoes/auditorias',
      description: 'Riscos, incidentes e testes'
    }
  ]

  const utilLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' },
    { label: 'Área do cliente', href: 'https://app.seusdados.com/login', external: true }
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/95 backdrop-blur-md border-b border-ink-700 shadow-soft' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="Seusdados" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Soluções Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSolucoesOpen(true)}
              onMouseLeave={() => setIsSolucoesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-body-m text-surface-on-surface hover:text-brand-primary transition-colors">
                <span>Soluções</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isSolucoesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-surface-elevated border border-ink-700 rounded-lg shadow-elevated p-4"
                  >
                    <div className="grid gap-3">
                      {solucoesLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="block p-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-body-m font-medium text-surface-on-surface group-hover:text-brand-primary">
                            {link.title}
                          </div>
                          <div className="text-body-s text-ink-300 mt-1">
                            {link.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Util Links */}
            {utilLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-m text-surface-on-surface hover:text-brand-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-body-m transition-colors ${
                    location.pathname === link.href 
                      ? 'text-brand-primary' 
                      : 'text-surface-on-surface hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/diagnostico" className="btn-primary">
              Diagnóstico 100% gratuito
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-surface-on-surface hover:text-brand-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pt-4 border-t border-ink-700"
            >
              <nav className="space-y-4">
                {/* Mobile Soluções */}
                <div>
                  <button
                    className="flex items-center justify-between w-full text-body-m text-surface-on-surface py-2"
                    onClick={() => setIsSolucoesOpen(!isSolucoesOpen)}
                  >
                    <span>Soluções</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      isSolucoesOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {isSolucoesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-2 border-l-2 border-ink-700"
                      >
                        {solucoesLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block py-2 text-body-s text-ink-300 hover:text-brand-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Util Links */}
                {utilLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-body-m text-surface-on-surface hover:text-brand-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block py-2 text-body-m text-surface-on-surface hover:text-brand-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-ink-700">
                  <Link 
                    to="/diagnostico" 
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Diagnóstico 100% gratuito
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header