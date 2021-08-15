describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#login-input-username').should('exist')
    cy.get('#login-input-password').should('exist')
    cy.get('#login-button-login').should('exist')
  })
})