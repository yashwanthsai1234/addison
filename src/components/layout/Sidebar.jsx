import { useEffect, useRef } from 'react'
import { useProjects } from '../../context/ProjectContext'
import { HiOutlineX } from 'react-icons/hi'
import { FaRegFileAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = ({ isOpen, toggle }) => {
  const { projects } = useProjects()
  const sidebarRef = useRef(null)
  const navigate = useNavigate()
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggle()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggle])
  
  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  const handleProjectClick = (id) => {
    navigate(`/dashboard?project=${id}`)
    toggle()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggle}
          />
          
          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Past Projects</h2>
              <button 
                onClick={toggle}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              {projects.length > 0 ? (
                <ul className="space-y-2">
                  {projects.map((project) => (
                    <li 
                      key={project.id}
                      className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <div className="flex items-center">
                        <FaRegFileAlt className="h-4 w-4 mr-2 text-gray-500" />
                        <div className="overflow-hidden">
                          <p className="font-medium truncate">
                            {project.originalText.substring(0, 30)}
                            {project.originalText.length > 30 ? '...' : ''}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaRegFileAlt className="h-8 w-8 mx-auto mb-2" />
                  <p>No projects yet</p>
                  <p className="text-sm mt-2">Your past projects will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar