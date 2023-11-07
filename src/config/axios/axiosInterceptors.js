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

        const reqStatus = ['400', '401', '403', '404', '500']

        if (reqStatus.includes(`${err?.response?.status}`) && err?.config && !err?.config?._retry) {
          originalReq._retry = true
          originalReq.__isRetryRequest = true
          axiosServer(originalReq).then(resolve).catch(reject)

          const { getCookies, setCookies } = useCookies()
          const user = getCookies('user')
          const accessToken = getCookies('accessToken')

          const res = axiosServer(`/auth/refresh/${user?.username}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            setCookies('refreshToken', res.data.refreshToken)
            setCookies('accessToken', res.data.accessToken)
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
