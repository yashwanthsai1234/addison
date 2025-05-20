import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Register from './pages/Register'
import ContactUs from './pages/ContactUs'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App