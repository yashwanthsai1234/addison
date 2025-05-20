import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'
import { useCredits } from '../context/CreditContext'
import { HiOutlineTrash } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { projects, deleteProject } = useProjects()
  const { credits } = useCredits()
  const [selectedProject, setSelectedProject] = useState(null)
  const location = useLocation()
  
  // Get project from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const projectId = params.get('project')
    
    if (projectId) {
      const project = projects.find(p => p.id === projectId)
      if (project) {
        setSelectedProject(project)
      }
    }
  }, [location.search, projects])
  
  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }
  
  const handleDeleteProject = (id, e) => {
    e.stopPropagation()
    deleteProject(id)
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null)
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <div className="flex items-center">
          <span className="text-gray-600">Available Credits:</span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {credits}
          </span>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Saved Projects</h2>
            </div>
            <div className="p-4">
              {projects.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className={`py-3 px-2 cursor-pointer hover:bg-gray-50 rounded transition-colors ${
                        selectedProject && selectedProject.id === project.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {project.originalText.substring(0, 30)}
                            {project.originalText.length > 30 ? '...' : ''}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <button
                            className="ml-2 p-1 text-gray-400 hover:text-error-500 transition-colors"
                            onClick={(e) => handleDeleteProject(project.id, e)}
                            title="Delete project"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No projects yet</p>
                  <p className="text-sm mt-2">
                    Humanize some text to see your projects here
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-3"
        >
          {selectedProject ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Project Details</h2>
                <span className="text-xs text-gray-500">
                  {new Date(selectedProject.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Original AI Text</h3>
                  <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedProject.originalText}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Humanized Text</h3>
                  <div className="p-4 bg-primary-50 rounded-md border border-primary-100">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedProject.humanizedText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No Project Selected</h3>
              <p className="text-gray-500">
                Select a project from the list to view its details
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard