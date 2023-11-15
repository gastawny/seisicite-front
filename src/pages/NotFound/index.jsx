import { ReactComponent as Svg404 } from 'assets/svgs/404.svg'
import { Background } from 'components/Background'
import { useNavigate } from 'react-router'

export function NotFound() {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/')
  }

  return (
    <Background colors={['var(--primary)', 'var(--secondary)']} frequency={500}>
      <section className="relative min-h-screen w-full flex justify-center items-center">
        <button
          className="bg-primary text-white font-bold py-8 px-16 rounded-lg absolute top-10 left-10 text-3xl"
          onClick={handleClick}
        >
          Voltar
        </button>
        <div className="shadow flex items-center flex-col justify-center gap-8 absolute rounded-lg w-5/6 md:w-2/5 lg:w-1/2 2xl:w-1/3 h-1/2 md:h-3/5 2xl:h-3/5 bg-bg-secondary-color z-50 p-10 box-border">
          <Svg404 className="w-10/6 lg:w-6/4" />
          <h1 className="text-2xl lg:text-4xl text-white text-center font-bold">
            Oops, página não encontrada
          </h1>
        </div>
      </section>
    </Background>
  )
}
