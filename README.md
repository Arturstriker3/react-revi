# React App - Clean Architecture

A React application built with TypeScript, Ant Design, Zustand, Vite, and React Router following Clean Architecture principles.

## Architecture

The project follows a layered architecture pattern:

- **Domain Layer**: Entities, Value Objects, Repository Interfaces
- **Application Layer**: Use Cases, DTOs, Presenters
- **Infrastructure Layer**: Repository implementations (LocalStorage)
- **Presentation Layer**: React components, Zustand stores

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Ant Design** for UI components
- **React Router** for navigation
- **Zustand** for state management
- **LocalStorage** for data persistence
- **Vitest** for testing
- **pnpm** for package management

## Prerequisites

- Node.js 18+
- pnpm 8+ (recommended for faster installs)

### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm

# Using corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

## Getting Started

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm test:run` - Run tests once
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm clean` - Clean node_modules and cache
- `pnpm reinstall` - Clean and reinstall dependencies

## Project Structure

```
src/
├── domain/                 # Domain Layer
│   ├── entities/          # Business entities
│   └── repositories/      # Repository interfaces
├── application/           # Application Layer
│   ├── dtos/             # Data Transfer Objects
│   └── use-cases/        # Business use cases
├── infrastructure/        # Infrastructure Layer
│   └── repositories/     # Repository implementations
└── presentation/         # Presentation Layer
    ├── components/       # React components
    ├── pages/           # Page components
    ├── stores/          # Zustand stores
    └── styles/          # Global styles
└── test/                # Test files
    ├── setup.ts         # Test setup
    ├── utils/           # Test utilities
    └── examples/        # Example tests
```

## Features

- ✅ Task management (Create, Read, Update, Delete)
- ✅ Local storage persistence
- ✅ Clean Architecture implementation
- ✅ TypeScript with strict mode
- ✅ Responsive design with Ant Design
- ✅ Navigation with React Router
- ✅ State management with Zustand
- ✅ Dashboard with statistics
- ✅ Component examples
- ✅ Testing setup with Vitest
- ✅ Fast package management with pnpm

## Pages

- **Home**: Welcome page with project overview
- **Task Manager**: CRUD operations for tasks
- **Dashboard**: Project statistics and recent activity
- **Components**: Ant Design component examples

## Testing

The project includes a complete testing setup with:

- **Vitest** as the test runner
- **React Testing Library** for component testing
- **jsdom** for DOM simulation
- **Coverage reporting** with v8
- **Custom test utilities** with providers

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

- `src/test/setup.ts` - Global test setup
- `src/test/utils/test-utils.tsx` - Custom render with providers
- `src/test/examples/` - Example tests for components and use cases

## Why pnpm?

- **Faster**: Up to 2x faster than npm and yarn
- **Disk space efficient**: Uses hard links and symlinks
- **Strict**: Prevents phantom dependencies
- **Monorepo support**: Built-in workspace support
- **Security**: Better dependency resolution

## Architecture Benefits

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Business logic is isolated and easily testable
- **Maintainability**: Clear boundaries between layers
- **Scalability**: Easy to add new features or change implementations
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## Ant Design Components Used

- Layout (Header, Sider, Content)
- Navigation (Menu)
- Data Display (Card, List, Table, Statistic, Progress)
- Form Controls (Input, Button, Select, DatePicker, Checkbox)
- Feedback (Message, Alert, Modal, Spin)
- Typography (Title, Text)
- And many more...
