import { Route, Routes } from 'react-router-dom'
import { DriverPage } from './pages/DriverPage'
import { HomePage } from './pages/HomePage'
import { TeamPage } from './pages/TeamPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/drivers/:driverId" element={<DriverPage />} />
      <Route path="/teams/:teamId" element={<TeamPage />} />
    </Routes>
  )
}
