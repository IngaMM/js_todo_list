import { clearContent } from './helper_functions'
import { createFormElement, createFormHeader, createFormInput, createFormSubmit } from './helper_functions_form'

function showFormEditTodo (todoIndex) {
  clearContent()
  createFormElement('editTodo', 'updateTodo();return false')
  createFormHeader('Edit Todo', 'editTodo')

  // Create input elements for title, description and due date
  createFormInput('title', 'editTodo')
  createFormInput('description', 'editTodo')

  // Set old values as default values
  document.getElementById('title').value = todos[todoIndex].title
  document.getElementById('description').value = todos[todoIndex].description

  // Create input element (date field) for dueDate
  // Container & label
  createFormInput('dueDate', 'editTodo', false)
  // Date field
  const inputField = document.createElement('input')
  inputField.setAttribute('type', 'date')
  inputField.id = 'dueDate'
  inputField.setAttribute('class', 'dueDate')
  inputField.setAttribute('name', 'dueDate')
  document.getElementById('formContainerDueDate').appendChild(inputField)
  console.log(todos[todoIndex].dueDate)
  document.getElementById('dueDate').value = todos[todoIndex].dueDate

  // Create input element (drop down menu) for priority
  // Container & label
  createFormInput('priority', 'editTodo', false)
  // Dropw down menu
  let select = document.createElement('select')
  select.id = 'priority'
  select.setAttribute('name', 'priority')
  let option = document.createElement('option')
  option.text = 'low'
  select.add(option)
  option = document.createElement('option')
  option.text = 'medium'
  select.add(option)
  option = document.createElement('option')
  option.text = 'high'
  select.add(option)
  document.getElementById('formContainerPriority').appendChild(select)
  document.getElementById('priority').value = todos[todoIndex].priority

  // Create input element (drop down menu) for project
  // Container & label
  createFormInput('project', 'editTodo', false)
  // Dropw down menu
  select = document.createElement('select')
  select.id = 'project'
  select.setAttribute('name', 'project')
  projects.forEach((project) => {
    const option = document.createElement('option')
    option.text = project.title
    select.add(option)
  })
  document.getElementById('formContainerProject').appendChild(select)
  document.getElementById('project').value = todos[todoIndex].project

  // Create hidden input element for todo index
  const formContainer = document.createElement('div')
  formContainer.setAttribute('class', 'formContainer')
  const id = 'formContainerTodoIndex'
  formContainer.id = id
  document.getElementById('editTodo').appendChild(formContainer)
  const index = document.createElement('input')
  index.setAttribute('type', 'hidden')
  index.setAttribute('name', 'todoIndex')
  index.setAttribute('value', todoIndex)
  formContainer.appendChild(index)

  // Create submit button
  createFormSubmit('Update Todo', 'TodoUpdate', 'editTodo')
};

export { showFormEditTodo }
