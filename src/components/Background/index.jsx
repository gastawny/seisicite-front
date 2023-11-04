import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { keyframes, styled } from 'styled-components'

function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

export function Background({ colors, frequency }) {
  const [lines, setLines] = useState([])
  const [isTabVisible, setIsTabVisible] = useState(true)

  const createLine = useCallback(() => {
    const lineWidth = Math.random() * 12
    const animationDuration = Math.random() * 1
    const lineColor = colors[randomIndex(colors)]

    const newLine = {
      id: Date.now(),
      width: 2 + lineWidth,
      left: Math.random() * window.innerWidth,
      duration: 2 + animationDuration,
      color: lineColor,
    }

    setLines((prevLines) => [...prevLines, newLine])
  }, [colors])

  const removeLine = useCallback((lineId) => {
    setLines((prevLines) => prevLines.filter((line) => line.id !== lineId))
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabVisible(false)
      } else {
        setIsTabVisible(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    let interval

    if (isTabVisible) {
      interval = setInterval(() => {
        createLine()
      }, frequency)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [createLine, isTabVisible, frequency])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex gap-40 flex-col">
      <img className='absolute z-20 left-1/2 -translate-x-1/2 top-16 sm:top-8 w-4/5 sm:w-1/4 2xl:1/3' src="/assets/images/logo.png" />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        {lines.map((line) => (
          <Line
            lineColor={line.color}
            key={line.id}
            style={{
              width: `${line.width}px`,
              left: `${line.left}px`,
              animationDuration: `${line.duration}s`,
            }}
            onAnimationEnd={() => removeLine(line.id)}
          />
        ))}
      </div>
      <Outlet />
    </div>
  )
}

const animate = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
`

const Line = styled.div`
  position: absolute;
  bottom: 0;
  width: 20px;
  aspect-ratio: 1/1;
  background: ${({ lineColor }) => lineColor};
  box-shadow: 0 0 10px ${({ lineColor }) => lineColor},
    0 0 20px ${({ lineColor }) => lineColor},
    0 0 30px ${({ lineColor }) => lineColor},
    0 0 50px ${({ lineColor }) => lineColor};
  border-radius: 50%;
  animation: ${animate} 5s linear forwards;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 25%;
    width: 50%;
    height: 100vh;
    opacity: 0.5;
    background: linear-gradient(${({ lineColor }) => lineColor}, transparent);
  }
`