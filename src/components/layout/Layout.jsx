import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useState } from 'react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
        
        <main className="flex-1 w-full">
          <div className="container mx-auto px-4 py-8 page-container">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout