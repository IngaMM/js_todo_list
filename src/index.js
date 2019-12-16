import { showFormNewTodo } from './show_form_new_todo'
import { showFormNewProject } from './show_form_new_project'
import { createNewTodo, updateTodo } from './todo_actions'
import { createDefaultProject, createNewProject, showAllProjects } from './project_actions'
import { getFromLocalStorage } from './helper_functions'

window.createNewTodo = createNewTodo
window.createNewProject = createNewProject
window.updateTodo = updateTodo

const projects = []
const todos = []

window.projects = projects
window.todos = todos

if (!localStorage.getItem('projects')) {
  createDefaultProject()
} else {
  getFromLocalStorage()
}

document.getElementById('navNewTodo').addEventListener('click', showFormNewTodo)
document.getElementById('navNewProject').addEventListener('click', showFormNewProject)
document.getElementById('navShowAllProjects').addEventListener('click', showAllProjects)
