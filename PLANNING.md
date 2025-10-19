# PLANNING.md - Digital Playing Cards Application

## 📋 Document Overview

This document contains the technical planning, architecture decisions, and development roadmap for the Digital Playing Cards Application. This should be read at the start of every new development session.

**Last Updated**: 2025-10-19  
**Project Status**: Planning Phase  
**Current Phase**: Phase 0 - Setup & Foundation

---

## 🎯 Vision & Goals

### Project Vision

Create an intuitive, flexible digital playing cards platform that combines the freedom of physical card manipulation with the convenience and rule enforcement of digital gaming.

### Core Principles

1. **Flexibility First**: Any card game should be playable through the freeform mode
2. **Intuitive Interaction**: Drag-and-drop should feel natural and responsive
3. **Visual Clarity**: Cards and game state must always be clear and readable
4. **Performance**: 60fps animations and instant feedback on all interactions
5. **Extensibility**: Easy to add new games and features

### Success Metrics

- Users can play a complete game of Snap or Blackjack within 2 minutes of first use
- Card drag operations maintain 60fps
- Zero critical bugs in game rule enforcement
- 90%+ user satisfaction on interface intuitiveness

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   UI Shell   │  │  Game Views  │  │ Card Renderer│  │
│  │  (Layout)    │  │ (Snap/BJ/FF) │  │   (Canvas)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Game Engine  │  │State Manager │  │Event Handler │  │
│  │ (Rules Logic)│  │   (Redux)    │  │(User Input)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────┐
│                      Domain Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Card Model  │  │  Deck Model  │  │  Game Models │  │
│  │              │  │              │  │ (Snap/BJ/FF) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/           # React components (Presentation)
│   ├── common/
│   │   ├── Card.tsx           # Single card component
│   │   ├── Deck.tsx           # Deck pile component
│   │   ├── CardPile.tsx       # Generic card stack
│   │   ├── PlayArea.tsx       # Main play surface
│   │   └── GameControls.tsx   # Buttons and controls
│   ├── games/
│   │   ├── SnapGame.tsx       # Snap game UI
│   │   ├── BlackjackGame.tsx  # Blackjack game UI
│   │   └── FreeformGame.tsx   # Freeform mode UI
│   └── layout/
│       ├── AppShell.tsx       # Main app container
│       ├── GameSelector.tsx   # Mode selection
│       └── PlayerZone.tsx     # Player-specific areas
│
├── game-logic/          # Core game rules (Domain)
│   ├── models/
│   │   ├── Card.ts            # Card data structure
│   │   ├── Deck.ts            # Deck operations
│   │   └── GameState.ts       # Game state types
│   ├── engines/
│   │   ├── SnapEngine.ts      # Snap rules
│   │   ├── BlackjackEngine.ts # Blackjack rules
│   │   └── BaseGameEngine.ts  # Shared game logic
│   └── validators/
│       ├── MoveValidator.ts   # Validate card moves
│       └── RuleValidator.ts   # Validate game rules
│
├── state/               # State management (Application)
│   ├── store.ts              # Redux store configuration
│   ├── slices/
│   │   ├── deckSlice.ts      # Deck state
│   │   ├── gameSlice.ts      # Current game state
│   │   └── uiSlice.ts        # UI state (selections, etc.)
│   └── hooks/
│       ├── useDrag.ts        # Drag-and-drop hook
│       └── useGameActions.ts # Game action hooks
│
├── rendering/           # Graphics rendering
│   ├── CardRenderer.ts       # Canvas-based card drawing
│   ├── AnimationEngine.ts    # Animation system
│   └── assets/
│       ├── card-designs/     # Card face designs
│       └── card-back.svg     # Card back design
│
├── utils/               # Utilities
│   ├── cardUtils.ts          # Card helper functions
│   ├── shuffleAlgorithm.ts   # Fisher-Yates shuffle
│   ├── collisionDetection.ts # Drop zone detection
│   └── constants.ts          # App-wide constants
│
└── App.tsx              # Root application component
```

---

## 🛠️ Technology Stack

### Recommended Stack

#### **Frontend Framework: React 18+ with TypeScript**

**Why React + TypeScript:**

- **Component-based**: Perfect for card/game component architecture
- **Virtual DOM**: Efficient updates for card movements
- **Large ecosystem**: Rich library support (drag-and-drop, animations)
- **TypeScript**: Type safety for game rules and card state
- **Hooks**: Clean state management and side effects
- **Developer tools**: Excellent debugging experience

**Alternatives Considered:**

- ❌ Vue.js: Good, but smaller ecosystem for game development
- ❌ Vanilla JavaScript: Too much boilerplate for complex state
- ❌ Svelte: Less mature ecosystem, fewer libraries

#### **Graphics Rendering: HTML5 Canvas API**

**Why Canvas:**

- **Performance**: Hardware-accelerated rendering for 52+ cards
- **Flexibility**: Full control over card drawing and animations
- **Standard**: Native browser support, no dependencies
- **Smooth animations**: RequestAnimationFrame integration
- **Image handling**: Easy sprite/texture management

**Implementation:**

- Use Canvas for card rendering
- React components as wrapper/controllers
- Konva.js library for advanced canvas management

**Alternatives Considered:**

- ❌ SVG: Good for scalability, but slower with many elements
- ❌ WebGL: Overkill for 2D cards, steep learning curve
- ❌ CSS-only: Limited animation control, performance issues

#### **State Management: Redux Toolkit**

**Why Redux Toolkit:**

- **Predictable state**: Single source of truth for game state
- **Time-travel debugging**: Useful for testing game logic
- **Middleware**: Easy to add game rule validation
- **DevTools**: Excellent debugging for complex game states
- **TypeScript support**: Full type inference

#### **Drag-and-Drop: React DnD + Custom Canvas Handling**

**Why React DnD + Custom:**

- **React DnD**: Handle DOM-based drop zones and logic
- **Custom Canvas**: Handle card dragging on canvas for performance
- **Touch support**: Both mouse and touch events

#### **Animation: GSAP (GreenSock)**

**Why GSAP:**

- **Performance**: Industry-leading animation performance
- **Flexibility**: Complex animation sequences
- **Ease functions**: Professional motion curves
- **Timeline control**: Coordinate multiple card animations

#### **Build Tool: Vite**

**Why Vite:**

- **Fast**: Lightning-fast HMR and builds
- **Modern**: Native ESM support
- **TypeScript**: First-class TypeScript support
- **Optimized**: Automatic code splitting and optimization

#### **Testing: Vitest + React Testing Library**

**Why Vitest:**

- **Fast**: Blazing fast test execution
- **Vite integration**: Same config as build tool
- **Jest compatible**: Familiar API

**React Testing Library:**

- **User-centric**: Test user interactions, not implementation
- **Best practices**: Encourages accessible components

#### **Code Quality: ESLint + Prettier**

**Standard tools for consistent code quality**

---

## 🐳 Development Environment & DevOps

### Version Control: Git + GitHub

#### Repository Structure

```
playing-cards-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml           # Continuous Integration
│   │   ├── cd.yml           # Continuous Deployment
│   │   └── code-quality.yml # Linting and testing
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── src/                      # Application source
├── public/                   # Static assets
├── tests/                    # Test files
├── docker/                   # Docker configurations
│   ├── Dockerfile.dev       # Development container
│   ├── Dockerfile.prod      # Production container
│   └── docker-compose.yml   # Multi-container orchestration
├── docs/                     # Additional documentation
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── CLAUDE.md                # AI assistant guidelines
├── PLANNING.md              # This file
├── TASKS.md                 # Task tracker
├── Playing_Cards_PRD.md     # Requirements
└── README.md                # Project overview
```

#### Git Workflow (GitHub Flow)

**Branch Strategy:**

```
main (production-ready)
  ├── develop (integration branch)
  │   ├── feature/card-rendering
  │   ├── feature/snap-game
  │   ├── feature/blackjack-game
  │   ├── bugfix/drag-touch-issue
  │   └── refactor/state-management
