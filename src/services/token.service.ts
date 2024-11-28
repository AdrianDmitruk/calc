import { axiosAuth } from '../api/interceptors'
import { Token } from '../type'

const CLIENT_ID = 'partners-exchange-rates-qi2WftoG8HGN0wQGuwlxdUB1KXT'
const CLIENT_SECRET =
	'0XcqIemzGr8@9DUuPBWZ7zuSz*rX9rJUrWjNz52xL#6fbXTdy8p5WXk!&KxSJHXv'

export const getToken = async (): Promise<Token> => {
	const params = new URLSearchParams()
	params.append('client_id', CLIENT_ID)
	params.append('client_secret', CLIENT_SECRET)
	params.append('grant_type', 'client_credentials')

	const response = await axiosAuth.post('', params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	const { access_token, expires_in } = response.data

	localStorage.setItem('access_token', access_token)
	localStorage.setItem(
		'token_expiry',
		(Date.now() + expires_in * 1000).toString()
	)

	return { access_token, expires_in }
}
