import { User, Card, Transaction, RewardsBalance, MerchantCategory } from '../types/models'

export const MOCK_USER: User = {
    id: 'usr-001',
    email: 'demo@taekus.com',
    firstName: 'Phil',
    lastName: 'Elauria',
}

const CARD_COLORS = {
    black: {
        background: '#1A1A2E',
        foreground: '#FFFFFF',
        subtle: 'rgba(255,255,255,0.7)',
        accent: 'rgba(255,255,255,0.12)',
    },
    navy: {
        background: '#0D2137',
        foreground: '#FFFFFF',
        subtle: 'rgba(255,255,255,0.7)',
        accent: 'rgba(255,255,255,0.12)',
    },
    gold: {
        background: '#8B6914',
        foreground: '#FFFFFF',
        subtle: 'rgba(255,255,255,0.75)',
        accent: 'rgba(255,255,255,0.15)',
    },
    platinum: {
        background: '#E8E8EF',
        foreground: '#1A1A2E',
        subtle: 'rgba(0,0,0,0.55)',
        accent: 'rgba(0,0,0,0.08)',
    },
}

export const MOCK_CARDS: Card[] = [
    {
        id: 'card-credit-001',
        type: 'credit',
        name: 'Taekus Black',
        lastFour: '4821',
        status: 'active',
        balance: 14873.42,
        creditLimit: 75000,
        availableCredit: 60126.58,
        minimumPayment: 892.0,
        paymentDueDate: '2026-03-15',
        apr: 18.99,
        expiryMonth: 8,
        expiryYear: 2028,
        colorScheme: CARD_COLORS.black,
    },
    {
        id: 'card-credit-002',
        type: 'credit',
        name: 'Taekus Reserve',
        lastFour: '9156',
        status: 'active',
        balance: 42318.67,
        creditLimit: 150000,
        availableCredit: 107681.33,
        minimumPayment: 2539.12,
        paymentDueDate: '2026-03-22',
        apr: 16.49,
        expiryMonth: 3,
        expiryYear: 2029,
        colorScheme: CARD_COLORS.gold,
    },
    {
        id: 'card-debit-001',
        type: 'debit',
        name: 'Taekus Platinum Debit',
        lastFour: '7734',
        status: 'active',
        availableBalance: 284631.87,
        expiryMonth: 11,
        expiryYear: 2027,
        colorScheme: CARD_COLORS.platinum,
    },
]

const MERCHANTS: {
    name: string
    category: MerchantCategory
    descriptions: string[]
    amountRange: [number, number]
}[] = [
    {
        name: 'Delta Air Lines',
        category: 'travel',
        descriptions: [
            'First Class ATL → SFO',
            'First Class SFO → NRT',
            'Business Class JFK → LHR',
            'First Class LAX → CDG',
        ],
        amountRange: [1200, 8500],
    },
    {
        name: 'United Airlines',
        category: 'travel',
        descriptions: [
            'Polaris Business SFO → SIN',
            'First Class ORD → HNL',
            'Business Class EWR → FCO',
        ],
        amountRange: [2000, 12000],
    },
    {
        name: 'Four Seasons Hotels',
        category: 'travel',
        descriptions: [
            '3 nights - Maui',
            '5 nights - Bora Bora',
            '2 nights - Manhattan',
            '4 nights - Kyoto',
        ],
        amountRange: [2400, 15000],
    },
    {
        name: 'The Ritz-Carlton',
        category: 'travel',
        descriptions: [
            '2 nights - Half Moon Bay',
            'Suite - Lake Tahoe',
            '3 nights - Amelia Island',
        ],
        amountRange: [1800, 8000],
    },
    {
        name: 'Nobu Restaurant',
        category: 'dining',
        descriptions: ['Omakase dinner', 'Dinner for 4', 'Private dining'],
        amountRange: [280, 1800],
    },
    {
        name: 'Eleven Madison Park',
        category: 'dining',
        descriptions: ['Tasting menu for 2', 'Private event'],
        amountRange: [600, 3500],
    },
    {
        name: 'Le Bernardin',
        category: 'dining',
        descriptions: ['Dinner for 2', "Chef's tasting menu"],
        amountRange: [400, 1200],
    },
    {
        name: 'Masa',
        category: 'dining',
        descriptions: ['Omakase', 'Dinner for 2'],
        amountRange: [800, 2000],
    },
    {
        name: 'Uber Black',
        category: 'transport',
        descriptions: ['Airport transfer', 'City ride', 'SUV to dinner'],
        amountRange: [45, 180],
    },
    {
        name: 'NetJets',
        category: 'travel',
        descriptions: ['Charter TEB → MIA', 'Quarter share payment'],
        amountRange: [8000, 45000],
    },
    {
        name: 'Hermès',
        category: 'shopping',
        descriptions: ['Leather goods', 'Accessories'],
        amountRange: [1200, 12000],
    },
    {
        name: 'Bergdorf Goodman',
        category: 'shopping',
        descriptions: ['Personal shopping', 'Seasonal wardrobe'],
        amountRange: [2500, 18000],
    },
    {
        name: "Sotheby's",
        category: 'shopping',
        descriptions: ['Art acquisition', 'Auction deposit'],
        amountRange: [5000, 75000],
    },
    {
        name: 'Whole Foods Market',
        category: 'groceries',
        descriptions: ['Weekly groceries', 'Catering order', 'Provisions'],
        amountRange: [120, 650],
    },
    {
        name: 'Wire Transfer',
        category: 'transfer',
        descriptions: ['Investment funding', 'Property payment', 'Account transfer'],
        amountRange: [10000, 100000],
    },
    {
        name: 'American Express',
        category: 'bills',
        descriptions: ['Centurion membership', 'Statement payment'],
        amountRange: [2500, 15000],
    },
    {
        name: 'Met Opera',
        category: 'entertainment',
        descriptions: ['Season tickets', 'Gala donation', 'Box seats'],
        amountRange: [500, 5000],
    },
    {
        name: 'Equinox',
        category: 'bills',
        descriptions: ['Annual membership', 'Personal training'],
        amountRange: [300, 2400],
    },
]