```

**Commit Convention (Conventional Commits):**

```
feat: add card flip animation
fix: resolve touch drag on mobile
docs: update architecture diagrams
style: format code with prettier
refactor: extract card utilities
test: add blackjack engine tests
chore: update dependencies
```

**Pull Request Process:**

1. Create feature branch from `develop`
2. Make changes and commit with conventional commits
3. Push branch and create PR to `develop`
4. Automated CI runs (tests, linting)
5. Code review by maintainer
6. Merge to `develop` when approved
7. Periodic releases from `develop` to `main`

#### GitHub Actions CI/CD

**Continuous Integration (.github/workflows/ci.yml):**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

**Continuous Deployment (.github/workflows/cd.yml):**

```yaml
name: CD

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        # Build and deploy to production
```

### Docker Configuration

#### Development Environment (Dockerfile.dev)

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
```

#### Production Environment (Dockerfile.prod)

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose (docker-compose.yml)

```yaml
version: '3.8'

services:
  # Development server
  dev:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    ports:
      - '5173:5173'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev -- --host

  # Production server
  prod:
    build:
      context: .
      dockerfile: docker/Dockerfile.prod
    ports:
      - '8080:80'
    environment:
      - NODE_ENV=production

  # Testing environment
  test:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run test
```

#### Docker Commands Reference

