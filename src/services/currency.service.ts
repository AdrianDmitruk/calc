import { axiosBase } from '../api/interceptors'
import { useCurrencyStore } from '../store/store'
import { CurrencyRatesResponse } from '../type'
import { constants } from './constants.service'
import { notifications } from '@mantine/notifications'

export const getCurrentRates = async (
	ref: number,
	rateCode: string,
	codes?: string[],
	lang: number = 1
): Promise<CurrencyRatesResponse> => {
	const setCurrentRates = useCurrencyStore.getState().setCurrentRates

	try {
		const response = await axiosBase.get<CurrencyRatesResponse>(
			`${constants.CURRENCIES_API}`,
			{
				params: {
					ref,
					rateCode,
					codes: codes?.join(','),
					lang,
				},
			}
		)

		setCurrentRates(response.data)
		return response.data
	} catch (error: any) {
		notifications.show({
			color: 'red',
			title: 'Error Fetching Current Rates',
			message:
				error?.response?.data?.message ||
				'An error occurred while fetching current rates.',
		})
		throw error
	}
}

export const getHistoricalRates = async (
	rateCode: string,
	time: number,
	codes?: string[],
	lang: number = 1
): Promise<CurrencyRatesResponse> => {
	const setHistoricalRates = useCurrencyStore.getState().setHistoricalRates

	try {
		const response = await axiosBase.get<CurrencyRatesResponse>(
			`${constants.HISTORY_API}`,
			{
				params: {
					rateCode,
					time,
					codes: codes?.join(','),
					lang,
				},
			}
		)

		setHistoricalRates(response.data)
		return response.data
	} catch (error: any) {
		notifications.show({
			color: 'red',
			title: 'Error Fetching Historical Rates',
			message:
				error?.response?.data?.message ||
				'An error occurred while fetching historical rates.',
		})
		throw error
	}
}
