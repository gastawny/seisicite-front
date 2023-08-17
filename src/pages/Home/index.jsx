import { Background } from '../../components/Background'
import { Form } from '../../components/Form'

export function Home() {
  return (
    <>
      <Background />
      <img className='absolute z-20 left-1/2 -translate-x-1/2 top-16 sm:top-8 w-4/5 sm:w-1/3' src="/assets/images/logo.png" />
      <div className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Form />
      </div>
    </>
  )
}
