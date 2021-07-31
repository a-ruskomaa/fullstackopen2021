import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [user, setUser] = useState(loginService.getUserFromLocalStorage())
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
    } else {
      blogService.setToken(null)
    }
  }, [user])

  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  return (
    <>
      <h1>Blogs</h1>

      <Notification message={errorMessage} className="error" />
      {user === null ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Bloglist />
        </>
      )}
    </>
  )
}

export default App
