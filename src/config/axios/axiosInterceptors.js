import { useCookies } from 'hooks/useCookies'
import { axiosServer } from './axios'

export function defineInterceptors() {
  axiosServer.interceptors.response.use(
    (response) => {
      return response
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalReq = err?.config

        if (err?.response?.status === 401 && err?.config && !err?.config?._retry) {
          originalReq._retry = true
          originalReq.__isRetryRequest = true
          axiosServer(originalReq).then(resolve).catch(reject)

          const { getCookies, setCookies } = useCookies()
          const username = getCookies('user')
          const accessToken = getCookies('accessToken')

          const res = axiosServer(`/auth/refresh/${username}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setCookies('refreshToken', res.data.refreshToken)
            originalReq.headers['Authorization'] = `Bearer ${res.data.refreshToken}`
            return axiosServer(originalReq)
          })
          resolve(res)
        } else {
          reject(err)
        }
      })
    }
  )
}
