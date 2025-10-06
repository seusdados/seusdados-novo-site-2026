# Guia de Deploy - Website Completo Seusdados

## Visão Geral do Deploy

O website Seusdados é composto por múltiplas aplicações que podem ser deployadas independentemente ou em conjunto. Este guia cobre todas as estratégias de deploy disponíveis.

## Estrutura de Deploy

### 1. Site Principal (Multi-páginas)
**Localização:** Raiz do projeto
**Tipo:** Single Page Application com roteamento
**Deploy:** Provedor de hospedagem SPA (Netlify, Vercel, etc.)

### 2. Páginas Especializadas
**Localização:** `pages/*/`
**Tipo:** SPAs independentes
**Deploy:** Podem ser deployadas separadamente

### 3. Backend Unificado
**Localização:** `supabase/`
**Tipo:** Backend as a Service
**Deploy:** Supabase Cloud

## Estratégias de Deploy

### Estratégia 1: Deploy Monolítico
**Descrição:** Deploy de tudo como uma única aplicação
**Vantagens:** Simplicidade, gerenciamento único
**Desvantagens:** Build maior, deploys acoplados

```bash
# Build completo
pnpm build

# Deploy tudo junto
npm run deploy
```

### Estratégia 2: Deploy Modular
**Descrição:** Deploy independente de cada página/aplicação
**Vantagens:** Deploys independentes, otimização por página
**Desvantagens:** Mais complexidade de gerenciamento

```bash
# Deploy site principal
pnpm build && npm run deploy:main

# Deploy página LGPD
cd pages/implementacao-lgpd && pnpm build && npm run deploy:lgpd

# Deploy DPO
cd pages/dpo-as-service && pnpm build && npm run deploy:dpo
```

### Estratégia 3: Deploy Híbrido (Recomendado)
**Descrição:** Site principal + páginas críticas separadas
**Vantagens:** Balance entre simplicidade e flexibilidade

## Deploy do Site Principal

### Pré-requisitos
```bash
# Verificar ambiente
node --version  # 18.0+
pnpm --version  # 8.0+

# Instalar dependências
pnpm install
```

### Configuração de Ambiente
```bash
# Criar arquivo de produção
cp .env.example .env.production

# Configurar variáveis críticas
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://seusdados.com
NODE_ENV=production
```

### Build de Produção
```bash
# Limpar cache anterior
rm -rf dist .vite node_modules/.vite

# Reinstalar dependências
pnpm install --frozen-lockfile

# Build otimizado
pnpm build

# Verificar build
pnpm preview
```

### Deploy para Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy para Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Deploy das Páginas Especializadas

### Página Implementação LGPD
**Status:** DEPLOYADA EM PRODUÇÃO
**URL:** https://bdgmow6y7ctf.space.minimax.io

```bash
cd pages/implementacao-lgpd/

# Build otimizado (já otimizado para 3.4MB)
pnpm build

# Deploy
# (já deployado com sucesso)
```

**Métricas de Produção:**
- Build Size: 3.4MB
- JavaScript: 576KB (147KB gzipped)
- CSS: 31KB (5.8KB gzipped)
- Performance Score: 90+

### Página DPO as a Service
```bash
cd pages/dpo-as-service/

# Instalar dependências
pnpm install

# Build
pnpm build

# Deploy
npm run deploy
```

### Animação CSC Revolucionária
```bash
cd pages/animacao-csc/

# Instalar dependências
pnpm install

# Build
pnpm build

# Deploy
npm run deploy
```

## Deploy do Backend (Supabase)

### Setup Inicial
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link projeto
supabase link --project-ref YOUR_PROJECT_REF
```

### Deploy Edge Functions
```bash
# Deploy todas as funções
supabase functions deploy contact-submission
supabase functions deploy diagnostic-submission
supabase functions deploy lead-submission
supabase functions deploy lgpd-lead-submission
supabase functions deploy lgpd-consultation-booking
supabase functions deploy newsletter-subscribe
supabase functions deploy wizard-save-progress

