# SeusDados - Website Completo

## 📚 Índice
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Páginas Incluídas](#páginas-incluídas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Deploy](#deploy)
- [Documentação Técnica](#documentação-técnica)

## 🌐 Visão Geral

Este é o site completo consolidado da **SeusDados**, incluindo todas as páginas e soluções desenvolvidas:

- **Página Principal**: Site institucional com navegação completa
- **Implementação LGPD**: Versão reestruturada com 12 componentes e 7 seções
- **DPO as a Service**: Página com animação CSC implementada
- **Outras Páginas**: Segmentos, planos, diagnóstico, contato

## 📱 Estrutura do Projeto

```
seusdados-website-completo/
├── README.md                    # Este arquivo
├── index.html                   # Página principal
├── package.json                 # Dependências e scripts
├── src/
│   ├── App.tsx                  # Roteamento principal
│   ├── main.tsx                 # Entry point
│   ├── pages/                   # Páginas do site principal
│   │   ├── Home.tsx
│   │   ├── DiagnosticoPage.tsx
│   │   ├── ContatoPage.tsx
│   │   ├── PlanosPage.tsx
│   │   ├── SegmentosPage.tsx
│   │   ├── ImplementacaoLGPDPage.tsx
│   │   └── DPOAsServicePage.tsx
│   └── components/              # Componentes reutilizáveis
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ...
├── pages/                       # Páginas específicas consolidadas
│   ├── implementacao-lgpd/      # Versão reestruturada LGPD
│   │   ├── index.html
│   │   ├── src/
│   │   ├── assets/
│   │   └── supabase/
│   └── dpo-as-service/          # Página DPO com animação CSC
│       ├── index.html
│       ├── assets/
│       └── data/
├── public/                      # Assets globais
├── supabase/                    # Configurações backend consolidadas
└── docs/                        # Documentação completa
```

## 📜 Páginas Incluídas

### Páginas Principais
- **Home** (`/`) - Página inicial do site
- **Diagnóstico** (`/diagnostico`) - Wizard de diagnóstico LGPD
- **Contato** (`/contato`) - Formulário de contato
- **Planos** (`/planos`) - Planos e preços
- **Segmentos** (`/segmentos`) - Segmentos atendidos

### Soluções Especializadas
- **Implementação LGPD** (`/solucoes/implementacao-lgpd`)
  - Versão reestruturada mais recente
  - 12 componentes modulares
  - 7 seções organizadas
  - Engrenagem dinâmica interativa
  
- **DPO as a Service** (`/solucoes/dpo-as-a-service`)
  - Página com animação CSC
  - Design responsivo
  - Conteúdo especializado

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS
- **React Router** - Roteamento SPA
- **Supabase** - Backend as a Service
- **Sonner** - Toast notifications

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_GOOGLE_ANALYTICS_ID=seu_id_analytics
```

## 🌐 Deploy

### Opções de Deploy

1. **Vercel** (Recomendado)
2. **Netlify**
3. **Railway**
4. **AWS S3 + CloudFront**

### Comandos de Build

```bash
# Build otimizado
pnpm build

# Verificar tamanho do bundle
pnpm build && du -sh dist/

# Testar build localmente
pnpm preview
```

## 📝 Documentação Técnica

### Arquitetura
- **SPA (Single Page Application)** com React Router
- **SSG (Static Site Generation)** via Vite
- **API Backend** via Supabase Edge Functions
- **CDN** para assets estáticos

### Performance
- **Code Splitting** automático por rota
- **Lazy Loading** de componentes
- **Compressão** de assets
- **Otimização** de imagens

### SEO
- **Meta tags** dinâmicas
- **Open Graph** configurado
- **Sitemap** gerado automaticamente
- **Schema markup** implementado

---

**© 2024 SeusDados - Soluções em Proteção de Dados**