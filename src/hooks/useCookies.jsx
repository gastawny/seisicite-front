import Cookies from 'universal-cookie'

export function useCookies() {
  const cookies = new Cookies()
  function getCookies(cookieName) {
    return cookies.get(cookieName)
  }

  function setCookies(cookieName, cookieValue, options = {}) {
    cookies.set(cookieName, cookieValue, options)
  }

  function removeCookies(cookieName) {
    cookies.remove(cookieName)
  }

  return {
    getCookies,
    setCookies,
    removeCookies
  }
}
