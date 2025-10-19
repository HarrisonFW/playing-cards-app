# Digital Playing Cards Application

A flexible, intuitive web-based playing cards platform that combines the freedom of physical card manipulation with the convenience of digital gaming.

## Features

- **Freeform Mode**: Play any card game with flexible drag-and-drop card manipulation
- **Built-in Games**: Snap and Blackjack with automatic rule enforcement
- **Smooth Interactions**: Intuitive drag-and-drop, card flipping, and animations
- **Local Multiplayer**: 2-player support for all game modes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Rendering**: HTML5 Canvas (Konva.js)
- **State Management**: Redux Toolkit
- **Animations**: GSAP (GreenSock)
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **DevOps**: Docker + GitHub Actions

## Project Status

Currently in **Phase 0: Setup & Foundation**

See [TASKS.md](./TASKS.md) for detailed task tracking and [PLANNING.md](./PLANNING.md) for architecture and technical decisions.

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (optional, but recommended)
- Git

### Development Setup

#### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd playing-cards-app

# Start development environment
docker-compose up dev
```

#### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd playing-cards-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## Project Structure

```
playing-cards-app/
├── src/
│   ├── components/      # React components
│   ├── game-logic/      # Game rules and engines
│   ├── state/           # Redux store and slices
│   ├── rendering/       # Canvas rendering
│   └── utils/           # Helper functions
├── tests/               # Test files
├── docker/              # Docker configuration
├── public/              # Static assets
└── docs/                # Documentation
```

## Documentation

- [PLANNING.md](./PLANNING.md) - Architecture, technical decisions, and development roadmap
- [TASKS.md](./TASKS.md) - Task tracker with priorities and status
- [CLAUDE.md](./CLAUDE.md) - Guidelines for AI assistant collaboration
- [PRD.md.txt](./PRD.md.txt) - Product Requirements Document

## Development Workflow

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests: `npm run test`
4. Lint and format: `npm run lint && npm run format`
5. Commit with conventional commits (e.g., `feat:`, `fix:`, `docs:`)
6. Push and create a Pull Request to `develop`

## Contributing

Contributions are welcome! Please read our contributing guidelines (coming soon) before submitting PRs.

## License

TBD

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with React + TypeScript + Canvas**
