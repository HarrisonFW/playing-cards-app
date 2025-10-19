import { describe, it, expect, beforeEach } from 'vitest'
import { Deck, createShuffledDeck, dealCards } from './Deck'
import { createCard } from './Card'

describe('Deck', () => {
  let deck: Deck

  beforeEach(() => {
    deck = new Deck()
  })

  describe('initialization', () => {
    it('should create a deck with 52 cards', () => {
      expect(deck.count()).toBe(52)
    })

    it('should not be empty when initialized', () => {
      expect(deck.isEmpty()).toBe(false)
    })

    it('should have all unique cards', () => {
      const cards = deck.getCards()
      const ids = cards.map((c) => c.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(52)
    })

    it('should have cards with sequential z-index', () => {
      const cards = deck.getCards()
      cards.forEach((card, index) => {
        expect(card.position.z).toBe(index)
      })
    })

    it('should have all cards face down', () => {
      const cards = deck.getCards()
      cards.forEach((card) => {
        expect(card.faceUp).toBe(false)
      })
    })

    it('should have all cards owned by deck', () => {
      const cards = deck.getCards()
      cards.forEach((card) => {
        expect(card.owner).toBe('deck')
      })
    })
  })

  describe('draw', () => {
    it('should draw a card from the top', () => {
      const card = deck.draw()

      expect(card).toBeDefined()
      expect(deck.count()).toBe(51)
    })

    it('should return undefined when deck is empty', () => {
      // Draw all cards
      for (let i = 0; i < 52; i++) {
        deck.draw()
      }

      const card = deck.draw()
      expect(card).toBeUndefined()
      expect(deck.isEmpty()).toBe(true)
    })

    it('should draw cards in LIFO order', () => {
      const originalCards = deck.getCards()
      const topCard = originalCards[originalCards.length - 1]

      const drawnCard = deck.draw()

      expect(drawnCard?.id).toBe(topCard.id)
    })
  })

  describe('drawMultiple', () => {
    it('should draw multiple cards', () => {
      const cards = deck.drawMultiple(5)

      expect(cards).toHaveLength(5)
      expect(deck.count()).toBe(47)
    })

    it('should return all remaining cards if requested more than available', () => {
      const cards = deck.drawMultiple(100)

      expect(cards).toHaveLength(52)
      expect(deck.isEmpty()).toBe(true)
    })

    it('should return empty array when deck is empty', () => {
      deck.drawMultiple(52) // Empty the deck
      const cards = deck.drawMultiple(5)

      expect(cards).toHaveLength(0)
    })
  })

  describe('peek', () => {
    it('should return the top card without removing it', () => {
      const card = deck.peek()
      const count = deck.count()

      expect(card).toBeDefined()
      expect(deck.count()).toBe(count) // Count unchanged
    })

    it('should return the same card as draw would', () => {
      const peeked = deck.peek()
      const drawn = deck.draw()

      expect(peeked?.id).toBe(drawn?.id)
    })

    it('should return undefined when deck is empty', () => {
      deck.drawMultiple(52)
      expect(deck.peek()).toBeUndefined()
    })
  })

  describe('shuffle', () => {
    it('should maintain 52 cards after shuffle', () => {
      deck.shuffle()

      expect(deck.count()).toBe(52)
    })

    it('should change card order', () => {
      const originalOrder = deck.getCards().map((c) => c.id)
      deck.shuffle()
      const shuffledOrder = deck.getCards().map((c) => c.id)

      // Very unlikely to be in same order (probability: 1/52!)
      expect(shuffledOrder).not.toEqual(originalOrder)
    })

    it('should have all original cards after shuffle', () => {
      const originalIds = new Set(deck.getCards().map((c) => c.id))
      deck.shuffle()
      const shuffledIds = new Set(deck.getCards().map((c) => c.id))

      expect(shuffledIds).toEqual(originalIds)
    })

    it('should update z-indices after shuffle', () => {
      deck.shuffle()
      const cards = deck.getCards()

      cards.forEach((card, index) => {
        expect(card.position.z).toBe(index)
      })
    })

    it('should produce different results on multiple shuffles', () => {
      deck.shuffle()
      const firstShuffle = deck.getCards().map((c) => c.id)

      deck.reset()
      deck.shuffle()
      const secondShuffle = deck.getCards().map((c) => c.id)

      // Very unlikely to be identical (probability: 1/52!)
      expect(firstShuffle).not.toEqual(secondShuffle)
    })
  })

  describe('reset', () => {
    it('should restore deck to 52 cards', () => {
      deck.drawMultiple(20)
      deck.reset()

      expect(deck.count()).toBe(52)
    })

    it('should restore original order', () => {
      const originalOrder = deck.getCards().map((c) => c.id)

      deck.shuffle()
      deck.reset()

      const resetOrder = deck.getCards().map((c) => c.id)
      expect(resetOrder).toEqual(originalOrder)
    })
  })

  describe('addToBottom', () => {
    it('should add a card to the bottom of the deck', () => {
      const card = createCard('hearts', 'A')
      deck.addToBottom(card)

      expect(deck.count()).toBe(53)

      const cards = deck.getCards()
      expect(cards[0].id).toBe('hearts-A')
    })

    it('should update z-indices', () => {
      const card = createCard('hearts', 'A')
      deck.addToBottom(card)

      const cards = deck.getCards()
      cards.forEach((c, index) => {
        expect(c.position.z).toBe(index)
      })
    })
  })

  describe('addToTop', () => {
    it('should add a card to the top of the deck', () => {
      const card = createCard('spades', 'K')
      deck.addToTop(card)

      expect(deck.count()).toBe(53)

      const topCard = deck.peek()
      expect(topCard?.id).toBe('spades-K')
    })
  })

  describe('addCards', () => {
    it('should add multiple cards to the deck', () => {
      const cards = [
        createCard('hearts', 'A'),
        createCard('spades', 'K'),
        createCard('diamonds', 'Q'),
      ]

      deck.addCards(cards)

      expect(deck.count()).toBe(55)
    })
  })
})

describe('createShuffledDeck', () => {
  it('should create a shuffled 52-card deck', () => {
    const deck = createShuffledDeck()

    expect(deck.count()).toBe(52)
    expect(deck.isEmpty()).toBe(false)
  })

  it('should create a deck in different order than unshuffled', () => {
    const normalDeck = new Deck()
    const shuffledDeck = createShuffledDeck()

    const normalOrder = normalDeck.getCards().map((c) => c.id)
    const shuffledOrder = shuffledDeck.getCards().map((c) => c.id)

    expect(shuffledOrder).not.toEqual(normalOrder)
  })
})

describe('dealCards', () => {
  let deck: Deck

  beforeEach(() => {
    deck = new Deck()
  })

  it('should deal cards to 2 players', () => {
    const hands = dealCards(deck, 2, 5)

    expect(hands).toHaveLength(2)
    expect(hands[0]).toHaveLength(5)
    expect(hands[1]).toHaveLength(5)
    expect(deck.count()).toBe(42) // 52 - 10 dealt
  })

  it('should deal cards to 4 players', () => {
    const hands = dealCards(deck, 4, 7)

    expect(hands).toHaveLength(4)
    hands.forEach((hand) => {
      expect(hand).toHaveLength(7)
    })
    expect(deck.count()).toBe(24) // 52 - 28 dealt
  })

  it('should deal cards round-robin style', () => {
    const hands = dealCards(deck, 2, 2)

    // First card to player 1, second to player 2, third to player 1, fourth to player 2
    expect(hands[0]).toHaveLength(2)
    expect(hands[1]).toHaveLength(2)
  })

  it('should handle dealing more cards than available', () => {
    const hands = dealCards(deck, 3, 20)

    // Can only deal 17 cards per player (51/3), some players get 18
    const totalDealt = hands.reduce((sum, hand) => sum + hand.length, 0)
    expect(totalDealt).toBeLessThanOrEqual(52)
  })
})
