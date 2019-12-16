import { clearContent } from './helper_functions'
import { createFormElement, createFormHeader, createFormInput, createFormSubmit } from './helper_functions_form'

function showFormNewProject () {
  clearContent()
  createFormElement('newProject', 'createNewProject();return false')
  createFormHeader('New Project', 'newProject')

  // Create input element for title
  createFormInput('title', 'newProject')

  // Create submit button
  createFormSubmit('Create new Project', 'newProjectCreate', 'newProject')
};

export { showFormNewProject }
