# Guia de Deploy - Site Consolidado

## 🚀 Deploy do Site Completo

### Pré-requisitos
- Node.js 18+ instalado
- Conta em plataforma de deploy (Vercel recomendado)
- Variáveis de ambiente configuradas

## 📍 Plataformas Recomendadas

### 1. Vercel (Recomendado)
```bash
# Instalar CLI
npm i -g vercel

# Fazer deploy
vercel

# Deploy de produção
vercel --prod
```

**Vantagens:**
- Integração automática com Git
- CDN global
- HTTPS automático
- Preview deployments

### 2. Netlify
```bash
# Instalar CLI
npm install -g netlify-cli

# Build local
npm run build

# Deploy
netlify deploy --prod --dir dist
```

### 3. Railway
```bash
# Conectar repositório via dashboard
# Railway detecta automaticamente o projeto React
```

## ⚙️ Configuração de Variáveis

### Arquivo .env.example
```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Analytics (Opcional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Domínio (Produção)
VITE_SITE_URL=https://seudominio.com
```

### Configuração por Plataforma

**Vercel:**
- Dashboard > Project > Settings > Environment Variables

**Netlify:**
- Site Settings > Environment Variables

**Railway:**
- Project > Variables

## 📊 Build e Otimização

### Comandos de Build
```bash
# Instalar dependências
pnpm install

# Build otimizado
pnpm build

# Verificar tamanho
du -sh dist/

# Preview local
pnpm preview
```

### Otimizações Aplicadas
- **Code Splitting** automático
- **Tree Shaking** para remover código não usado
- **Asset Optimization** (imagens, fonts)
- **CSS Minification**
- **JavaScript Minification**

## 🔍 Monitoramento Pós-Deploy

### Métricas Importantes
- **Core Web Vitals**
- **Bundle Size**
- **Loading Times**
- **Error Rates**

### Ferramentas
- Google PageSpeed Insights
- Lighthouse
- Web Vitals Extension
- Vercel Analytics (se usando Vercel)

## 🔧 Troubleshooting

### Problemas Comuns

**1. Build Falhando**
```bash
# Limpar cache
rm -rf node_modules dist
pnpm install
pnpm build
```

**2. Variáveis de Ambiente Não Carregando**
- Verificar prefixo `VITE_`
- Confirmar configuração na plataforma
- Restart do deploy

**3. Rotas 404 (SPA)**
- Configurar redirects para `index.html`
- Vercel: arquivo `vercel.json`
- Netlify: arquivo `_redirects`

### Arquivos de Configuração

**vercel.json**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**_redirects (Netlify)**
```
/*    /index.html   200
```

## 🔒 SSL e Domínio

### Configuração de Domínio Customizado
1. Apontar DNS para a plataforma
2. Configurar domínio no dashboard
3. Aguardar propagação SSL (até 24h)

### Redirecionamentos
- `www` → `no-www` (ou vice-versa)
- `http` → `https` (automático)

---

**✅ Deploy Checklist:**
- [ ] Build rodando sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Redirects SPA configurados
- [ ] Domínio e SSL funcionando
- [ ] Analytics configurado
- [ ] Performance testada