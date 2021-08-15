const username = 'testUser'
const name = 'Test User'
const password = 'testpassword'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username, name, password })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#login-input-username').should('exist')
    cy.get('#login-input-password').should('exist')
    cy.get('#login-button-login').should('exist')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#login-input-username').type(username)
      cy.get('#login-input-password').type(password)
      cy.get('#login-button-login').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#login-input-username').type('wrong')
      cy.get('#login-input-password').type('wrong')
      cy.get('#login-button-login').click()
      cy.contains('wrong credentials')
    })
  })
})