import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  showNotification
} from './reducers/notificationReducer'
import { getAllBlogs } from './reducers/blogReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(loginService.getUserFromLocalStorage())

  useEffect(() => {
    blogService.setToken(user ? user.token : null)
  }, [user])

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      setUser(user)
    } catch (exception) {
      dispatch(showNotification('wrong credentials', 'error'))
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    dispatch(showNotification('logged out', 'info'))
  }

  return (
    <>
      <h1>Blogs</h1>

      <Notification />

      {user === null ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Bloglist user={user} />
        </>
      )}
    </>
  )
}

export default App
