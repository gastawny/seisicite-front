import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'

export function AppRoutes() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes >
  )
}