import { create } from 'zustand'
import { CurrencyRatesResponse } from '../type'

type CurrencyStore = {
	amount: number | string
	setAmount: (amount: number | string) => void
	rateCode: string
	setRateCode: (rateCode: string) => void
	codes: string[]
	setCodes: (codes: string[]) => void
	lang: number
	setLang: (lang: number) => void
	time: Date | null
	setTime: (time: Date | null) => void

	currentRates: CurrencyRatesResponse | null
	historicalRates: CurrencyRatesResponse | null
	setCurrentRates: (data: CurrencyRatesResponse) => void
	setHistoricalRates: (data: CurrencyRatesResponse) => void
}

export const useCurrencyStore = create<CurrencyStore>(set => ({
	amount: '',
	setAmount: amount => set({ amount }),
	rateCode: '',
	setRateCode: rateCode => set({ rateCode }),
	codes: [],
	setCodes: codes => set({ codes }),
	lang: 1,
	setLang: lang => set({ lang }),
	time: new Date(),
	setTime: time => set({ time }),

	currentRates: null,
	setCurrentRates: data => set({ currentRates: data }),
	historicalRates: null,
	setHistoricalRates: data => set({ historicalRates: data }),
}))