**Development:**

```bash
# Start development environment
docker-compose up dev

# Run tests in container
docker-compose run test

# Access container shell
docker-compose exec dev sh

# Rebuild after dependency changes
docker-compose up --build dev

# Stop all containers
docker-compose down
```

**Production:**

```bash
# Build production image
docker build -f docker/Dockerfile.prod -t playing-cards-app:latest .

# Run production container
docker run -p 8080:80 playing-cards-app:latest

# Using docker-compose
docker-compose up prod
```

### Development Workflow Integration

#### Daily Development Flow:

```bash
# 1. Start development environment
docker-compose up dev

# 2. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# 3. Make changes (files are synced via volume mount)
# Edit files in your IDE

# 4. Test changes
docker-compose run test

# 5. Commit changes
git add .
git commit -m "feat: add new feature"

# 6. Push and create PR
git push origin feature/new-feature
# Create PR on GitHub to merge into develop
```

#### When to Use Docker vs Local:

**Use Docker When:**

- ✅ Setting up project first time (consistent environment)
- ✅ Running tests (isolated environment)
- ✅ Deploying to production
- ✅ Working in a team (same environment for everyone)
- ✅ CI/CD pipelines

**Use Local When:**

- ✅ Quick edits and iterations (faster HMR)
- ✅ Debugging with browser DevTools
- ✅ Learning/experimenting (simpler setup)

**Hybrid Approach (Recommended):**

- Develop locally for speed: `npm run dev`
- Test in Docker before committing: `docker-compose run test`
- Production deployment always uses Docker

---

## 📦 Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "konva": "^9.2.0",
    "react-konva": "^18.2.0",
    "gsap": "^3.12.0",
    "react-dnd": "^16.0.0",
    "react-dnd-html5-backend": "^16.0.0",
    "react-dnd-touch-backend": "^16.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 🎨 Design Patterns & Best Practices

### State Management Pattern

**Redux Slices Structure:**

```typescript
// deckSlice.ts
interface DeckState {
  cards: Card[]
  drawPile: string[] // Card IDs
  discardPile: string[]
  shuffled: boolean
}

// gameSlice.ts
interface GameState {
  mode: 'snap' | 'blackjack' | 'freeform'
  currentPlayer: 1 | 2
  player1: PlayerState
  player2: PlayerState
  winner: number | null
}
```

**Action Naming:**

- Use past tense: `cardMoved`, `deckShuffled`, `gameStarted`
- Namespace by slice: `deck/shuffled`, `game/playerChanged`

### Component Pattern

**Container/Presentational Pattern:**

```typescript
// Container (Smart Component)
function SnapGameContainer() {
  const gameState = useSelector(selectSnapGame);
  const dispatch = useDispatch();

  return <SnapGame state={gameState} onAction={dispatch} />;
}

// Presentational (Dumb Component)
function SnapGame({ state, onAction }: SnapGameProps) {
  return (
    <div>
      {/* Pure UI rendering */}
    </div>
  );
}
```

