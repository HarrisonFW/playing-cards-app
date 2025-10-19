import { describe, it, expect } from 'vitest'
import {
  createCard,
  createCardId,
  getCardValue,
  cardsMatch,
  getCardDisplayName,
  getCardColor,
  SUITS,
  RANKS,
} from './Card'

describe('Card Model', () => {
  describe('createCardId', () => {
    it('should create unique IDs for each card', () => {
      expect(createCardId('hearts', 'A')).toBe('hearts-A')
      expect(createCardId('spades', 'K')).toBe('spades-K')
      expect(createCardId('diamonds', '10')).toBe('diamonds-10')
    })
  })

  describe('createCard', () => {
    it('should create a card with default values', () => {
      const card = createCard('hearts', 'A')

      expect(card.id).toBe('hearts-A')
      expect(card.suit).toBe('hearts')
      expect(card.rank).toBe('A')
      expect(card.faceUp).toBe(false)
      expect(card.position).toEqual({ x: 0, y: 0, z: 0 })
      expect(card.owner).toBe('deck')
    })

    it('should allow overriding default values', () => {
      const card = createCard('spades', 'K', {
        faceUp: true,
        position: { x: 100, y: 200, z: 5 },
        owner: 'player1',
      })

      expect(card.faceUp).toBe(true)
      expect(card.position).toEqual({ x: 100, y: 200, z: 5 })
      expect(card.owner).toBe('player1')
    })

    it('should create all 52 unique cards', () => {
      const cards = SUITS.flatMap((suit) =>
        RANKS.map((rank) => createCard(suit, rank)),
      )

      expect(cards).toHaveLength(52)

      // Check all IDs are unique
      const ids = cards.map((c) => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(52)
    })
  })

  describe('getCardValue', () => {
    it('should return 1 for Ace', () => {
      expect(getCardValue('A')).toBe(1)
    })

    it('should return face value for number cards', () => {
      expect(getCardValue('2')).toBe(2)
      expect(getCardValue('5')).toBe(5)
      expect(getCardValue('10')).toBe(10)
    })

    it('should return 10 for face cards', () => {
      expect(getCardValue('J')).toBe(10)
      expect(getCardValue('Q')).toBe(10)
      expect(getCardValue('K')).toBe(10)
    })
  })

  describe('cardsMatch', () => {
    it('should return true for cards with same rank', () => {
      const card1 = createCard('hearts', 'A')
      const card2 = createCard('spades', 'A')

      expect(cardsMatch(card1, card2)).toBe(true)
    })

    it('should return false for cards with different ranks', () => {
      const card1 = createCard('hearts', 'A')
      const card2 = createCard('hearts', 'K')

      expect(cardsMatch(card1, card2)).toBe(false)
    })

    it('should match regardless of suit', () => {
      const card1 = createCard('hearts', '5')
      const card2 = createCard('clubs', '5')
      const card3 = createCard('diamonds', '5')

      expect(cardsMatch(card1, card2)).toBe(true)
      expect(cardsMatch(card2, card3)).toBe(true)
    })
  })

  describe('getCardDisplayName', () => {
    it('should return card with suit symbol', () => {
      expect(getCardDisplayName(createCard('hearts', 'A'))).toBe('A♥')
      expect(getCardDisplayName(createCard('diamonds', 'K'))).toBe('K♦')
      expect(getCardDisplayName(createCard('clubs', '10'))).toBe('10♣')
      expect(getCardDisplayName(createCard('spades', '7'))).toBe('7♠')
    })
  })

  describe('getCardColor', () => {
    it('should return red for hearts and diamonds', () => {
      expect(getCardColor('hearts')).toBe('red')
      expect(getCardColor('diamonds')).toBe('red')
    })

    it('should return black for clubs and spades', () => {
      expect(getCardColor('clubs')).toBe('black')
      expect(getCardColor('spades')).toBe('black')
    })
  })
})
