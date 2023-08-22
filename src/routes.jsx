import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Background } from 'components/Background'
import { Dashboard } from 'pages/Dashboard'

export function AppRoutes() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Background />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes >
  )
}