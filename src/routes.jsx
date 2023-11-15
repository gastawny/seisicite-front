import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Dashboard } from 'pages/Dashboard'
import { Questions } from 'pages/Questions'
import { Header } from 'components/Header'
import { ChangePassword } from 'pages/ChangePassword'
import { NotFound } from 'pages/NotFound'

export function AppRoutes() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route element={<Header />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="questions/:id" element={<Questions />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
