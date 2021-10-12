import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import Header from './components/Header'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import './App.css'
import { login, logout } from './reducers/loginReducer'
import Userlist from './components/Userlist'
import { getAllUsers } from './reducers/userReducer'
import AuthGuard from './helpers/AuthGuard'

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
      <Switch>
        <Route path="/login">
          {user ?
            <Redirect to="/" /> :
            <Login handleLogin={handleLogin} /> }
        </Route>

        <AuthGuard user={user}>
          <Header handleLogout={handleLogout} user={user} />

          <Route path="/blogs">
            <Bloglist user={user} />
          </Route>

          <Route path="/users">
            <Userlist />
          </Route>

          <Route path="/">
            <Redirect to="/blogs" />
          </Route>

        </AuthGuard>
      </Switch>

    </>
  )
}

export default App
