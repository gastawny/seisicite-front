import styled, { keyframes } from 'styled-components'

export function Loading({
  colors,
  bgColor,
  textColor,
  text,
  fontFamily,
}) {
  const font = fontFamily ? fontFamily : undefined

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center">
      <div className="flex text-center items-center justify-center min-h-screen">
        <Ring
          bgColor={bgColor}
          colors={colors}
          className="absolute w-56 h-56 rounded-full"
        ></Ring>
        <span
          style={{ color: textColor, fontFamily: font }}
          className="z-[100] text-xl uppercase tracking-[0.2em] font-medium"
        >
          {text}
        </span>
      </div>
    </div>
  )
}
const ringAnimte = colors => keyframes`
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px ${colors[0]};
  }
  33% {
    transform: rotate(120deg);
    box-shadow: 1px 5px 2px ${colors[1]};
  }
  66% {
    transform: rotate(240deg);
    box-shadow: 1px 5px 2px ${colors[2]};
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px ${colors[0]};
  }
`

const Ring = styled.div`
  animation: ${({ colors }) => ringAnimte(colors)} 1200ms linear infinite;
  background-color: ${({ bgColor }) => bgColor};

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`