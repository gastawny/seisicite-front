import { useState, useEffect } from 'react'

export function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer

    if (isRunning) {
      timer = setInterval(() => {
        setTotalSeconds(totalSeconds + 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isRunning, totalSeconds])

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setTotalSeconds(0)
    setIsRunning(false)
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="bg-zinc-950 bg-opacity-40 text-white rounded-md p-4 flex flex-col w-full text-xl gap-2">
      <div className="text-primary text-center text-6xl">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="flex gap-4 mx-auto">
        {isRunning ? (
          <button onClick={stopTimer} className="duration-300 hover:text-primary">
            Parar
          </button>
        ) : (
          <button onClick={startTimer} className="duration-300 hover:text-primary">
            Iniciar
          </button>
        )}
        <button onClick={resetTimer} className="duration-300 hover:text-primary">
          Zerar
        </button>
      </div>
    </div>
  )
}
