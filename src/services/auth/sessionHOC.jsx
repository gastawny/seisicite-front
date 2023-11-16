import { useCookies } from 'hooks/useCookies'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function sessionHOC(Component) {
  return function Wrapper(props) {
    const { getCookies, removeCookies } = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
      const accessToken = getCookies('accessToken')
      const refreshToken = getCookies('refreshToken')
      const user = getCookies('user')

      if (!accessToken || !refreshToken || !user) {
        removeCookies('accessToken')
        removeCookies('refreshToken')
        removeCookies('user')
        navigate('/')
      }
    }, [])

    return <Component {...props} />
  }
}
