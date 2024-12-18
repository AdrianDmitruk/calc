import { FC } from 'react'
import { Table, Button } from '@mantine/core'
import { CSVLink } from 'react-csv'

import classes from './currency.module.css'
import { useCurrencyStore } from '../../store/store'

export const CurrencyTable: FC = () => {
	const { amount, historicalRates, currentRates } = useCurrencyStore()

	const baseCurrency =
		currentRates?.rateCode || historicalRates?.rateCode || 'N/A'

	const generateCSVData = () => {
		return (
			currentRates?.rates.map(rate => {
				const historicalRate = historicalRates?.rates.find(
					r => r.code === rate.code
				)
				const targetAmountCurrent = amount
					? (parseFloat(amount as string) * rate.rate).toFixed(2)
					: 'N/A'
				const targetAmountHistorical =
					historicalRate && amount
						? (parseFloat(amount as string) * historicalRate.rate).toFixed(2)
						: 'N/A'

				return {
					Name: rate.name || 'N/A',
					'Base Amount': amount || 'N/A',
					'Base Currency': baseCurrency,
					'Target Currency': rate.code,
					'Current Rate': rate.rate.toFixed(4),
					'Converted Amount (Current Rate)': targetAmountCurrent,
					'Target Amount (Historical Rate)': targetAmountHistorical,
					'Historical Rate': historicalRate
						? historicalRate.rate.toFixed(4)
						: 'N/A',
					'Last Update': historicalRate?.lastUpdate
						? new Date(historicalRate.lastUpdate).toLocaleString()
						: 'N/A',
				}
			}) || []
		)
	}

	return (
		<div className={classes.content}>
			{currentRates || historicalRates ? (
				<>
					<CSVLink
						data={generateCSVData()}
						filename='currency_rates.csv'
						className={classes.csvButton}
					>
						<Button>Download CSV</Button>
					</CSVLink>
					<Table.ScrollContainer minWidth={1402}>
						<Table verticalSpacing='xs'>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Name</Table.Th>
									<Table.Th>Base Amount</Table.Th>
									<Table.Th>Base Currency</Table.Th>
									<Table.Th>Target Currency</Table.Th>
									<Table.Th>Current Rate</Table.Th>
									<Table.Th>Converted Amount (Current Rate)</Table.Th>
									<Table.Th>Converted Amount (Historical Rate)</Table.Th>
									<Table.Th>Historical Rate</Table.Th>
									<Table.Th>Last Update</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{currentRates?.rates.map(rate => {
									const historicalRate = historicalRates?.rates.find(
										r => r.code === rate.code
									)
									const targetAmountCurrent = amount
										? (parseFloat(amount as string) * rate.rate).toFixed(2)
										: 'N/A'
									const targetAmountHistorical =
										historicalRate && amount
											? (
													parseFloat(amount as string) * historicalRate.rate
											  ).toFixed(2)
											: 'N/A'

									return (
										<Table.Tr key={rate.code}>
											<Table.Td>{rate.name || 'N/A'}</Table.Td>
											<Table.Td>{amount || 'N/A'}</Table.Td>
											<Table.Td>{baseCurrency}</Table.Td>
											<Table.Td>{rate.code}</Table.Td>
											<Table.Td>{rate.rate.toFixed(4)}</Table.Td>
											<Table.Td>{targetAmountCurrent}</Table.Td>
											<Table.Td>{targetAmountHistorical}</Table.Td>
											<Table.Td>
												{historicalRate
													? historicalRate.rate.toFixed(4)
													: 'N/A'}
											</Table.Td>
											<Table.Td>
												{historicalRate?.lastUpdate
													? new Date(historicalRate.lastUpdate).toLocaleString()
													: 'N/A'}
											</Table.Td>
										</Table.Tr>
									)
								})}
							</Table.Tbody>
						</Table>
					</Table.ScrollContainer>
				</>
			) : null}
		</div>
	)
}
