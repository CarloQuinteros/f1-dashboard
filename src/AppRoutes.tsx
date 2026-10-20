import { Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { NotFound } from './components/NotFound'
import { DriverPage } from './pages/DriverPage'
import { HomePage } from './pages/HomePage'
import { TeamPage } from './pages/TeamPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers/:driverId" element={<DriverPage />} />
        <Route path="/teams/:teamId" element={<TeamPage />} />
        <Route path="*" element={<NotFound message="Page not found" />} />
      </Route>
    </Routes>
  )
}
