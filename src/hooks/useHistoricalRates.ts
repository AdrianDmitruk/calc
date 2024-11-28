import { useQuery } from '@tanstack/react-query'
import { getHistoricalRates } from '../services/currency.service'

export const useHistoricalRates = (
	rateCode: string,
	time: number,
	codes?: string[],
	lang: number = 1
) => {
	return useQuery({
		queryKey: ['historicalRates', rateCode, time, codes, lang],
		queryFn: () => getHistoricalRates(rateCode, time, codes, lang),
		enabled: false,
		retry: false,
	})
}
