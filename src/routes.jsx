import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Dashboard } from 'pages/Dashboard'
import { Questions } from 'pages/Questions'
import { Header } from 'components/Header'
import { ChangePassword } from 'pages/ChangePassword'

export function AppRoutes() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route element={<Header />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="questions/:id" element={<Questions />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>
    </Routes>
  )
}
