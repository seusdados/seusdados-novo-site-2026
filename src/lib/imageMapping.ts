/**
 * Sistema centralizado de mapeamento de imagens para segmentos e serviços
 * Todas as imagens específicas estão organizadas em /images/segments/ e /images/services/
 */

// Mapeamento completo de imagens específicas por segmento
export const getSegmentoImage = (slug: string): string => {
  console.log('🎯 getSegmentoImage chamado com slug:', slug);
  
  const imageMap: Record<string, string> = {
    // ILUSTRAÇÕES AUTORAIS SEM FUNDO - INTEGRADAS DIRETAMENTE AO FUNDO
    'planos-de-saude': '/images/segments/segmento-planos-saude-sem-fundo.png',
    'hospitais': '/images/segments/segmento-hospitais-sem-fundo.png',
    'laboratorios': '/images/segments/segmento-laboratorios-sem-fundo.png',
    'consultorios-medicos': '/images/segments/segmento-consultorios-medicos-sem-fundo.png',
    'planos-odontologicos': '/images/segments/segmento-planos-odontologicos-sem-fundo.png',
    'dentistas': '/images/segments/segmento-dentistas-sem-fundo.png',
    'farmacias': '/images/segments/segmento-farmacias-sem-fundo.png',
    'supermercados': '/images/segments/segmento-supermercados-sem-fundo.png',
    'escolas': '/images/segments/segmento-escolas-sem-fundo.png',
    'universidades': '/images/segments/segmento-universidades-sem-fundo.png',
    'condominios': '/images/segments/segmento-condominios-sem-fundo.png',
    'logistica-transportadoras': '/images/segments/segmento-logistica-transportadoras-sem-fundo.png',
    'lojistas': '/images/segments/segmento-lojistas-sem-fundo.png',
    'academias': '/images/segments/segmento-academias-sem-fundo.png',
    'cooperativas': '/images/segments/segmento-cooperativas-sem-fundo.png',
    'camaras-municipais': '/images/segments/segmento-camaras-municipais-sem-fundo.png',
    'prefeituras': '/images/segments/segmento-prefeituras-sem-fundo.png',
    'educacao': '/images/segments/segmento-educacao-sem-fundo.png',
    'financeiro': '/images/segments/segmento-financeiro-sem-fundo.png',
    'tecnologia': '/images/segments/segmento-tecnologia-sem-fundo.png',
    // Fallback para segmentos sem ilustração autoral específica
    'construtoras-imobiliarias': '/images/segments/segmento-construtoras-imobiliarias-sem-fundo.png',
    'corretoras-de-seguros': '/images/segments/segmento-corretoras-seguros-sem-fundo.png'
  }
  
  const imagePath = imageMap[slug] || '/images/segments/segmento-planos-saude-sem-fundo.png';
  const isUsingFallback = !imageMap[slug];
  
  console.log('📊 Resultado do mapeamento:', {
    slug,
    imagePath,
    isUsingFallback,
    availableKeys: Object.keys(imageMap).slice(0, 5).join(', ') + '...'
  });
  
  return imagePath;
}

// Mapeamento completo de imagens específicas por tipo de serviço
export const getServiceImage = (tipo: string): string => {
  const imageMap: Record<string, string> = {
    // Imagens específicas de serviços (5 serviços com ilustrações únicas)
    'implementacao': '/images/services/servico-protecao-dados.png',
    'dpo': '/images/services/servico-consultoria-privacidade.png',
    'governanca': '/images/services/servico-gestao-consentimento.png',
    'treinamentos': '/images/services/servico-treinamentos.png',
    'auditorias': '/images/services/servico-auditoria.png',
    'protecao-dados': '/images/services/servico-protecao-dados.png',
    'consultoria-privacidade': '/images/services/servico-consultoria-privacidade.png',
    'gestao-consentimento': '/images/services/servico-gestao-consentimento.png',
    'auditoria': '/images/services/servico-auditoria.png'
  }
  
  return imageMap[tipo] || '/images/services/servico-protecao-dados.png'
}

// Lista de segmentos em destaque para homepage - ILUSTRAÇÕES SEM FUNDO INTEGRADAS
export const featuredSegments = [
  {
    slug: 'planos-de-saude',
    nome: 'Planos de Saúde',
    tagline: 'Conformidade que mantém a operação rodando',
    image: '/images/segments/segmento-planos-saude-sem-fundo.png'
  },
  {
    slug: 'hospitais',
    nome: 'Hospitais',
    tagline: 'Privacidade que protege vidas e dados',
    image: '/images/segments/segmento-hospitais-sem-fundo.png'
  },
  {
    slug: 'farmacias',
    nome: 'Farmácias',
    tagline: 'Controle no balcão e no CRM',
    image: '/images/segments/segmento-farmacias-sem-fundo.png'
  },
  {
    slug: 'supermercados',
    nome: 'Supermercados',
    tagline: 'Compliance que não atrasa o frente de loja',
    image: '/images/segments/segmento-supermercados-sem-fundo.png'
  },
  {
    slug: 'escolas',
    nome: 'Escolas',
    tagline: 'Ambiente seguro para ensino e dados',
    image: '/images/segments/segmento-escolas-sem-fundo.png'
  },
  {
    slug: 'academias',
    nome: 'Academias',
    tagline: 'Treinos e dados sob medida',
    image: '/images/segments/segmento-academias-sem-fundo.png'
  }
]

// Lista de serviços em destaque para homepage
export const featuredServices = [
  {
    tipo: 'protecao-dados',
    nome: 'Proteção de Dados',
    tagline: 'Implementação completa da LGPD',
    image: '/images/services/servico-protecao-dados.png'
  },
  {
    tipo: 'consultoria-privacidade',
    nome: 'Consultoria em Privacidade',
    tagline: 'DPO as a Service especializado',
    image: '/images/services/servico-consultoria-privacidade.png'
  },
  {
    tipo: 'treinamentos',
    nome: 'Treinamentos',
    tagline: 'Capacitação em LGPD por função',
    image: '/images/services/servico-treinamentos.png'
  }
]

/**
 * Validar se uma imagem específica existe
 * @param imagePath - Caminho da imagem
 * @returns boolean
 */
export const validateImagePath = (imagePath: string): boolean => {
  // Lista de todas as imagens disponíveis - ILUSTRAÇÕES AUTORAIS CRIATIVAS
  const availableImages = [
    // Segmentos - TODAS ILUSTRAÇÕES SEM FUNDO INTEGRADAS
    '/images/segments/segmento-planos-saude-sem-fundo.png',
    '/images/segments/segmento-hospitais-sem-fundo.png',
    '/images/segments/segmento-laboratorios-sem-fundo.png',
    '/images/segments/segmento-consultorios-medicos-sem-fundo.png',
    '/images/segments/segmento-planos-odontologicos-sem-fundo.png',
    '/images/segments/segmento-dentistas-sem-fundo.png',
    '/images/segments/segmento-farmacias-sem-fundo.png',
    '/images/segments/segmento-supermercados-sem-fundo.png',
    '/images/segments/segmento-escolas-sem-fundo.png',
    '/images/segments/segmento-universidades-sem-fundo.png',
    '/images/segments/segmento-condominios-sem-fundo.png',
    '/images/segments/segmento-logistica-transportadoras-sem-fundo.png',
    '/images/segments/segmento-lojistas-sem-fundo.png',
    '/images/segments/segmento-academias-sem-fundo.png',
    '/images/segments/segmento-cooperativas-sem-fundo.png',
    '/images/segments/segmento-camaras-municipais-sem-fundo.png',
    '/images/segments/segmento-prefeituras-sem-fundo.png',
    '/images/segments/segmento-educacao-sem-fundo.png',
    '/images/segments/segmento-financeiro-sem-fundo.png',
    '/images/segments/segmento-tecnologia-sem-fundo.png',
    // Serviços
    '/images/services/servico-protecao-dados.png',
    '/images/services/servico-consultoria-privacidade.png',
    '/images/services/servico-gestao-consentimento.png',
    '/images/services/servico-treinamentos.png',
    '/images/services/servico-auditoria.png'
  ]
  
  return availableImages.includes(imagePath)
}
