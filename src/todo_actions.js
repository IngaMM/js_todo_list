import { Todo } from './todo'
import { saveToLocalStorage, clearContent } from './helper_functions'
import { showAllProjects } from './project_actions'
import { showFormEditTodo } from './show_form_edit_todo'
import { formatDistance } from 'date-fns'

function createNewTodo () {
  const title = document.getElementsByName('title')[0].value
  const description = document.getElementsByName('description')[0].value
  const dueDate = document.getElementsByName('dueDate')[0].value
  const priority = document.getElementsByName('priority')[0].value
  const project = document.getElementsByName('project')[0].value
  const todo = new Todo(title, description, dueDate, priority, project, false)
  todos.push(todo)
  saveToLocalStorage()
  showTodo(todo, todos.length - 1)
}

function showAllTodos () {
  const project = this.getAttribute('dataProject')
  const projectContainer = this.parentNode

  // Remove link to "Show all Todos"
  this.parentNode.removeChild(this)

  // Show link to "Hide all Todos"
  const hideAllT = document.createElement('span')
  hideAllT.setAttribute('class', 'hideAllTodos')
  hideAllT.setAttribute('dataProject', project)
  hideAllT.addEventListener('click', hideAllTodos)
  hideAllT.innerHTML = 'Hide all Todos'
  projectContainer.appendChild(hideAllT)

  // Show list of Todos
  todos.forEach((todo, todoIndex) => {
    if (todo.project === project) {
      const container = document.createElement('div')
      container.setAttribute('class', 'todoList')
      document.getElementById(project).appendChild(container)
      const title = document.createElement('span')
      title.setAttribute('class', 'todoTitle')
      title.innerHTML = todo.title
      let priorityColor = ''
      switch (todo.priority) {
        case 'low':
          priorityColor = 'green'
          break
        case 'medium':
          priorityColor = 'orange'
          break
        case 'high':
          priorityColor = 'red'
          break
      }
      title.style.color = priorityColor
      container.appendChild(title)
      const dueDate = document.createElement('span')
      dueDate.setAttribute('class', 'todoDueDate')
      dueDate.innerHTML = 'Due: ' + todo.dueDate
      container.appendChild(dueDate)

      // Show link for details
      const showTodoDetails = document.createElement('span')
      showTodoDetails.setAttribute('class', 'showTodoDetails')
      showTodoDetails.innerHTML = 'Show details'
      showTodoDetails.addEventListener('click', function () { showTodo(todo, todoIndex) }, false)
      container.appendChild(showTodoDetails)

      // Show link for edit
      const editTodo = document.createElement('span')
      editTodo.setAttribute('class', 'editTodo')
      editTodo.innerHTML = 'Edit'
      editTodo.addEventListener('click', function () { showFormEditTodo(todoIndex) }, false)
      container.appendChild(editTodo)

      // Show link for delete
      const deleteT = document.createElement('span')
      deleteT.setAttribute('class', 'deleteTodo')
      deleteT.innerHTML = 'Delete'
      deleteT.addEventListener('click', function () { deleteTodo(todo) }, false)
      container.appendChild(deleteT)
    }
  })
}

function hideAllTodos () {
  const project = this.getAttribute('dataProject')
  const projectContainer = this.parentNode

  // Remove link to "Hide all Todos" & list of all Todos
  while (projectContainer.childNodes.length > 2) {
    projectContainer.removeChild(projectContainer.lastChild)
  }

  // Show link to "Show all Todos"
  const showAllT = document.createElement('span')
  showAllT.setAttribute('class', 'showAllTodos')
  showAllT.setAttribute('dataProject', project)
  showAllT.addEventListener('click', showAllTodos)
  showAllT.innerHTML = 'Show all Todos'
  projectContainer.appendChild(showAllT)
}

function showTodo (todo, todoIndex) {
  clearContent()
  const todoContainer = document.createElement('div')
  todoContainer.id = 'todoContainer'
  document.getElementById('content').appendChild(todoContainer)

  // Title
  const header = document.createElement('h1')
  header.innerHTML = todo.title
  todoContainer.appendChild(header)

  // Description
  showTodoDetail(todo, 'description')

  // DueDate
  showTodoDetail(todo, 'dueDate')

  // Priority
  showTodoDetail(todo, 'priority')

  // Project
  showTodoDetail(todo, 'project')

  // Links for Edit and Delete
  const actionLinks = document.createElement('div')
  actionLinks.id = 'actionLinks'
  document.getElementById('content').appendChild(actionLinks)

  // Show link for edit
  const editT = document.createElement('span')
  editT.setAttribute('class', 'editTodo')
  editT.innerHTML = 'Edit'
  editT.addEventListener('click', function () { showFormEditTodo(todoIndex) }, false)
  actionLinks.appendChild(editT)

  // Show link for delete
  const deleteT = document.createElement('span')
  deleteT.setAttribute('class', 'deleteTodo')
  deleteT.innerHTML = 'Delete'
  deleteT.addEventListener('click', function () { deleteTodo(todo) }, false)
  actionLinks.appendChild(deleteT)
}

function showTodoDetail (todo, text) {
  const todoDetail = document.createElement('div')
  todoDetail.setAttribute('class', 'todoDetail')
  document.getElementById('todoContainer').appendChild(todoDetail)
  const todoDetailHeader = document.createElement('span')
  todoDetailHeader.setAttribute('class', 'todoDetailHeader')
  todoDetailHeader.innerHTML = text.charAt(0).toUpperCase() + text.slice(1) + ': '
  todoDetail.appendChild(todoDetailHeader)
  const todoDetailText = document.createElement('span')
  todoDetailText.setAttribute('class', 'todoDetailText')
  if (text === 'dueDate') {
    todoDetailText.innerHTML = todo[text] + ' (' + formatDistance(new Date(todo[text]), new Date(), { addSuffix: true }) + ')'
  } else {
    todoDetailText.innerHTML = todo[text]
  }
  if (text === 'priority') {
    let priorityColor = ''
    switch (todo.priority) {
      case 'low':
        priorityColor = 'green'
        break
      case 'medium':
        priorityColor = 'orange'
        break
      case 'high':
        priorityColor = 'red'
        break
    }
    todoDetailText.style.color = priorityColor
  }
  todoDetail.appendChild(todoDetailText)
}

function deleteTodo (todo) {
  const todoTitle = todo.title
  // Delete todo from todos array
  todos = todos.filter((todo) => {
    return (todo.title !== todoTitle)
  })
  saveToLocalStorage()
  showAllProjects()
}

function updateTodo () {
  const todoIndex = document.getElementsByName('todoIndex')[0].value
  todos[todoIndex].title = document.getElementsByName('title')[0].value
  todos[todoIndex].description = document.getElementsByName('description')[0].value
  todos[todoIndex].dueDate = document.getElementsByName('dueDate')[0].value
  todos[todoIndex].priority = document.getElementsByName('priority')[0].value
  todos[todoIndex].project = document.getElementsByName('project')[0].value
  saveToLocalStorage()
  showTodo(todos[todoIndex])
}

export { createNewTodo, showAllTodos, updateTodo }
