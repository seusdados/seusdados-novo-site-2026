# Sistema de Navegação - Site Consolidado

## 🧭 Arquitetura de Navegação

### Estrutura Principal
O site utiliza **React Router** para navegação SPA (Single Page Application) com as seguintes características:

- **Roteamento Client-Side** - Navegação instantânea
- **Header Persistente** - Navegação sempre visível
- **Footer Global** - Informações e links em todas as páginas
- **Breadcrumbs** - Orientação de localização

## 🗺️ Mapa de Rotas

### Páginas Principais
```
/ (Home)
├── /diagnostico              # Wizard de Diagnóstico LGPD
├── /contato                   # Formulário de Contato
├── /planos                    # Planos e Preços
├── /segmentos                 # Lista de Segmentos
│   └── /segmentos/:slug       # Segmento Específico
└── /experimental              # Página Experimental
```

### Soluções Especializadas
```
/solucoes/
├── implementacao-lgpd         # Implementação LGPD (Reestruturada)
├── dpo-as-a-service           # DPO as a Service (com animação CSC)
├── governanca                 # Governança de Dados
├── treinamentos               # Treinamentos LGPD
└── auditorias                 # Auditorias de Conformidade
```

## 🎨 Componentes de Navegação

### Header Principal
**Localização:** `src/components/Header.tsx`

**Funcionalidades:**
- Logo clicavel (volta para Home)
- Menu principal com dropdowns
- Menu mobile responsivo
- Botão CTA "Contato"
- Indicador de página ativa

**Estrutura do Menu:**
```
SeusDados (Logo)
├── Início
├── Soluções ▼
│   ├── Implementação LGPD
│   ├── DPO as a Service
│   ├── Governança
│   ├── Treinamentos
│   └── Auditorias
├── Segmentos
├── Planos
├── Diagnóstico
└── Contato
```

### Footer Global
**Localização:** `src/components/Footer.tsx`

**Seções:**
- **Links Rápidos** - Navegação principal
- **Soluções** - Links diretos para serviços
- **Contato** - Informações de contato
- **Legal** - Política de Privacidade, Termos

## 📱 Navegação Responsiva

### Desktop (1024px+)
- Menu horizontal completo
- Dropdowns com hover
- Header fixo com scroll

### Tablet (768px - 1023px)
- Menu horizontal condensado
- Dropdowns com click
- Logo menor

### Mobile (< 768px)
- Menu hamburger
- Drawer lateral
- Navegação vertical
- Touch-friendly

## 🔗 Links e CTAs Estratégicos

### Call-to-Actions Principais
1. **Diagnóstico Gratuito** - Header e Home
2. **Fale Conosco** - Header fixo
3. **Solicitar Orçamento** - Páginas de soluções
4. **WhatsApp** - Botão flutuante

### Cross-Linking Inteligente
- **Home** → Soluções principais
- **Segmentos** → Soluções relevantes
- **Soluções** → Diagnóstico e Contato
- **Blog/Conteúdo** → CTAs contextuais

## 🔍 SEO e Navegação

### URLs Otimizadas
- **Estrutura Lógica:** `/categoria/subcategoria`
- **Palavras-Chave:** URLs descritivas
- **Hifenização:** Separadores padrão

### Breadcrumbs Estruturados
```
Home > Soluções > Implementação LGPD
```

### Sitemap Automático
- Geração dinâmica de sitemap.xml
- Prioridades por tipo de página
- Atualização automática

## 🎢 Navegação Contextual

### Páginas de Soluções
- **"Outras Soluções"** - Grid com links relacionados
- **"Próximos Passos"** - CTAs específicos
- **"Casos de Uso"** - Links para segmentos

### Páginas de Segmentos
- **"Soluções Recomendadas"** - Filtradas por segmento
- **"Outros Segmentos"** - Navegação lateral
- **"Case Studies"** - Exemplos práticos

## 🔧 Implementação Técnica

### React Router Setup
```tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes/implementacao-lgpd" element={<ImplementacaoLGPDPage />} />
          {/* Outras rotas */}
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
```

### Navegação Programática
```tsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// Navegar para página
navigate('/solucoes/implementacao-lgpd')

// Navegar com estado
navigate('/contato', { state: { from: 'diagnostico' } })
```

### Detecção de Rota Ativa
```tsx
import { useLocation } from 'react-router-dom'

const location = useLocation()
const isActive = location.pathname === '/solucoes/implementacao-lgpd'
```

## 📊 Analytics de Navegação

### Eventos Rastreados
- **Page Views** - Todas as rotas
- **Menu Clicks** - Itens do header/footer
- **CTA Clicks** - Botões de ação
- **Search Usage** - Busca interna

### Métricas Importantes
- **Bounce Rate** por página
- **Flow de Navegação** - Sequência de páginas
- **Drop-off Points** - Onde usuários saem
- **Conversion Paths** - Jornada até conversão

---

**🎯 Navegação Otimizada para:**
- Experiência do usuário intuitiva
- SEO e descoberta de conteúdo
- Conversão e geração de leads
- Performance e carregamento rápido