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
      cy.contains(title)
      cy.contains(author)
    })

    it('A blog can be liked', function() {
      cy.createBlog(title, author, url, likes)
        .then(res => {
          const blogId = res.body.id
          cy.visit('http://localhost:3000')

          cy.get(`#blog-${blogId}-button-toggle`).click()
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains(`likes ${likes + 1}`)
        })
    })

    it('A blog can be deleted', function() {
      cy.createBlog(title, author, url, likes)
        .then(res => {
          const blogId = res.body.id
          cy.visit('http://localhost:3000')

          cy.contains(title)
          cy.contains(author)
          cy.get(`#blog-${blogId}-button-toggle`).click()
          cy.get(`#blog-${blogId}-button-delete`).click()
          cy.contains(title).should('not.exist')
          cy.contains(author).should('not.exist')
        })
    })

    it('Blogs are sorted by likes', function() {
      // Add initial blogs
      cy.createBlog('title 1', 'author 1', url, 0)
      cy.createBlog('title 2', 'author 2', url, 2)
      cy.createBlog('title 3', 'author 3', url, 3)

      cy.visit('http://localhost:3000')
      cy.get('.blog-item')
        .then(items => {
          // Verify initial order
          expect(items[0]).to.contain('title 3')
          expect(items[1]).to.contain('title 2')
          expect(items[2]).to.contain('title 1')
        })
      cy.createBlog('title 4', 'author 1', url, 1).then(
        res => {
          const blogId = res.body.id
          cy.visit('http://localhost:3000')

          cy.get('.blog-item')
            .then(items => {
              // Verify order after addition
              expect(items[0]).to.contain('title 3')
              expect(items[1]).to.contain('title 2')
              expect(items[2]).to.contain('title 4')
              expect(items[3]).to.contain('title 1')
            })

          // Like 4 times
          cy.get(`#blog-${blogId}-button-toggle`).click()
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains('title 4 author 1').siblings().contains('likes 2')
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains('title 4 author 1').siblings().contains('likes 3')
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains('title 4 author 1').siblings().contains('likes 4')
          cy.get(`#blog-${blogId}-button-like`).click()
          cy.contains('title 4 author 1').siblings().contains('likes 5')

          cy.get('.blog-item')
            .then(items => {
              // Verify order after likes
              expect(items[0]).to.contain('title 4')
              expect(items[1]).to.contain('title 3')
              expect(items[2]).to.contain('title 2')
              expect(items[3]).to.contain('title 1')
            })
        }
      )
    })
  })
})
