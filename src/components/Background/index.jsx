import { useCallback, useEffect, useState } from 'react'
import { keyframes, styled } from 'styled-components'

export function Background() {
  const [lines, setLines] = useState([])

  const createLine = useCallback(() => {
    const lineWidth = Math.random() * 12
    const animationDuration = Math.random() * 3
    const lineColor = Math.random() >= 0.5 ? '#0f9cd8' : '#ffcd01'

    const newLine = {
      id: Date.now(),
      width: 2 + lineWidth,
      left: Math.random() * window.innerWidth,
      duration: 2 + animationDuration,
      color: lineColor,
    }

    setLines((prevLines) => [...prevLines, newLine])

    setTimeout(() => {
      setLines((prevLines) => prevLines.filter((line) => line.id !== newLine.id))
    }, 5000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      createLine()
    }, 500)

    return () => clearInterval(interval)
  }, [createLine])

  return (
    <>
      {lines.map((line) => (
        <Line
          lineColor={line.color}
          key={line.id}
          style={{
            width: `${line.width}px`,
            left: `${line.left}px`,
            animationDuration: `${line.duration}s`,
          }}
        />
      ))}
    </>
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
  box-shadow:
    0 0 10px ${({ lineColor }) => lineColor},
    0 0 20px ${({ lineColor }) => lineColor},
    0 0 30px ${({ lineColor }) => lineColor},
    0 0 50px ${({ lineColor }) => lineColor};
  border-radius: 50%;
  animation: ${animate} 5s linear forwards;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 25%;
    width: 50%;
    height: 100vh;
    opacity: 0.5;
    background: linear-gradient(${({ lineColor }) => lineColor}, transparent);
  }
`