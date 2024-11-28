import { useQuery } from '@tanstack/react-query'
import { getCurrentRates } from '../services/currency.service'

export const useCurrentRates = (
	ref: number,
	rateCode: string,
	codes: string[],
	lang: number
) => {
	return useQuery({
		queryKey: ['currentRates', ref, rateCode, codes, lang],
		queryFn: () => getCurrentRates(ref, rateCode, codes, lang),
		enabled: false,
		retry: false,
	})
}