### Card Rendering Strategy

**Canvas Rendering Pattern:**

```typescript
class CardRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private cardImages: Map<string, HTMLImageElement>

  // Render all visible cards in one pass
  renderCards(cards: CardState[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    cards.forEach((card) => {
      if (card.faceUp) {
        this.drawCardFace(card)
      } else {
        this.drawCardBack(card)
      }
    })
  }

  // Use sprite sheet for performance
  private drawCardFace(card: CardState) {
    const sprite = this.cardImages.get(`${card.rank}_${card.suit}`)
    this.ctx.drawImage(sprite, card.x, card.y, card.width, card.height)
  }
}
```

### Game Engine Pattern

**Base Game Engine:**

```typescript
abstract class BaseGameEngine {
  abstract validateMove(move: Move): boolean
  abstract executeMove(move: Move): GameState
  abstract checkWinCondition(): Player | null

  // Shared functionality
  protected dealCards(count: number, player: Player): void {
    // Common dealing logic
  }
}

class SnapEngine extends BaseGameEngine {
  validateMove(move: Move): boolean {
    // Snap-specific validation
  }

  checkSnapMatch(card1: Card, card2: Card): boolean {
    return card1.rank === card2.rank
  }
}
```

### Performance Optimization Patterns

**Memoization:**

```typescript
// Memoize expensive calculations
const selectPlayerHand = createSelector(
  [selectCards, selectPlayerId],
  (cards, playerId) => cards.filter((c) => c.owner === playerId),
)

// Memoize components
const Card = React.memo(CardComponent, (prev, next) => {
  return prev.id === next.id && prev.position === next.position
})
```

**Virtual Scrolling (if needed for many cards):**

```typescript
// Only render cards in viewport
const VisibleCards = ({ cards, viewport }: Props) => {
  const visibleCards = useMemo(() => {
    return cards.filter(card => isInViewport(card, viewport));
  }, [cards, viewport]);

  return <>{visibleCards.map(card => <Card key={card.id} {...card} />)}</>;
};
```

---

## 🧪 Testing Strategy

### Testing Pyramid

```
      /\
     /  \    E2E Tests (Few)
    /____\   - Full game flows
   /      \
  /________\ Integration Tests (Some)
 /          \ - Component interactions
/____________\ Unit Tests (Many)
               - Game logic
               - Utilities
               - State reducers
```

### Test Categories

**Unit Tests (Vitest):**

- Game engines (Snap, Blackjack logic)
- Card utilities (shuffle, deal, etc.)
- Redux reducers and selectors
- Helper functions

**Integration Tests (React Testing Library):**

- Component interactions
- Drag-and-drop workflows
- Game flow sequences

**E2E Tests (Playwright - Future):**

- Complete game sessions
- Multi-player interactions
- Cross-browser testing

### Test Examples

**Game Logic Test:**

```typescript
describe('SnapEngine', () => {
  it('should detect matching ranks', () => {
    const engine = new SnapEngine()
    const card1 = { rank: 'King', suit: 'Hearts' }
    const card2 = { rank: 'King', suit: 'Spades' }

    expect(engine.checkSnapMatch(card1, card2)).toBe(true)
  })
})
```

**Component Test:**

```typescript
describe('Card Component', () => {
  it('should flip when double-clicked', async () => {
    const { getByTestId } = render(<Card id="1" faceUp={false} />);
    const card = getByTestId('card-1');

    await userEvent.dblClick(card);

    expect(card).toHaveAttribute('data-face-up', 'true');
  });
});
```

---

## 📊 Performance Targets

### Metrics & Goals

- **FPS during drag**: 60fps (16.67ms per frame)
- **Initial load time**: < 2 seconds
- **Card render time**: < 10ms for 52 cards
- **Animation smoothness**: No janking during transitions
- **Bundle size**: < 500KB (gzipped)
- **Memory usage**: < 50MB for full game session

### Monitoring Tools

- Chrome DevTools Performance tab
- React DevTools Profiler
- Bundle analyzer (webpack-bundle-analyzer)
- Lighthouse CI for performance scores

