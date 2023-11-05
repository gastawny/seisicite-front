import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Background } from 'components/Background'
import { Dashboard } from 'pages/Dashboard'
import Questions from 'pages/Questions'

export function AppRoutes() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Background colors={['var(--primary)', 'var(--secondary)']} frequency={500} />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="questions/:id" element={<Questions />} />
      </Route>
    </Routes >
  )
}