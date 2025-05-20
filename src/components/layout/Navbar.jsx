import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { HiOutlineMenu, HiX } from 'react-icons/hi'

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  return (
    <nav className="bg-gray-900/60 backdrop-blur-sm text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">Make It Human</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/pricing" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Pricing
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              Contact Us
            </NavLink>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <button 
                  className="text-sm hover:text-gray-300"
                  onClick={toggleSidebar}
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="btn btn-accent"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-sm px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            end
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/pricing" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </NavLink>
          
          {currentUser ? (
            <>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => {
                  toggleSidebar()
                  setMobileMenuOpen(false)
                }}
              >
                Dashboard
              </button>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 bg-red-700 hover:bg-red-800"
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar