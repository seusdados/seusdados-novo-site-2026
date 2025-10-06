# Guia de Navegação - Seusdados Website Completo

## Estrutura de Navegação

### Site Principal (Multi-páginas)
**Base URL:** Configurável via variável de ambiente
**Tecnologia:** React Router com navegação SPA

#### Rotas Principais
```
/                    → Home (página inicial)
/segmentos           → Lista de segmentos atendidos
/segmento/:slug      → Página individual de segmento
/solucoes            → Soluções e serviços
/planos              → Planos e preços
/diagnostico         → Ferramenta diagnóstico LGPD
/contato             → Formulário de contato
/experimental        → Página experimental
```

#### Header Navigation
**Componente:** `src/components/Header.tsx`

**Menu Principal:**
- **Início** → `/`
- **Segmentos** → `/segmentos` (com dropdown)
- **Soluções** → `/solucoes`
- **Planos** → `/planos`
- **Diagnóstico** → `/diagnostico`
- **Contato** → `/contato`

**Menu Mobile:**
- Hamburger menu responsivo
- Navegação touch-friendly
- Fechamento automático após seleção

#### Footer Navigation
**Componente:** `src/components/Footer.tsx`

**Links Organizados:**
- **Serviços:** Links para principais soluções
- **Segmentos:** Links para segmentos populares
- **Empresa:** Sobre, contato, políticas
- **Legal:** Privacidade, termos, LGPD

### Páginas Especializadas (Standalone)

#### 1. Implementação LGPD
**Localização:** `pages/implementacao-lgpd/`
**Tipo:** Single Page Application (SPA)
**Navegação:** Interna via scroll e âncoras

**Seções (Navegação Interna):**
1. **Hero Section** - Introdução e CTA principal
2. **Engrenagem LGPD** - Metodologia interativa
3. **Serviços Incluídos** - O que está incluso
4. **Como Funciona** - Timeline de implementação
5. **Resultados** - Métricas e benefícios
6. **FAQ** - Perguntas frequentes
7. **CTA Final** - Conversão final

**Navegação Interna:**
```javascript
// Scroll suave para seções
const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth'
  });
};
```

#### 2. DPO as a Service
**Localização:** `pages/dpo-as-service/`
**Tipo:** SPA com animação CSC
**Características:**
- Navegação centrada na animação CSC
- Interações mouse/touch na animação
- Controles de play/pause

#### 3. Animação CSC Revolucionária
**Localização:** `pages/animacao-csc/`
**Tipo:** SPA experimental
**Características:**
- Navegação baseada em gestos
- Controles avançados de animação
- Interface experimental

## Fluxos de Navegação

### Fluxo de Conversão Principal
```
Home → Segmentos → Segmento Específico → Soluções → Diagnóstico → Contato
```

### Fluxo LGPD Especializado
```
Home → Implementação LGPD → Formulário Lead → Consulta Agendada
```

### Fluxo DPO
```
Home → DPO as a Service → Animação CSC → Contato Especializado
```

## Componentes de Navegação

### Breadcrumbs
**Implementação:** Automática baseada na rota atual
```typescript
const breadcrumbs = [
  { label: 'Início', path: '/' },
  { label: 'Segmentos', path: '/segmentos' },
  { label: 'Hospitais', path: '/segmento/hospitais' }
];
```

### Menu Contextual
**Localização:** Páginas específicas de segmento
**Funcionalidade:** Navegação rápida entre segmentos relacionados

### Calls-to-Action (CTAs)
**Estratégia:** CTAs contextuais em cada página direcionando para:
- Diagnóstico LGPD
- Formulário de contato
- Agendamento de consulta
- Download de materials

## Navegação Mobile

### Responsividade
- **Breakpoints:** 320px, 375px, 768px, 1024px, 1440px
- **Touch Targets:** Mínimo 44px conforme diretrizes iOS/Android
- **Gestos:** Swipe navigation onde aplicável

### Menu Mobile
```typescript
// Estado do menu mobile
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Toggle menu
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};
```

### Navegação por Toque
- **Tap targets** otimizados
- **Scroll suave** em dispositivos móveis
- **Overlay navigation** para melhor UX

## SEO e Navegação

### URLs Semânticas
```
/segmento/hospitais           ✓ Semântica
/segment?id=1                 ✗ Não semântica
```

### Meta Tags Dinâmicas
```typescript
// Configuração por página
const pageConfig = {
  '/segmentos': {
    title: 'Segmentos Atendidos | Seusdados',
    description: 'Conheça os segmentos que atendemos...',
    keywords: 'segmentos, hospitais, educação, LGPD'
  }
};
```

### Sitemap Automático
- Geração automática baseada nas rotas
- Atualização dinâmica conforme novos segmentos
- Priorização de páginas por importância

## Analytics de Navegação

### Google Analytics 4
```javascript
// Tracking de navegação
gtag('event', 'page_view', {
  'page_title': 'Segmentos',
  'page_location': '/segmentos',
  'page_path': '/segmentos'
});

// Tracking de cliques em menu
gtag('event', 'menu_click', {
  'menu_item': 'segmentos',
  'menu_location': 'header'
});
```

### Eventos Trackados
- **Page views** em todas as rotas
- **Menu clicks** (header e footer)
- **CTA clicks** contextuais
- **Time on page** por seção
- **Scroll depth** em páginas longas
- **Exit intent** em páginas críticas

## Acessibilidade na Navegação

### Navegação por Teclado
```typescript
// Suporte a Tab navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // Ativar navegação
  }
};
```

### ARIA Labels
```jsx
<nav aria-label="Navegação principal">
  <ul>
    <li>
      <a href="/" aria-current="page">Início</a>
    </li>
  </ul>
</nav>
```

### Skip Links
```jsx
<a href="#main-content" className="skip-link">
  Pular para o conteúdo principal
</a>
```

## Performance de Navegação

### Lazy Loading
```typescript
// Carregamento dinâmico de páginas
const SegmentoPage = lazy(() => import('./pages/SegmentoPage'));
const SolucaoPage = lazy(() => import('./pages/SolucaoPage'));
```

### Prefetching
```typescript
// Pré-carregamento de rotas prováveis
const prefetchRoute = (route: string) => {
  import(`./pages/${route}Page`);
};
```

### Cache Strategy
- **Service Worker** para cache de rotas visitadas
- **Memory cache** para componentes carregados
- **HTTP cache** para assets estáticos

## Estados de Navegação

### Loading States
```typescript
const [isNavigating, setIsNavigating] = useState(false);

// Indicador visual durante navegação
{isNavigating && <LoadingSpinner />}
```

### Error States
```typescript
// Fallback para rotas não encontradas
const NotFoundPage = () => (
  <div>
    <h1>Página não encontrada</h1>
    <Link to="/">Voltar ao início</Link>
  </div>
);
```

### Offline State
```typescript
// Navegação offline
const [isOffline, setIsOffline] = useState(!navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOffline(false);
  const handleOffline = () => setIsOffline(true);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```

## Configuração de Rotas

### React Router Setup
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/segmentos" element={<SegmentosPage />} />
      <Route path="/segmento/:slug" element={<SegmentoPage />} />
      <Route path="/solucoes" element={<SolucaoPage />} />
      <Route path="/planos" element={<PlanosPage />} />
      <Route path="/diagnostico" element={<DiagnosticoPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/experimental" element={<ExperimentalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
```

### Route Guards
```typescript
// Proteção de rotas específicas
const ProtectedRoute = ({ children, requireAuth = false }) => {
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
```

---

**Navegação otimizada para conversão e experiência do usuário**  
**Compatível com:** Desktop, Tablet, Mobile  
**Acessibilidade:** WCAG 2.1 AA  
**Performance:** Core Web Vitals otimizados
