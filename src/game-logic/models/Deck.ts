import { Card, createCard, SUITS, RANKS, Suit, Rank } from './Card'

/**
 * Deck Class
 *
 * Manages a standard 52-card deck with operations like:
 * - Initialize a full deck
 * - Shuffle using Fisher-Yates algorithm
 * - Draw cards
 * - Reset deck
 */
export class Deck {
  private cards: Card[]

  constructor() {
    this.cards = []
    this.initialize()
  }

  /**
   * Initialize a standard 52-card deck
   *
   * Creates all combinations of suits and ranks
   */
  private initialize(): void {
    this.cards = []
    let zIndex = 0

    for (const suit of SUITS) {
      for (const rank of RANKS) {
        const card = createCard(suit, rank, {
          position: { x: 0, y: 0, z: zIndex++ },
          owner: 'deck',
          faceUp: false,
        })
        this.cards.push(card)
      }
    }
  }

  /**
   * Shuffle the deck using Fisher-Yates algorithm
   *
   * This algorithm provides a uniform random distribution
   * Time complexity: O(n)
   */
  shuffle(): void {
    const cards = [...this.cards]

    for (let i = cards.length - 1; i > 0; i--) {
      // Generate random index from 0 to i (inclusive)
      const j = Math.floor(Math.random() * (i + 1))

      // Swap cards[i] and cards[j]
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }

    // Update z-index after shuffle
    this.cards = cards.map((card, index) => ({
      ...card,
      position: { ...card.position, z: index },
    }))
  }

  /**
   * Draw a card from the top of the deck
   *
   * Returns undefined if deck is empty
   */
  draw(): Card | undefined {
    return this.cards.pop()
  }

  /**
   * Draw multiple cards from the deck
   */
  drawMultiple(count: number): Card[] {
    const drawnCards: Card[] = []

    for (let i = 0; i < count; i++) {
      const card = this.draw()
      if (card) {
        drawnCards.push(card)
      } else {
        break // Deck is empty
      }
    }

    return drawnCards
  }

  /**
   * Peek at the top card without removing it
   */
  peek(): Card | undefined {
    return this.cards[this.cards.length - 1]
  }

  /**
   * Get the number of cards remaining in the deck
   */
  count(): number {
    return this.cards.length
  }

  /**
   * Check if the deck is empty
   */
  isEmpty(): boolean {
    return this.cards.length === 0
  }

  /**
   * Reset the deck to a full 52-card deck
   */
  reset(): void {
    this.initialize()
  }

  /**
   * Get all cards in the deck (for testing/debugging)
   */
  getCards(): Card[] {
    return [...this.cards]
  }

  /**
   * Add a card to the bottom of the deck
   */
  addToBottom(card: Card): void {
    this.cards.unshift({
      ...card,
      position: { ...card.position, z: 0 },
      owner: 'deck',
    })

    // Update z-indices
    this.cards = this.cards.map((c, index) => ({
      ...c,
      position: { ...c.position, z: index },
    }))
  }

  /**
   * Add a card to the top of the deck
   */
  addToTop(card: Card): void {
    this.cards.push({
      ...card,
      position: { ...card.position, z: this.cards.length },
      owner: 'deck',
    })
  }

  /**
   * Add multiple cards to the deck
   */
  addCards(cards: Card[]): void {
    cards.forEach((card) => this.addToTop(card))
  }
}

/**
 * Create a new shuffled deck
 */
export const createShuffledDeck = (): Deck => {
  const deck = new Deck()
  deck.shuffle()
  return deck
}

/**
 * Deal cards to multiple players
 *
 * Returns an array of card arrays, one for each player
 */
export const dealCards = (
  deck: Deck,
  playerCount: number,
  cardsPerPlayer: number,
): Card[][] => {
  const hands: Card[][] = Array.from({ length: playerCount }, () => [])

  // Deal cards round-robin style
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let player = 0; player < playerCount; player++) {
      const card = deck.draw()
      if (card) {
        hands[player].push(card)
      }
    }
  }

  return hands
}
