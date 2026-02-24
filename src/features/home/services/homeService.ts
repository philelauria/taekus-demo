import type { Card, RewardsBalance } from '~/shared/types'
import { mockApi } from '~/shared/services/mockApi'

export const homeService = {
    async getHomeData(): Promise<{ cards: Card[]; rewards: RewardsBalance }> {
        const [cardsRes, rewardsRes] = await Promise.all([mockApi.getCards(), mockApi.getRewards()])

        return {
            cards: cardsRes.data,
            rewards: rewardsRes.data,
        }
    },
}
