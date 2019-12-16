import { Project } from './project'
import { clearContent, saveToLocalStorage } from './helper_functions'
import { showAllTodos } from './todo_actions'

function createDefaultProject () {
  const project = new Project('My Project')
  projects.push(project)
  saveToLocalStorage()
}

function createNewProject () {
  const title = document.getElementsByName('title')[0].value
  const projectTitles = projects.map((project) => project.title)
  // Do not allow identical project titles
  if (projectTitles.indexOf(title) !== -1) {
    alert(title + ' alread exists. Choose another name!')
  } else {
    const project = new Project(title)
    projects.push(project)
    saveToLocalStorage()
    showAllProjects()
  }
}

function showAllProjects () {
  clearContent()
  const list = document.createElement('div')
  list.id = 'projectsList'
  document.getElementById('content').appendChild(list)
  projects.forEach((project) => {
    const projectContainer = document.createElement('div')
    projectContainer.id = project.title
    projectContainer.setAttribute('class', 'projectContainer')
    const projectTitle = document.createElement('span')
    projectTitle.innerHTML = project.title
    projectContainer.appendChild(projectTitle)

    const deleteP = document.createElement('span')
    deleteP.setAttribute('class', 'deleteProject')
    deleteP.setAttribute('dataProject', project.title)
    deleteP.addEventListener('click', deleteProject)
    if (project.title === 'My Project') {
      deleteP.setAttribute('class', 'invisible') // No delete option for default project
    }
    deleteP.innerHTML = 'Delete Project'
    projectContainer.appendChild(deleteP)

    const showAllT = document.createElement('span')
    showAllT.setAttribute('class', 'showAllTodos')
    showAllT.setAttribute('dataProject', project.title)
    showAllT.addEventListener('click', showAllTodos)
    showAllT.innerHTML = 'Show all Todos'
    projectContainer.appendChild(showAllT)
    document.getElementById('content').appendChild(projectContainer)
  })
}

function deleteProject () {
  const projectTitle = this.getAttribute('dataProject')

  // Delete project from projects array
  projects = projects.filter((project) => {
    return (project.title !== projectTitle)
  })

  // Delete all todos for this project
  todos = todos.filter((todo) => {
    return (todo.project !== projectTitle)
  })

  saveToLocalStorage()
  showAllProjects()
}

export { createDefaultProject, createNewProject, showAllProjects }
