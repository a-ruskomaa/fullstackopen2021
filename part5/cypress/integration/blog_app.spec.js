const username = 'testUser'
const name = 'Test User'
const password = 'testpassword'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser(username, name, password)
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

  describe('When logged in', function() {
    const title = 'Test title'
    const author = 'Test author'
    const url = 'www.fi'
    const likes = 0

    beforeEach(function() {
      cy.login(username, password)
    })

    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.get('#bloglist-button-new').click()
      cy.get('#newblog-input-title').type(title)
      cy.get('#newblog-input-author').type(author)
      cy.get('#newblog-input-url').type(url)
      cy.get('#newblog-button-save').click()
      cy.contains('title')
      cy.contains('author')
    })
    
    it('A blog can be liked', function() {
      let blogId
      cy.createBlog(title, author, url, likes)
        .then(res => {
          blogId = res.body.id         
          cy.visit('http://localhost:3000')
    
          cy.get(`#blog-${blogId}-button-toggle`).click()
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains(`likes ${likes + 1}`)
        })
    })
  })
})