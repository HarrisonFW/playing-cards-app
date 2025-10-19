import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

/**
 * Custom render function that wraps components with providers
 * This will be extended later with Redux Provider, etc.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  // For now, just use the default render
  // Later we'll add Redux Provider, Router, etc.
  return render(ui, { ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render method
export { customRender as render }
