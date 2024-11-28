import { FC } from 'react'
import {
	NumberInput,
	Select,
	MultiSelect,
	Group,
	CloseButton,
} from '@mantine/core'

import classes from './select.module.css'
import { useCurrencyStore } from '../../store/store'
import { currencyOptions, dateParser, languageOptions } from '../../services'
import { DateInput } from '@mantine/dates'

export const SelectForm: FC = () => {
	const {
		amount,
		setAmount,
		rateCode,
		setRateCode,
		codes,
		setCodes,
		lang,
		setLang,
		time,
		setTime,
	} = useCurrencyStore()

	return (
		<Group grow align='start' className={classes.select}>
			<NumberInput
				label='Amount'
				placeholder='Enter amount'
				value={amount}
				onChange={setAmount}
				classNames={{
					root: classes.selectRoot,
				}}
				rightSection={
					<CloseButton
						aria-label='Clear input'
						onClick={() => setAmount('')}
						style={{ display: amount ? undefined : 'none' }}
						size={22}
					/>
				}
			/>
			<Select
				label='Base Currency'
				placeholder='Select currency'
				data={currencyOptions}
				value={rateCode}
				onChange={value => setRateCode(value || '')}
				clearable
				searchable
				classNames={{ root: classes.selectRoot }}
			/>
			<MultiSelect
				label='Currencies to Convert'
				placeholder='Select currencies'
				data={currencyOptions}
				value={codes}
				onChange={setCodes}
				clearable
				searchable
				classNames={{ root: classes.selectRoot }}
			/>
			<Select
				label='Language'
				placeholder='Select language'
				data={languageOptions.map(lang => ({
					value: lang.id.toString(),
					label: lang.localized,
				}))}
				value={lang.toString()}
				onChange={value => setLang(parseInt(value || '1', 10))}
				classNames={{ root: classes.selectRoot }}
			/>
			<DateInput
				label='Historical Data Time'
				placeholder='Select date'
				value={time}
				valueFormat='DD.MM.YYYY'
				onChange={setTime}
				dateParser={dateParser}
				classNames={{ root: classes.selectRoot }}
			/>
		</Group>
	)
}
