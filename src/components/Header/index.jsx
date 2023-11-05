import { useCookies } from 'hooks/useCookies'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { sessionHOC } from 'services/auth/sessionHOC'

function Header() {
  const { removeCookies } = useCookies()
  const navigate = useNavigate()

  function onExit() {
    removeCookies('accessToken')
    removeCookies('refreshToken')
    removeCookies('user')

    navigate('/')
  }

  return (
    <>
      <header className="absolute bg-zinc-950 bg-opacity-40 flex justify-between items-center h-24 px-6 py-4 w-full">
        <img className='h-1/2 lg:h-full' src="/assets/images/logo.png" />
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 text-white font-semibold tracking-wider text-xl lg:text-2xl">
          <Link to='/dashboard' className='duration-300 hover:text-primary'>Dashboard</Link>
          <button onClick={onExit} className='duration-300 hover:text-primary'>Sair</button>
        </div>
      </header>
      <Outlet />
    </>
  )
}

const HeaderWrapper = sessionHOC(Header)
export { HeaderWrapper as Header }
