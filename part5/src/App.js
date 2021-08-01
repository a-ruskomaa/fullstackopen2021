import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [user, setUser] = useState(loginService.getUserFromLocalStorage())
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.setToken(user ? user.token : null)
  }, [user])

  const displayNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      setUser(user)
    } catch (exception) {
      displayNotification('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    displayNotification('logged out', 'info')
  }

  return (
    <>
      <h1>Blogs</h1>

      {notification ? (
        <Notification message={notification.message} type={notification.type} />
      ) : null}

      {user === null ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Bloglist displayNotification={displayNotification} user={user} />
        </>
      )}
    </>
  )
}

export default App
