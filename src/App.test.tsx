import { describe, it, expect } from 'vitest'
import { render, screen, userEvent } from './test/utils'
import App from './App'

describe('App', () => {
  it('renders the application title', () => {
    render(<App />)
    expect(
      screen.getByText('Digital Playing Cards Application'),
    ).toBeInTheDocument()
  })

  it('displays the current project phase', () => {
    render(<App />)
    expect(screen.getByText('Phase 0: Setup & Foundation')).toBeInTheDocument()
  })

  it('shows the project initialized message', () => {
    render(<App />)
    expect(screen.getByText('Project Initialized!')).toBeInTheDocument()
    expect(
      screen.getByText('Vite + React + TypeScript project is ready.'),
    ).toBeInTheDocument()
  })

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('displays coming soon features list', () => {
    render(<App />)

    expect(screen.getByText('Coming Soon:')).toBeInTheDocument()
    expect(screen.getByText('Card rendering system')).toBeInTheDocument()
    expect(screen.getByText('Drag-and-drop functionality')).toBeInTheDocument()
    expect(screen.getByText('Freeform play mode')).toBeInTheDocument()
    expect(screen.getByText('Snap game')).toBeInTheDocument()
    expect(screen.getByText('Blackjack game')).toBeInTheDocument()
  })
})
