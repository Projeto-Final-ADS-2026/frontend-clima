# App de Clima - Entrega 1 - Guia Completo

## 📋 O que foi criado

Projeto completo de **design visual** para primeira entrega, com:
- ✅ Clima atual em grande destaque
- ✅ Busca de cidades
- ✅ Detalhes expandidos (umidade, vento, pressão, UV, etc)
- ✅ Gráfico de previsão 5 dias
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Dados mockados para demonstração

---

## 🛠️ Setup do Projeto

### 1. Estrutura de Pastas

```
seu-projeto/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── WeatherDetails.tsx
│   │   └── ForecastChart.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── services/
│   │   └── mockWeatherData.ts
│   ├── types/
│   │   └── weather.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

### 2. Dependências Necessárias

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npm install -D recharts
```

### 3. Configurar Tailwind

**tailwind.config.js:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Arquivo HTML Principal

**index.html:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App de Clima Detalhado</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🎯 Arquivos Criados

### Types
- **weather.ts** - Interfaces TypeScript para WeatherData, ForecastDay, etc

### Services
- **mockWeatherData.ts** - Dados simulados de 4 cidades brasileiras com função de busca

### Componentes
- **SearchBar.tsx** - Buscador com sugestões rápidas
- **CurrentWeather.tsx** - Clima atual dominante com ícones
- **WeatherDetails.tsx** - Grid de 6 detalhes (vento, pressão, UV, etc)
- **ForecastChart.tsx** - Previsão 5 dias com barras de temperatura

### Páginas
- **Home.tsx** - Composição principal, gerencia estado

### Config
- **App.tsx** - Componente raiz
- **App.css** - Estilos customizados
- **main.tsx** - Entry point
- **index.css** - Estilos globais Tailwind

---

## 🎨 Design Decisions

### Paleta de Cores
- **Teal (#0F766E)** - Cor primária (confiança, céu)
- **Amber (#FCA311)** - Sol/quente
- **Slate** - Textos neutros
- Gradientes sutis de azul/teal

### Typography
- **Font:** Inter (moderna, limpa)
- **Display:** 700 bold (títulos)
- **Body:** 400 regular (conteúdo)
- Não usa caps, mantém sentence case

### Layout
- **Hero dominante:** Temperatura em 7xl
- **Cards sem exagero:** Apenas border-slate-200
- **Responsivo:** Grid que funciona em mobile
- **Espaçamento:** Generoso (padding/margin)

### Interações
- Loading spinner durante busca
- Hover subtle em cards
- Focus visible para accessibility
- Transições suaves

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview de produção
npm run preview
```

---

## 📱 Responsividade

- **Mobile (< 640px):** Stack vertical, grid 2 colunas
- **Tablet (640px - 1024px):** 2-3 colunas
- **Desktop (> 1024px):** 3-4 colunas, max-width 6xl

---

## 🔄 Próximas Entregas

### Entrega 2: Backend + API Real
- Criar Spring Boot backend
- Integrar OpenWeatherMap API
- Substituir mockData por chamadas HTTP

### Entrega 3: Banco de Dados
- Criar MySQL com histórico
- Salvar buscas do usuário
- Gráfico de tendência de temperatura

### Entrega 4: Funcionalidades Avançadas
- Autenticação de usuários
- Alertas customizados
- Comparação entre cidades
- Caching

---

## 💡 Dicas de Desenvolvimento

✅ **Use as cidades padrão:** São Paulo, Rio, Curitiba, Manaus  
✅ **Os ícones vêm do lucide-react:** Todos os ícones estão prontos  
✅ **Dados estão em mockWeatherData.ts:** Fácil trocar depois  
✅ **TypeScript completo:** Toda tipagem já está feita  
✅ **Tailwind já configurado:** Use classes diretamente  

---

## 📸 Preview Visual

O app exibe:
1. **Header sticky** com busca e sugestões rápidas
2. **Clima atual** com temperatura grande, ícone grande, sensação térmica
3. **4 detalhes rápidos** abaixo (umidade, vento, pressão, visibilidade)
4. **6 cards de detalhes** com ícones coloridos
5. **Previsão 5 dias** com barras visuais de temperatura, precipitação, vento
6. **Tudo responsivo** e com bom contraste

---

Tudo pronto! Basta copiar os arquivos para suas pastas `src/` e executar `npm run dev`. 🎉
