// Create form element
function createFormElement (id, action) {
  const form = document.createElement('form')
  form.id = id
  document.getElementById('content').appendChild(form)
  form.setAttribute('action', '#')
  form.setAttribute('onsubmit', action)
}

// Create form header
function createFormHeader (text, parentId) {
  const header = document.createElement('h1')
  header.innerHTML = text
  document.getElementById(parentId).appendChild(header)
}

// Create container, label and text input field (if input = true)
function createFormInput (text, parentId, textInput = true) {
  // Container
  const formContainer = document.createElement('div')
  formContainer.setAttribute('class', 'formContainer')
  const id = 'formContainer' + text.charAt(0).toUpperCase() + text.slice(1)
  formContainer.id = id
  document.getElementById(parentId).appendChild(formContainer)

  // Label
  const label = document.createElement('label')
  label.innerHTML = text.charAt(0).toUpperCase() + text.slice(1)
  label.setAttribute('for', text)
  formContainer.appendChild(label)

  // Input field
  if (textInput) {
    const inputField = document.createElement('input')
    inputField.setAttribute('type', 'text')
    inputField.id = text
    inputField.setAttribute('class', 'inputField')
    inputField.setAttribute('name', text)
    formContainer.appendChild(inputField)
  }
}

// Create submit button
function createFormSubmit (text, id, parentId) {
  // Container
  const formContainer = document.createElement('div')

  formContainer.setAttribute('class', 'formContainer')
  formContainer.id = 'formContainerSubmit'
  document.getElementById(parentId).appendChild(formContainer)

  // Button
  const inputField = document.createElement('input')
  inputField.setAttribute('type', 'submit')
  inputField.id = id
  inputField.setAttribute('value', text)
  document.getElementById('formContainerSubmit').appendChild(inputField)
}

export { createFormInput, createFormElement, createFormHeader, createFormSubmit }
