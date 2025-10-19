import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Digital Playing Cards Application</h1>
        <p>Phase 0: Setup & Foundation</p>
      </header>

      <main className="app-main">
        <div className="card">
          <h2>Project Initialized!</h2>
          <p>Vite + React + TypeScript project is ready.</p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p className="info">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="features">
          <h3>Coming Soon:</h3>
          <ul>
            <li>Card rendering system</li>
            <li>Drag-and-drop functionality</li>
            <li>Freeform play mode</li>
            <li>Snap game</li>
            <li>Blackjack game</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Canvas</p>
      </footer>
    </div>
  )
}

export default App
