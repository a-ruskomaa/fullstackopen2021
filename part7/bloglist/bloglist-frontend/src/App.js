import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import './App.css'
import { login, logout } from './reducers/loginReducer'
import Userlist from './components/Userlist'
import { getAllUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)

  useEffect(() => {
    blogService.setToken(user ? user.token : null)
  }, [user])

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  const handleLogin = async (userCredentials) => {
    dispatch(login(userCredentials))
  }

  const handleLogout = () => {
    dispatch(logout())
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
          <Userlist />
        </>
      )}
    </>
  )
}

export default App
