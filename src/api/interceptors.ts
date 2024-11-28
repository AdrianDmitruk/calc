import axios, { CreateAxiosDefaults } from 'axios'
import { constants, getToken } from '../services'

const options: CreateAxiosDefaults = {
	baseURL: constants.BASE_URL,
}

const authOptions: CreateAxiosDefaults = {
	baseURL: constants.TOKEN_URL,
}

const axiosBase = axios.create(options)

const axiosAuth = axios.create(authOptions)

axiosBase.interceptors.request.use(
	async config => {
		const token = localStorage.getItem('access_token')
		const expiry = localStorage.getItem('token_expiry')

		if (token && expiry && Date.now() < parseInt(expiry)) {
			config.headers.set('Authorization', `Bearer ${token}`)
		} else {
			const { access_token } = await getToken()
			config.headers.set('Authorization', `Bearer ${access_token}`)
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export { axiosBase, axiosAuth }
