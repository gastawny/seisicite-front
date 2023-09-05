export function sessionHOC(Component) {
  return function Wrapper (props) {
    return <Component {...props} />
  }
}