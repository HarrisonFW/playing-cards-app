/**
 * Card Model
 *
 * Defines the structure and types for playing cards
 */

// Card suits
export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const
export type Suit = (typeof SUITS)[number]

// Card ranks (Ace to King)
export const RANKS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
] as const
export type Rank = (typeof RANKS)[number]

// Position on the play area
export interface Position {
  x: number
  y: number
  z: number // Z-index for stacking
}

// Card owner (player identifier)
export type Owner = null | 'player1' | 'player2' | 'deck' | 'discard'

/**
 * Card Interface
 *
 * Represents a single playing card with all its properties
 */
export interface Card {
  id: string // Unique identifier (e.g., "hearts-A")
  suit: Suit
  rank: Rank
  faceUp: boolean
  position: Position
  owner: Owner
}

/**
 * Create a unique card ID from suit and rank
 */
export const createCardId = (suit: Suit, rank: Rank): string => {
  return `${suit}-${rank}`
}

/**
 * Card factory function
 *
 * Creates a new card with default values
 */
export const createCard = (
  suit: Suit,
  rank: Rank,
  overrides?: Partial<Omit<Card, 'id' | 'suit' | 'rank'>>,
): Card => {
  return {
    id: createCardId(suit, rank),
    suit,
    rank,
    faceUp: false,
    position: { x: 0, y: 0, z: 0 },
    owner: 'deck',
    ...overrides,
  }
}

/**
 * Get the numeric value of a card for game logic
 *
 * Used for games like Blackjack where cards have point values
 * Ace = 1 (or 11, handled by game logic)
 * Number cards = face value
 * Face cards = 10
 */
export const getCardValue = (rank: Rank): number => {
  if (rank === 'A') return 1
  if (['J', 'Q', 'K'].includes(rank)) return 10
  return parseInt(rank, 10)
}

/**
 * Check if two cards match (same rank)
 *
 * Used for games like Snap
 */
export const cardsMatch = (card1: Card, card2: Card): boolean => {
  return card1.rank === card2.rank
}

/**
 * Get the display name for a card
 */
export const getCardDisplayName = (card: Card): string => {
  const suitSymbols: Record<Suit, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  }

  return `${card.rank}${suitSymbols[card.suit]}`
}

/**
 * Get the color of a card (red or black)
 */
export const getCardColor = (suit: Suit): 'red' | 'black' => {
  return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black'
}
