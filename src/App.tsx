import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DriverDirectory } from './components/DriverDirectory'

// Routes for the profile pages are added with tasks 5 and 6.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DriverDirectory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
