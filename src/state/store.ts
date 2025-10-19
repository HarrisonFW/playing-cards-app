import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice'

/**
 * Redux store configuration
 *
 * This will be extended with slices as we build features:
 * - deckSlice: Deck and card state
 * - gameSlice: Current game state (mode, players, winner)
 * - uiSlice: UI state (selections, modals, etc.)
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // Additional slices will be added here as they're created
    // Example:
    // deck: deckReducer,
    // game: gameReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