const CREDIT_ENTRIES: {
    name: string
    description: string
    amountRange: [number, number]
}[] = [
    {
        name: 'Wire Transfer In',
        description: 'Investment return',
        amountRange: [15000, 250000],
    },
    {
        name: 'Direct Deposit',
        description: 'Board compensation',
        amountRange: [25000, 85000],
    },
    {
        name: 'Taekus Rewards',
        description: 'Cash back redemption',
        amountRange: [500, 5000],
    },
    {
        name: 'Refund - Four Seasons',
        description: 'Cancelled reservation',
        amountRange: [2000, 8000],
    },
    {
        name: 'ACH Transfer',
        description: 'Account funding',
        amountRange: [10000, 100000],
    },
]

function randomBetween(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function generateTransaction(index: number, daysAgo: number): Transaction {
    const isCredit = Math.random() < 0.15
    const card = randomItem(MOCK_CARDS)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    date.setHours(Math.floor(Math.random() * 14) + 8)
    date.setMinutes(Math.floor(Math.random() * 60))

    if (isCredit) {
        const entry = randomItem(CREDIT_ENTRIES)
        return {
            id: `txn-${String(index).padStart(5, '0')}`,
            cardId: card.id,
            amount: randomBetween(...entry.amountRange),
            type: 'credit',
            status: 'completed',
            merchantName: entry.name,
            merchantCategory: 'transfer',
            description: entry.description,
            date: date.toISOString(),
            rewardsEarned: 0,
        }
    }

    const merchant = randomItem(MERCHANTS)
    const amount = randomBetween(...merchant.amountRange)
    const isPending = daysAgo < 2 && Math.random() < 0.3

    const multiplier = merchant.category === 'travel' ? 5 : merchant.category === 'dining' ? 3 : 1

    return {
        id: `txn-${String(index).padStart(5, '0')}`,
        cardId: card.id,
        amount,
        type: 'debit',
        status: isPending ? 'pending' : 'completed',
        merchantName: merchant.name,
        merchantCategory: merchant.category,
        description: randomItem(merchant.descriptions),
        date: date.toISOString(),
        rewardsEarned: Math.round(amount * multiplier),
    }
}

function generateTransactions(count: number): Transaction[] {
    const transactions: Transaction[] = []
    for (let i = 0; i < count; i++) {
        const daysAgo = Math.floor(i / 3)
        transactions.push(generateTransaction(i, daysAgo))
    }
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const MOCK_TRANSACTIONS = generateTransactions(50)
export const MOCK_TRANSACTIONS_LARGE = generateTransactions(10000)

export const MOCK_REWARDS: RewardsBalance = {
    points: 487500,
    cashValue: 7312.5,
    tier: 'platinum',
    pendingPoints: 12300,
    yearToDate: 892400,
    categoryEarnings: [
        { category: 'travel', points: 385000, multiplier: 5 },
        { category: 'dining', points: 67200, multiplier: 3 },
        { category: 'shopping', points: 22800, multiplier: 1 },
        { category: 'transport', points: 5400, multiplier: 1 },
        { category: 'entertainment', points: 4600, multiplier: 1 },
        { category: 'groceries', points: 2500, multiplier: 1 },
    ],
}
