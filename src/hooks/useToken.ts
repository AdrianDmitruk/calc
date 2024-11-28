import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getToken } from '../services'
import { Token } from '../type'

export const useToken = () => {
	return useQuery<Token, Error>({
		queryKey: ['token'],
		queryFn: getToken,
		staleTime: 3600 * 1000,
		cacheTime: 3600 * 1000,
		retry: false,
		onError: (error: any) => {
			console.error('Error fetching token:', error)
		},
	} as UseQueryOptions<Token, Error>)
}
