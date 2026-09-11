# 📖 Guia de Instalação - Passo a Passo

## ✅ Pré-requisitos

Certifique-se de ter instalado:
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- **Git** (opcional, para clonar)

### Verificar instalação:
```bash
node --version    # v18.0.0 ou superior
npm --version     # 9.0.0 ou superior
```

---

## 🎯 Passo 1: Preparar o Diretório

### Opção A: Já tem um projeto Vite criado
```bash
cd seu-projeto-existente
```

### Opção B: Criar novo projeto do zero
```bash
npm create vite@latest app-de-clima -- --template react-ts
cd app-de-clima
```

---

## 📥 Passo 2: Instalar Dependências

```bash
# Instalar todas as dependências do package.json
npm install
```

**Isto vai levar 2-5 minutos** (depende de sua internet)

Verá um output assim:
```
added 300+ packages, and audited 301 packages in 2m
```

---

## 📁 Passo 3: Copiar Arquivos de Configuração

Copie **para a raiz do projeto** os arquivos já criados:

```
✅ vite.config.ts
✅ tailwind.config.js
✅ postcss.config.js
✅ tsconfig.json
✅ tsconfig.node.json
✅ index.html
✅ .eslintrc.cjs
✅ .env.example
✅ .env.local
✅ .gitignore
✅ README.md
✅ package.json (atualizar/mesclar se necessário)
```

**Estrutura esperada:**
```
seu-projeto/
├── src/
├── public/
├── vite.config.ts          ← Adicione aqui
├── tailwind.config.js      ← Adicione aqui
├── postcss.config.js       ← Adicione aqui
├── tsconfig.json           ← Atualize
├── tsconfig.node.json      ← Adicione aqui
├── index.html              ← Atualize
├── .eslintrc.cjs           ← Adicione aqui
├── .env.local              ← Adicione aqui
├── .gitignore              ← Atualize
├── package.json            ← Atualize
└── README.md               ← Atualize
```

---

## 📁 Passo 4: Criar Estrutura de Pastas `src/`

```bash
# Dentro do projeto
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/types
```

**Resultado:**
```
src/
├── components/    (componentes React)
├── pages/         (páginas)
├── services/      (lógica de negócio)
├── types/         (interfaces TypeScript)
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

---

## 📝 Passo 5: Copiar Componentes & Serviços

Copie os arquivos `.tsx` e `.ts` que foram criados para suas respectivas pastas:

### Em `src/types/`
```
✅ weather.ts
```

### Em `src/services/`
```
✅ mockWeatherData.ts
```

### Em `src/components/`
```
✅ SearchBar.tsx
✅ CurrentWeather.tsx
✅ WeatherDetails.tsx
✅ ForecastChart.tsx
```

### Em `src/pages/`
```
✅ Home.tsx
```

### Na raiz de `src/`
```
✅ App.tsx
✅ App.css
✅ main.tsx
✅ index.css
```

---

## 🎨 Passo 6: Configurar Tailwind (Se Necessário)

Tailwind já deve estar funcionando com as configurações fornecidas, mas se não estiver:

### Remover arquivo CSS antigo:
Se houver um arquivo `src/index.css` velho, substitua-o pelo novo.

### Verificar que o `index.html` contém:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## ✅ Passo 7: Instalar Dependências Adicionais

Se não estiverem no `package.json`, instale manualmente:

```bash
# Icons
npm install lucide-react

# (Opcional) Para gráficos na Entrega 3
npm install recharts
```

---

## 🚀 Passo 8: Rodar o Projeto

```bash
npm run dev
```

**Resultado esperado:**
```
  VITE v5.0.2  ready in 256 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### 🌐 Abrir no navegador:
- A aba deve abrir automaticamente em `http://localhost:3000`
- Se não abrir, copie a URL manualmente

---

## ✨ Passo 9: Testar a Aplicação

1. **Página carrega?** ✅
2. **Vê o clima de São Paulo?** ✅
3. **Busca funciona?** ✅
4. **Clica em "Rio de Janeiro"?** ✅
5. **Previsão dos 5 dias aparece?** ✅
6. **Design é bonito?** ✅

Se tudo passou, **Parabéns! Entrega 1 está pronta!** 🎉

---

## 🔧 Troubleshooting

### Erro: "Cannot find module 'vite'"
```bash
# Solução:
npm install
```

### Erro: "Port 3000 is already in use"
```bash
# Mudar porta no vite.config.ts
server: {
  port: 3001,  // ← Mude para 3001
}
```

### Tailwind não estiliza nada
```bash
# Limpar cache
rm -rf node_modules/.vite
npm run dev
```

### TypeScript errors no VS Code
```bash
# Recarregar o TypeScript
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Componentes não aparecem
1. Verifique se `Home.tsx` importa corretamente os componentes
2. Verifique se os paths dos imports estão corretos
3. Certifique-se que os nomes dos arquivos `.tsx` existem

---

## 📦 Checklist de Conclusão

- [ ] Node.js e npm instalados e verificados
- [ ] Projeto criado/preparado
- [ ] `npm install` executado com sucesso
- [ ] Arquivos de config copiados para raiz
- [ ] Estrutura de pastas criada em `src/`
- [ ] Componentes copiados para suas pastas
- [ ] Tailwind funcionando
- [ ] `npm run dev` executa sem erros
- [ ] Aplicação visível em http://localhost:3000
- [ ] Clima de São Paulo aparece
- [ ] Busca de cidades funciona

---

## 🎓 Próximos Passos

### Entrega 1 Completa? 
Parabéns! Agora você pode:
- [ ] Fazer screenshots para documentação
- [ ] Testar em mobile
- [ ] Melhorar o CSS se desejar
- [ ] Preparar apresentação

### Pronto para Entrega 2?
- [ ] Criar projeto Spring Boot
- [ ] Integrar OpenWeatherMap API
- [ ] Criar endpoints REST
- [ ] Conectar front com back

---

## 💡 Dicas Extras

### VS Code Extensions Recomendadas
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Vue Plugin (Volar)**
- **Prettier - Code formatter**

### Comandos Úteis
```bash
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Verificar erros de código
npm run type-check # Checar tipos TypeScript
```

### Variáveis de Ambiente
Se precisar integrar um backend futuro, use `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=30000
```

Acesse em componentes:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 📞 Suporte

Se tiver problemas:
1. Verifique este guia
2. Procure a solução no [Troubleshooting](#-troubleshooting)
3. Consulte os docs: [Vite](https://vitejs.dev/), [React](https://react.dev/), [Tailwind](https://tailwindcss.com/)

---

**Boa sorte! 🚀**
