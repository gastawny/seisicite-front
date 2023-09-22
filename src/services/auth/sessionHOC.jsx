import { useCookies } from 'hooks/useCookies'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function sessionHOC(Component) {
  return function Wrapper(props) {
    const { getCookies } = useCookies()
    const navigate = useNavigate()

    useEffect(async () => {
      const token = getCookies('auth')

      if (!token) navigate('/')

      // const response = await fetch('/api/session')
      // const data = await response.json()
      // manipulate data

    }, [])

    return <Component {...props} />
  }
}