---

## 🔒 Security Considerations

### Client-Side Security

- **No sensitive data**: All game state is client-side only
- **Input validation**: Validate all user moves and inputs
- **XSS prevention**: React's built-in XSS protection
- **Dependency scanning**: Regular `npm audit` checks

### Future Considerations (Online Play)

- **Authentication**: OAuth 2.0 for user accounts
- **Authorization**: JWT tokens for API access
- **Rate limiting**: Prevent API abuse
- **Data encryption**: HTTPS for all communications

---

## 🚀 Deployment Strategy

### Hosting Options (Recommended: Static Hosting)

**Option 1: Vercel (Recommended)**

- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ GitHub integration
- ✅ Preview deployments for PRs

**Option 2: Netlify**

- ✅ Similar to Vercel
- ✅ Great for static sites
- ✅ Form handling (if needed)

**Option 3: GitHub Pages**

- ✅ Free for public repos
- ✅ Simple setup
- ❌ Limited build features

**Option 4: Self-Hosted (Docker)**

- ✅ Full control
- ✅ Use docker/Dockerfile.prod
- ❌ More maintenance

### Deployment Pipeline

**Production Deployment:**

```
1. Merge PR to main branch
2. GitHub Actions CI runs
   - Run tests
   - Run linting
   - Build production bundle
3. Build Docker image (optional)
4. Deploy to hosting platform
5. Run smoke tests
6. Monitor for errors
```

### Environment Variables

```env
# .env.development
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_APP_ENV=production
VITE_API_URL=https://api.playingcards.com
```

---

## 📝 Documentation Strategy

### Documentation Types

**Code Documentation:**

- TSDoc comments for complex functions
- README in each major directory
- Inline comments for non-obvious logic

**API Documentation (Future):**

- OpenAPI/Swagger for REST APIs
- GraphQL schema documentation

**User Documentation:**

- In-app tutorials
- Help section with game rules
- Keyboard shortcuts reference

---

## 🎯 Development Phases & Milestones

### Phase 0: Setup & Foundation (Week 1)

**Goal**: Development environment ready

- [x] Create project structure
- [ ] Set up Git repository on GitHub
- [ ] Configure Docker development environment
- [ ] Set up Vite + React + TypeScript
- [ ] Configure ESLint + Prettier
- [ ] Set up testing framework (Vitest)
- [ ] Create CI/CD pipeline (GitHub Actions)
- [ ] Initialize Redux store structure
- [ ] Create base component structure

**Milestone**: Can run `docker-compose up dev` and see "Hello World"

---

### Phase 1: Core Card System (Weeks 2-3)

**Goal**: Working deck and card interactions

**Week 2: Card Model & Rendering**

- [ ] Implement Card model (TypeScript interfaces)
- [ ] Implement Deck model with shuffle algorithm
- [ ] Set up Canvas rendering system
- [ ] Create card designs (or use card sprite sheet)
- [ ] Implement CardRenderer class
- [ ] Create Card component (React wrapper for canvas)
- [ ] Add flip animation
- [ ] Unit tests for card/deck logic

**Week 3: Drag & Drop System**

- [ ] Implement drag-and-drop system
  - [ ] Mouse event handlers
  - [ ] Touch event handlers
  - [ ] Drag preview rendering
- [ ] Create drop zones
- [ ] Implement collision detection
- [ ] Add visual feedback (hover states, drop indicators)
- [ ] Handle edge cases (drag out of bounds, invalid drops)
- [ ] Performance optimization (throttle events)
- [ ] Integration tests for drag-and-drop

**Milestone**: Can shuffle deck, drag cards around, flip cards

---

### Phase 2: Freeform Play Mode (Week 4)

**Goal**: Users can play any card game manually

- [ ] Create PlayArea component with zones
- [ ] Implement pile/stack management
- [ ] Add card fanning feature
- [ ] Create deck controls (shuffle, reset, collect all)
- [ ] Implement undo/redo for moves
- [ ] Add card counter displays
- [ ] Create player zones (Player 1, Player 2)
- [ ] Polish animations and transitions
- [ ] User testing and feedback
- [ ] Bug fixes