# Verificar status
supabase functions list
```

### Aplicar Migrações
```bash
# Push migrações para produção
supabase db push

# Verificar tabelas
supabase db list
```

### Configurar RLS (Row Level Security)
```sql
-- Aplicar políticas de segurança
-- (scripts já configurados em supabase/tables/)
```

## Configuração de Domínios

### Domínio Principal
```
seusdados.com
├── / (site principal)
├── /segmentos
├── /solucoes
└── ... (outras páginas)
```

### Subdomínios Especializados (Opcional)
```
lgpd.seusdados.com     → Página Implementação LGPD
dpo.seusdados.com      → Página DPO as a Service
animacao.seusdados.com → Animação CSC
```

### Configuração DNS
```
# Registros A/CNAME
seusdados.com          A     xxx.xxx.xxx.xxx
www.seusdados.com      CNAME seusdados.com
lgpd.seusdados.com     CNAME target-url
dpo.seusdados.com      CNAME target-url
```

## Otimizações de Deploy

### Compressão
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### CDN para Assets
```bash
# Upload de imagens para CDN
# Configurar URLs no ambiente
VITE_CDN_URL=https://cdn.seusdados.com
```

### Cache Strategy
```
# Headers recomendados
Cache-Control: public, max-age=31536000  # Assets
Cache-Control: public, max-age=3600      # HTML
Cache-Control: private, no-cache         # API responses
```

## Monitoramento Pós-Deploy

### Health Checks
```bash
# Script de verificação
#!/bin/bash
echo "Verificando site principal..."
curl -f https://seusdados.com || exit 1

echo "Verificando página LGPD..."
curl -f https://lgpd.seusdados.com || exit 1

echo "Verificando Supabase..."
curl -f https://your-project.supabase.co/rest/v1/ || exit 1

echo "✅ Todos os serviços estão online"
```

### Performance Monitoring
```bash
# Lighthouse CI
npm install -g @lhci/cli

# Configurar lighthouse.json
{
  "ci": {
    "collect": {
      "url": ["https://seusdados.com", "https://lgpd.seusdados.com"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}

# Executar audit
lhci autorun
```

### Error Tracking
```javascript
// Configurar Sentry ou similar
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

## Rollback Strategy

### Frontend Rollback
```bash
# Manter versões anteriores
mv dist dist-backup-$(date +%Y%m%d)

# Restaurar versão anterior
cp -r dist-backup-20251006 dist

# Redeploy
npm run deploy
```

### Backend Rollback
```bash
# Rollback Edge Functions
supabase functions deploy function-name --legacy-bundle

# Rollback Database (usar backup)
supabase db restore backup-timestamp
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy Website

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Checklist de Deploy

### Pré-Deploy
- [ ] Todos os testes passando
- [ ] Build sem warnings
- [ ] Variáveis de ambiente configuradas
- [ ] Edge Functions deployadas
- [ ] Banco de dados migrado
- [ ] Performance audit executado

### Deploy
- [ ] Build de produção executado
- [ ] Assets otimizados
- [ ] CDN configurado
- [ ] SSL certificado ativo
- [ ] Headers de segurança configurados

### Pós-Deploy
- [ ] Health checks passando
- [ ] Analytics funcionando
- [ ] Formulários testados
- [ ] Performance verificada
- [ ] SEO tags validadas
- [ ] Acessibilidade testada

## Troubleshooting

### Build Failures
```bash
# Limpar completamente
rm -rf node_modules dist .vite
pnpm install

# Build com debug
DEBUG=vite:* pnpm build
```

### Deploy Timeouts
```bash
# Verificar tamanho do build
du -sh dist/

# Otimizar se necessário
# (remover assets não utilizados)
```

### Edge Functions Issues
```bash
# Verificar logs
supabase functions logs function-name

# Testar localmente
supabase functions serve
```

---

**Deploy Strategy:** Multi-aplicação com backend unificado  
**Status Atual:** Site Principal + Página LGPD em produção  
**Próximos Deploys:** DPO as a Service + Animação CSC  
**Monitoramento:** 24/7 com alertas automáticos
