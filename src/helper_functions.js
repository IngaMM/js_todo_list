import { Todo } from './todo'
import { Project } from './project'

function clearContent () {
  var list = document.getElementById('content')
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)
  }
}

function saveToLocalStorage () {
  localStorage.setItem('projects', JSON.stringify(projects))
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getFromLocalStorage () {
  projects = JSON.parse(localStorage.getItem('projects'))
  projects.forEach((project) => {
    Object.setPrototypeOf(project, Project.prototype)
  })
  todos = JSON.parse(localStorage.getItem('todos'))
  todos.forEach((todo) => {
    Object.setPrototypeOf(todo, Todo.prototype)
  })
}

export { clearContent, saveToLocalStorage, getFromLocalStorage }
