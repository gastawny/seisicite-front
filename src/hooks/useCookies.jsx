import Cookies from 'universal-cookie'

export function useCookies() {
  const cookies = new Cookies()
  function getCookies(cookieName) {
    return cookies.get(cookieName)
  }

  function setCookies(cookieName, cookieValue) {
    cookies.set(cookieName, cookieValue)
  }

  return {
    getCookies,
    setCookies
  }
}
