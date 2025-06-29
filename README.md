# Monster Battle App

Uma aplicação React para batalhas de monstros com uma interface moderna e interativa.

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- Ant Design
- Framer Motion
- Zustand
- TailwindCSS
- Docker

## 📋 Pré-requisitos

Para rodar localmente você precisa ter instalado:

- Node.js (v18 ou superior)
- pnpm
- Docker (opcional)

## 🛠️ Instalação e Execução Local

1. Clone o repositório:

```bash
git clone [url-do-repositorio]
cd react-app
```

2. Instale as dependências:

```bash
pnpm install
```

3. Execute o projeto em modo desenvolvimento:

```bash
pnpm dev
```

4. Para build de produção:

```bash
pnpm build
pnpm preview
```

## 🐳 Executando com Docker

1. Build da imagem:

```bash
docker-compose build
```

2. Iniciar o container:

```bash
docker-compose up -d
```

3. Para parar o container:

```bash
docker-compose down
```

A aplicação estará disponível em:

- Local: http://localhost:80

## 🏗️ Estrutura do Projeto

```
src/
├── application/     # Casos de uso e DTOs
├── domain/         # Entidades e interfaces
├── infrastructure/ # Implementações concretas
└── presentation/   # Componentes React e UI
    ├── components/
    ├── pages/
    ├── stores/
    └── styles/
```
