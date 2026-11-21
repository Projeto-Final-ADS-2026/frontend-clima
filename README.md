# 🌤️ App de Clima Detalhado — Frontend

Frontend em React + TypeScript do projeto **App de Clima Detalhado**, projeto acadêmico de 4 entregas. Ele mostra o clima atual de qualquer cidade, guarda histórico e favoritos por usuário e exige login.

O backend (Java/Spring Boot + MySQL) está em outro repositório: [`back-end-clima`](https://github.com/Projeto-Final-ADS-2026/back-end-clima).

## 📋 Entregas

| Entrega | Tema | Status |
|---|---|---|
| 1 | Interface visual com dados mockados | ✅ |
| 2 | Backend com API real | ✅ |
| 3 | Banco de dados, histórico e favoritos | ✅ |
| 4 | Funcionalidades avançadas | 🚧 Só a autenticação JWT foi feita |

### Entrega 1: interface
- Busca de cidades, clima atual em destaque e 6 cards de detalhes (umidade, vento, pressão, UV, visibilidade, nuvens)
- Previsão de 5 dias com gráfico de temperatura
- Design responsivo (mobile, tablet e desktop), estados de carregamento e erro, tipagem completa

### Entrega 2: API real
- O clima passa a vir do backend, que consulta o OpenWeatherMap (`GET /api/clima/{cidade}`)

### Entrega 3: histórico e favoritos
- Histórico das últimas buscas, com opção de limpar
- Favoritos pela estrela no clima atual, com lista para selecionar e remover
- Gráfico de tendência de temperatura por cidade, montado a partir do histórico
- Persistência no MySQL pelo backend; falhas nessas chamadas não bloqueiam a busca de clima

### Entrega 4: autenticação (parcial)
- Telas de **cadastro** e **login**
- Rotas protegidas: sem sessão válida, o usuário é levado para `/login`
- Sessão mantida ao recarregar a página (token JWT no `localStorage`, validado em `/api/auth/me`)
- Botão **Sair** e saudação com o nome do usuário
- Favoritos e histórico **por usuário**
- Logout automático só quando o servidor confirma que o token é inválido ou expirou. Um 401 isolado, por exemplo causado por um erro do servidor, não derruba a sessão

**Ainda não existem:** alertas customizados, comparação entre cidades, notificações, dashboard personalizado e deploy em produção.

## 🚀 Tecnologias
- **React 18** e **TypeScript 5**
- **Vite 5** (build e servidor de desenvolvimento)
- **Tailwind CSS 3**
- **React Router 6**
- **Lucide React** (ícones)
- Node.js 18+ e npm

## 📦 Como rodar

### Pré-requisitos
- Node.js 18 ou superior
- O backend rodando (veja o README do `back-end-clima`)

### Passo a passo
```bash
# Instalar dependências
npm install

# (opcional) variáveis de ambiente
cp .env.example .env.local

# Rodar em desenvolvimento
npm run dev
```
A aplicação abre em `http://localhost:3000`. O backend precisa estar em `http://localhost:8080`. A origem `http://localhost:3000` já vem liberada no CORS dele; para outra porta ou domínio, defina `CORS_ALLOWED_ORIGINS` no backend.

### Primeiro acesso
1. Abra `http://localhost:3000`. Sem sessão, você cai em `/login`.
2. Clique em **Cadastre-se**, crie a conta (senha com 6 ou mais caracteres) e você já entra logado.
3. Busque uma cidade e favorite com a estrela.

## 📝 Variáveis de ambiente
Só uma variável é usada pelo código:

```env
VITE_API_BASE_URL=http://localhost:8080
```

O `.env.example` traz outras chaves (`VITE_API_TIMEOUT`, `VITE_ENABLE_MOCK_DATA` etc.) que ainda não têm efeito. Arquivos `.env.local` não vão para o Git.

## 🔧 Scripts
```bash
npm run dev          # Servidor de desenvolvimento em http://localhost:3000
npm run build        # Type-check + build de produção em dist/
npm run preview      # Serve o build localmente
npm run lint         # ESLint
npm run type-check   # TypeScript sem gerar arquivos
```
Não há testes automatizados no frontend.

## 📂 Estrutura
```
src/
├── components/
│   ├── SearchBar.tsx        # Buscador de cidades
│   ├── CurrentWeather.tsx   # Clima atual, com a estrela de favorito
│   ├── WeatherDetails.tsx   # Grid de detalhes
│   ├── ForecastChart.tsx    # Previsão de 5 dias
│   ├── SearchHistory.tsx    # Histórico de buscas
│   ├── FavoritesList.tsx    # Cidades favoritas
│   ├── TemperatureTrend.tsx # Tendência de temperatura
│   └── ProtectedRoute.tsx   # Bloqueia rotas sem login
├── context/
│   └── AuthContext.tsx      # Usuário logado, login, cadastro e logout
├── pages/
│   ├── Home.tsx             # Página principal (protegida)
│   ├── Login.tsx / Register.tsx
│   └── AuthForm.tsx         # Formulário compartilhado de login e cadastro
├── services/
│   ├── http.ts              # Cliente HTTP único: envia o token e trata sessão expirada
│   ├── authApi.ts           # Login, cadastro e /me
│   ├── historyApi.ts        # Histórico, tendência e favoritos
│   ├── tokenStorage.ts      # Token no localStorage
│   └── mockWeatherData.ts   # Chamada de clima e dados simulados da previsão
├── types/                   # weather.ts, history.ts, auth.ts
├── App.tsx                  # Rotas
└── main.tsx                 # Entry point
```

### Rotas
| Rota | Acesso |
|---|---|
| `/login`, `/register` | Público (quem já está logado vai para `/`) |
| `/` | Exige login |

## 🌐 API do backend
Base: `VITE_API_BASE_URL` (padrão `http://localhost:8080`). Todas as rotas abaixo, exceto as de `auth`, exigem o header `Authorization: Bearer <token>`, que o `http.ts` envia sozinho.

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cria conta |
| POST | `/api/auth/login` | Entra e recebe o token |
| GET | `/api/auth/me` | Usuário do token atual |
| GET | `/api/clima/{cidade}` | Clima atual da cidade |
| GET | `/api/historico?limite=10` | Últimas buscas |
| DELETE | `/api/historico` | Limpa o histórico |
| GET | `/api/historico/tendencia/{cidade}?limite=20` | Pontos do gráfico de tendência |
| GET | `/api/favoritos` | Lista favoritos |
| POST | `/api/favoritos` | Adiciona favorito (`{ cityName, country }`) |
| DELETE | `/api/favoritos/{id}` | Remove favorito |

## 📝 Limitações conhecidas
- A **previsão de 5 dias, o índice UV, a cobertura de nuvens e a direção do vento** ainda são dados simulados. A API só fornece o clima atual.
- O token fica no `localStorage`, o que é simples, mas fica exposto a ataques de XSS.

## 🐛 Troubleshooting
- **Erro de CORS no navegador:** confirme que a origem do frontend está em `CORS_ALLOWED_ORIGINS` no backend (`http://localhost:3000` já vem por padrão) e reinicie-o.
- **Volta para o login:** o token foi rejeitado. Verifique se o `JWT_SECRET` do backend não mudou desde o último login e se ele não expirou (24 horas).
- **Porta 3000 em uso:** troque `server.port` em `vite.config.ts` e ajuste o CORS do backend.
- **`npm run build` falha por `terser`:** rode `npm install`, ele está nas dependências de desenvolvimento.

## 👨‍💻 Autor
Hiago — projeto acadêmico da Faculdade Impacta.

## 📄 Licença
MIT
