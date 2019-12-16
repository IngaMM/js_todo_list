import { clearContent } from './helper_functions'
import { createFormElement, createFormHeader, createFormInput, createFormSubmit } from './helper_functions_form'

function showFormNewTodo () {
  clearContent()
  createFormElement('newTodo', 'createNewTodo();return false')
  createFormHeader('New Todo', 'newTodo')

  // Create input elements for title, description
  createFormInput('title', 'newTodo')
  createFormInput('description', 'newTodo')

  // Create input element (date field) for dueDate
  // Container & label
  createFormInput('dueDate', 'newTodo', false)
  // Date field
  const inputField = document.createElement('input')
  inputField.setAttribute('type', 'date')
  inputField.id = 'dueDate'
  inputField.setAttribute('class', 'dueDate')
  inputField.setAttribute('name', 'dueDate')
  document.getElementById('formContainerDueDate').appendChild(inputField)

  // Create input element (drop down menu) for priority
  // Container & label
  createFormInput('priority', 'newTodo', false)
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

  // Create input element (drop down menu) for project
  // Container & label
  createFormInput('project', 'newTodo', false)
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

  // Create submit button
  createFormSubmit('Create new Todo', 'newTodoCreate', 'newTodo')
};

export { showFormNewTodo }