**Milestone**: Can set up and play a game of Poker manually

---

### Phase 3: Snap Game (Week 5)

**Goal**: Fully functional Snap game with AI

**Game Logic:**

- [ ] Create SnapEngine class
- [ ] Implement card dealing logic
- [ ] Implement turn-based play
- [ ] Implement match detection (same rank)
- [ ] Implement Snap button logic
- [ ] Handle correct/incorrect Snap calls
- [ ] Implement win condition (collect all cards)
- [ ] Unit tests for all game rules

**UI Implementation:**

- [ ] Create SnapGame component
- [ ] Display player deck counts
- [ ] Show central play pile
- [ ] Add Snap buttons for both players
- [ ] Show turn indicator
- [ ] Display winner announcement
- [ ] Add game restart functionality

**Polish:**

- [ ] Sound effects (card flip, snap, win)
- [ ] Animations (card dealing, pile collection)
- [ ] Visual feedback for Snap attempts
- [ ] Integration tests for full game flow

**Milestone**: Can play complete Snap game from start to finish

---

### Phase 4: Blackjack Game (Weeks 6-7)

**Goal**: Fully functional Blackjack game

**Week 6: Game Logic**

- [ ] Create BlackjackEngine class
- [ ] Implement card value calculation
  - [ ] Number cards (face value)
  - [ ] Face cards (10)
  - [ ] Ace logic (1 or 11, auto-optimize)
- [ ] Implement dealing logic (2 cards each, 1 dealer hidden)
- [ ] Implement Hit action
- [ ] Implement Stand action
- [ ] Implement dealer AI (hit on ≤16, stand on ≥17)
- [ ] Implement bust detection
- [ ] Implement Blackjack detection (21 with 2 cards)
- [ ] Implement win/loss/push determination
- [ ] Unit tests for all rules and edge cases

**Week 7: UI & Polish**

- [ ] Create BlackjackGame component
- [ ] Display player hand with value
- [ ] Display dealer hand (1 hidden card)
- [ ] Show current hand values
- [ ] Add Hit/Stand buttons
- [ ] Implement dealer reveal animation
- [ ] Show round results
- [ ] Add score tracking across rounds
- [ ] Add betting system (optional)
- [ ] New round functionality
- [ ] Sound effects and animations
- [ ] Integration tests

**Milestone**: Can play multiple rounds of Blackjack

---

### Phase 5: Polish & Optimization (Week 8)

**Goal**: Production-ready application

**Performance:**

- [ ] Profile rendering performance
- [ ] Optimize card rendering (sprite batching)
- [ ] Implement lazy loading for assets
- [ ] Optimize bundle size (code splitting)
- [ ] Reduce memory footprint
- [ ] Achieve 60fps target

**UX/UI:**

- [ ] Responsive design testing (desktop, tablet)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Polish all animations
- [ ] Add loading states
- [ ] Error handling and user feedback
- [ ] Help/tutorial modal

**Quality Assurance:**

- [ ] Cross-browser testing
- [ ] Device testing (touch devices)
- [ ] Bug bash and fixes
- [ ] User acceptance testing
- [ ] Performance testing
- [ ] Security audit

**Documentation:**

- [ ] Update README with setup instructions
- [ ] Add contributing guidelines
- [ ] Create user guide
- [ ] Document keyboard shortcuts
- [ ] API documentation (if applicable)

**Deployment:**

- [ ] Production build configuration
- [ ] Environment variable setup
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Set up monitoring (error tracking)
- [ ] Performance monitoring setup

**Milestone**: Application deployed and production-ready

---

### Phase 6: Future Enhancements (Post v1.0)

**Planned for v1.1+**

- [ ] Additional card games (Poker, Hearts, Solitaire)
- [ ] Online multiplayer (WebSocket)
- [ ] User accounts and profiles
- [ ] Game statistics and history
- [ ] Custom card designs/themes
- [ ] AI opponents
- [ ] Mobile app (React Native)
- [ ] Achievements system
- [ ] Social features (friend lists, chat)

---

## 🔄 Decision Log

### Architecture Decisions

**ADR-001: React + TypeScript**

