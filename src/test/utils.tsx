import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit'
import uiReducer from '../state/slices/uiSlice'

// Create a custom store for testing
const createTestStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<{ ui: ReturnType<typeof uiReducer> }>) => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      // Add other reducers as they're created
    },
    preloadedState,
  })
}

/**
 * Custom render function that wraps components with providers
 * Includes Redux Provider with a fresh store for each test
 */
const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: {
    preloadedState?: PreloadedStateShapeFromReducersMapObject<{ ui: ReturnType<typeof uiReducer> }>
    store?: ReturnType<typeof createTestStore>
  } & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render method
export { customRender as render }
