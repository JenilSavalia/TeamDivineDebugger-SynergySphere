import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/auth/AuthPage'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import VerifyOTP from './pages/auth/VerifyOTP'
import Dashboard from './pages/Dashboard/Dashboard'
import Resetpass from './pages/auth/Resetpass'
import Navbar from './pages/Navbar/Navbar'
import ProjectList from './pages/ProjectList/ProjectList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> Navbar outside Routes to remain consistent across pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Signup />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path='verify-otp' element={<VerifyOTP />} />
            <Route path='reset-password/:token' element={<Resetpass />} />
          </Route>
          <Route path='/dashboard' element={<ProjectList />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
