import { useCookies } from 'hooks/useCookies'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function sessionHOC(Component) {
  return function Wrapper(props) {
    const { getCookies } = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
      const token = getCookies('accessToken')

      if (!token) navigate('/')
    }, [])

    return <Component {...props} />
  }
}
