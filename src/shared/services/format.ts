import { MerchantCategory } from '../types/models'

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount)
}

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
}

export const formatDateTime = (isoDate: string): string => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })
}

export const getCategoryIcon = (category: MerchantCategory): string => {
    const icons: Record<MerchantCategory, string> = {
        travel: '✈️',
        dining: '🍽️',
        shopping: '🛍️',
        transport: '🚗',
        entertainment: '🎬',
        groceries: '🛒',
        bills: '📄',
        transfer: '💸',
        other: '💳',
    }
    return icons[category] ?? icons.other
}

export const maskCardNumber = (lastFour: string): string => {
    return `•••• •••• •••• ${lastFour}`
}

export const formatCardExpiry = (month: number, year: number): string => {
    return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`
}
