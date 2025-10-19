import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

/**
 * UI State Interface
 *
 * Manages UI-specific state like:
 * - Current game mode selection
 * - Modal visibility
 * - Loading states
 * - Selected cards
 */
interface UiState {
  currentMode: 'menu' | 'freeform' | 'snap' | 'blackjack'
  isLoading: boolean
  selectedCardId: string | null
}

const initialState: UiState = {
  currentMode: 'menu',
  isLoading: false,
  selectedCardId: null,
}

/**
 * UI Slice
 *
 * Handles UI-specific actions and state updates
 */
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGameMode: (
      state,
      action: PayloadAction<UiState['currentMode']>,
    ) => {
      state.currentMode = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    selectCard: (state, action: PayloadAction<string | null>) => {
      state.selectedCardId = action.payload
    },
  },
})

// Export actions
export const { setGameMode, setLoading, selectCard } = uiSlice.actions

// Export selectors
export const selectCurrentMode = (state: RootState) => state.ui.currentMode
export const selectIsLoading = (state: RootState) => state.ui.isLoading
export const selectSelectedCardId = (state: RootState) =>
  state.ui.selectedCardId

// Export reducer
export default uiSlice.reducer
