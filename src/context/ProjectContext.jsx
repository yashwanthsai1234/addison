import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext'

// Create context
const ProjectContext = createContext()

// Custom hook to use the project context
export const useProjects = () => {
  return useContext(ProjectContext)
}

export const ProjectProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState([])

  // Load projects from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const userProjects = localStorage.getItem(`projects_${currentUser.id}`)
      if (userProjects) {
        setProjects(JSON.parse(userProjects))
      } else {
        setProjects([])
      }
    } else {
      // Use cache for non-logged in users
      const guestProjects = localStorage.getItem('guest_projects')
      if (guestProjects) {
        setProjects(JSON.parse(guestProjects))
      } else {
        setProjects([])
      }
    }
  }, [currentUser])

  // Save project
  const saveProject = (originalText, humanizedText) => {
    const newProject = {
      id: Date.now().toString(),
      originalText,
      humanizedText,
      createdAt: new Date().toISOString()
    }
    
    const updatedProjects = [newProject, ...projects]
    setProjects(updatedProjects)
    
    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`projects_${currentUser.id}`, JSON.stringify(updatedProjects))
    } else {
      localStorage.setItem('guest_projects', JSON.stringify(updatedProjects))
    }
    
    return newProject
  }

  // Delete project
  const deleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id)
    setProjects(updatedProjects)
    
    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`projects_${currentUser.id}`, JSON.stringify(updatedProjects))
    } else {
      localStorage.setItem('guest_projects', JSON.stringify(updatedProjects))
    }
  }

  const value = {
    projects,
    saveProject,
    deleteProject
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}