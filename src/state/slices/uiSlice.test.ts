import { describe, it, expect } from 'vitest'
import uiReducer, {
  setGameMode,
  setLoading,
  selectCard,
  selectCurrentMode,
  selectIsLoading,
  selectSelectedCardId,
} from './uiSlice'

describe('uiSlice', () => {
  const initialState = {
    currentMode: 'menu' as const,
    isLoading: false,
    selectedCardId: null,
  }

  it('should return the initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  describe('setGameMode', () => {
    it('should set the game mode to freeform', () => {
      const actual = uiReducer(initialState, setGameMode('freeform'))
      expect(actual.currentMode).toEqual('freeform')
    })

    it('should set the game mode to snap', () => {
      const actual = uiReducer(initialState, setGameMode('snap'))
      expect(actual.currentMode).toEqual('snap')
    })

    it('should set the game mode to blackjack', () => {
      const actual = uiReducer(initialState, setGameMode('blackjack'))
      expect(actual.currentMode).toEqual('blackjack')
    })
  })

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const actual = uiReducer(initialState, setLoading(true))
      expect(actual.isLoading).toEqual(true)
    })

    it('should set loading to false', () => {
      const actual = uiReducer(
        { ...initialState, isLoading: true },
        setLoading(false),
      )
      expect(actual.isLoading).toEqual(false)
    })
  })

  describe('selectCard', () => {
    it('should select a card', () => {
      const actual = uiReducer(initialState, selectCard('card-123'))
      expect(actual.selectedCardId).toEqual('card-123')
    })

    it('should deselect a card', () => {
      const actual = uiReducer(
        { ...initialState, selectedCardId: 'card-123' },
        selectCard(null),
      )
      expect(actual.selectedCardId).toBeNull()
    })
  })

  describe('selectors', () => {
    const mockState = {
      ui: {
        currentMode: 'snap' as const,
        isLoading: true,
        selectedCardId: 'card-456',
      },
    }

    it('should select current mode', () => {
      expect(selectCurrentMode(mockState)).toEqual('snap')
    })

    it('should select loading state', () => {
      expect(selectIsLoading(mockState)).toEqual(true)
    })

    it('should select selected card ID', () => {
      expect(selectSelectedCardId(mockState)).toEqual('card-456')
    })
  })
})
