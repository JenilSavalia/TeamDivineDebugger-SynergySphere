// frontend/src/App.jsx
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
import ProtectedRoute from './utils/ProtectedRoute';

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
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['PROJECT_MANAGER', 'PROJECT_MEMBER']}>
                <ProjectList />
              </ProtectedRoute> 
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute allowedRoles={['PROJECT_MANAGER', 'PROJECT_MEMBER']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
