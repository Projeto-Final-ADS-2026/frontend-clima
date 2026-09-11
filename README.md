# 🌤️ App de Clima Detalhado

Projeto acadêmico de 4 entregas: aplicação web de previsão do tempo detalhada com frontend React + TypeScript, backend Java Spring Boot e banco de dados MySQL.

## 📋 Sobre o Projeto

Este é um projeto de aprendizado que demonstra a progressão de uma aplicação web de zero até uma solução completa:

- **Entrega 1:** Interface visual com dados mockados ✅
- **Entrega 2:** Backend com API real
- **Entrega 3:** Banco de dados e histórico
- **Entrega 4:** Autenticação, alertas e comparação

## 🚀 Tecnologias

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (rápido!)
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icons
- **Node.js** - Runtime

### Backend (Próximas Entregas)
- **Java 17+**
- **Spring Boot 3**
- **Spring Data JPA**
- **MySQL 8**

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Setup

```bash
# Clonar ou copiar o projeto
cd app-de-clima

# Instalar dependências
npm install

# Criar arquivo .env.local (opcional)
cp .env.example .env.local

# Rodar em desenvolvimento
npm run dev

# A aplicação abrirá em http://localhost:3000
```

## 📂 Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── SearchBar.tsx     # Buscador de cidades
│   ├── CurrentWeather.tsx # Clima atual (destaque)
│   ├── WeatherDetails.tsx # Grid de detalhes
│   └── ForecastChart.tsx  # Previsão 5 dias
├── pages/                # Páginas da aplicação
│   └── Home.tsx          # Página principal
├── services/             # Lógica de negócio
│   └── mockWeatherData.ts # Dados simulados
├── types/                # Tipos TypeScript
│   └── weather.ts        # Interfaces
├── App.tsx              # Componente raiz
├── App.css              # Estilos customizados
├── main.tsx             # Entry point
└── index.css            # Estilos globais
```

## 🎨 Design

### Paleta de Cores
- **Teal (#0F766E)** - Primária, céu
- **Amber (#FCA311)** - Sol, quente
- **Slate** - Textos, neutro

### Tipografia
- **Font:** Inter
- **Hierarquia:** Display 7xl, H2 2xl, Body md

### Componentes Visuais
- Cards com border sutil e shadow mínimo
- Ícones do Lucide React coloridos
- Barra de temperatura com gradient
- Loading spinner customizado
- Responsivo (mobile-first)

## 🎯 Features da Entrega 1

✅ Busca de cidades (simulada)  
✅ Clima atual em grande destaque  
✅ 6 detalhes expandidos (umidade, vento, pressão, UV, visibilidade, nuvens)  
✅ Previsão de 5 dias com gráfico de temperatura  
✅ Design responsivo (mobile, tablet, desktop)  
✅ Loading states e error handling  
✅ Tipagem completa TypeScript  
✅ Acessibilidade básica  

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor Vite em http://localhost:3000

# Build & Preview
npm run build        # Cria build otimizado
npm run preview      # Preview do build

# Linting & Type Check
npm run lint         # ESLint
npm run type-check   # TypeScript type check

# Format (opcional)
npm run format       # Prettier (se configurado)
```

## 📊 Próximas Entregas

### Entrega 2: Backend & API
- [ ] Criar projeto Spring Boot
- [ ] Integrar OpenWeatherMap API
- [ ] Endpoints REST para clima
- [ ] CORS configurado
- [ ] Swagger/OpenAPI docs

### Entrega 3: Banco de Dados
- [ ] Criar schema MySQL
- [ ] Entity mapping JPA
- [ ] Histórico de buscas
- [ ] Favoritos de cidades
- [ ] Gráfico de tendência de temperatura

### Entrega 4: Funcionalidades Avançadas
- [ ] Autenticação JWT
- [ ] Alertas customizados
- [ ] Comparação entre cidades
- [ ] Notificações
- [ ] Dashboard personalizado
- [ ] Deploy em produção

## 🌐 APIs Utilizadas

*Entrega 1:* Dados mockados localmente

**Entrega 2 em diante:**
- [OpenWeatherMap API](https://openweathermap.org/api) - Dados de clima em tempo real
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - Localização do usuário

## 🧪 Testes

*A adicionar nas próximas entregas*

```bash
# Testes unitários
npm run test

# Cobertura
npm run test:coverage
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` baseado em `.env.example`:

```env
# API
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=30000

# Features
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_ANALYTICS=false

# Environment
VITE_ENVIRONMENT=development
```

## 🐛 Troubleshooting

### Porta 3000 já está em uso
```bash
# Mudar a porta no vite.config.ts
server: {
  port: 3001,
}
```

### Tailwind não está funcionando
```bash
# Limpar cache
rm -rf node_modules/.vite
npm run dev
```

### TypeScript errors
```bash
npm run type-check
```

## 📚 Recursos & Referências

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## 👨‍💻 Autor

Hiago - Desenvolvedor Salesforce → Engenheiro de Software  
Projeto acadêmico da Faculdade Impacta

## 📄 Licença

MIT

## 🤝 Contribuições

Sugestões e feedback são bem-vindos!

---

**Status:** Entrega 1 ✅ | Entrega 2 ⏳ | Entrega 3 ⏳ | Entrega 4 ⏳