- **Date**: 2025-10-19
- **Decision**: Use React 18+ with TypeScript
- **Rationale**: Component-based architecture fits card game UI, TypeScript provides type safety for complex game state
- **Alternatives**: Vue.js (smaller ecosystem), Vanilla JS (too much boilerplate)

**ADR-002: Canvas Rendering**

- **Date**: 2025-10-19
- **Decision**: Use HTML5 Canvas for card rendering
- **Rationale**: Performance for many cards, smooth animations, hardware acceleration
- **Alternatives**: SVG (slower with many elements), pure CSS (limited control)

**ADR-003: Redux for State Management**

- **Date**: 2025-10-19
- **Decision**: Use Redux Toolkit for global state
- **Rationale**: Predictable state for game logic, time-travel debugging, middleware for validation
- **Alternatives**: Context API (harder to debug), Zustand (less tooling)

**ADR-004: Docker for Development**

- **Date**: 2025-10-19
- **Decision**: Use Docker for consistent development environment
- **Rationale**: Team consistency, matches production, easier onboarding
- **Trade-offs**: Slight performance overhead, learning curve for Docker newcomers

**ADR-005: GitHub Flow for Branching**

- **Date**: 2025-10-19
- **Decision**: Use GitHub Flow (main + develop + feature branches)
- **Rationale**: Simple, works well with CI/CD, good for small teams
- **Alternatives**: Git Flow (more complex), Trunk-based (requires mature CI)

---

## 🐛 Known Issues & Technical Debt

### Current Known Issues

_None yet - project in planning phase_

### Technical Debt Tracker

_Track technical debt here as it's discovered_

---

## 📚 Resources & References

### Learning Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Docker**: https://docs.docker.com/get-started
- **GitHub Actions**: https://docs.github.com/en/actions

### Design Inspiration

- **Playing card designs**: Research standard card designs
- **Game UIs**: Look at poker sites, card game apps
- **Animation references**: GSAP examples, Framer Motion

### Similar Projects

- Study existing digital card games for UX patterns
- Analyze open-source card game implementations

---

## 🤝 Team & Communication

### Roles (For Future Team)

- **Lead Developer**: Architecture and code review
- **Frontend Developer**: UI components and styling
- **Game Logic Developer**: Game engines and rules
- **QA Engineer**: Testing and bug tracking
- **Designer**: UI/UX and card designs

### Communication Channels

- **GitHub Issues**: Bug tracking and feature requests
- **GitHub Discussions**: Design decisions and architecture
- **Pull Requests**: Code review and feedback
- **Project Board**: Kanban board for task tracking

---

## 📋 Quick Reference

### Essential Commands

**Development:**

```bash
# Start local development
npm run dev

# Start Docker development
docker-compose up dev

# Run tests
npm run test
docker-compose run test

# Lint code
npm run lint

# Format code
npm run format
```

**Git:**

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit with conventional commit
git commit -m "feat: add feature"

# Push and create PR
git push origin feature/feature-name
```

**Docker:**

```bash
# Build and start
docker-compose up --build dev

# Stop containers
docker-compose down

# Clean rebuild
docker-compose down -v
docker-compose up --build
```

---

## 🎯 Next Steps

### Immediate Actions:

1. **Set up Git repository** on GitHub
2. **Initialize project** with Vite + React + TypeScript
3. **Configure Docker** development environment
4. **Create basic project structure** (folders, files)
5. **Set up CI/CD** pipeline with GitHub Actions
6. **Start Phase 1**: Implement Card and Deck models

### Before Next Session:

- [ ] Read this PLANNING.md thoroughly
- [ ] Review TASKS.md for current status
- [ ] Check Playing_Cards_PRD.md for requirements
- [ ] Verify development environment is working

---

## Document Metadata

**Version**: 1.0  
**Last Updated**: 2025-10-19  
**Next Review**: After Phase 0 completion  
**Maintained By**: Development Team

**Change Log:**

- 2025-10-19: Initial PLANNING.md created with full architecture, tech stack, Docker/GitHub setup

---

_This document should be read at the start of every development session. Keep it updated as the project evolves._
