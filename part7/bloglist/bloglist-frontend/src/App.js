import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Bloglist from './components/blogs/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import Header from './components/Header'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import './App.css'
import { login, logout } from './reducers/loginReducer'
import Userlist from './components/users/Userlist'
import { getAllUsers } from './reducers/userReducer'
import AuthGuard from './helpers/AuthGuard'
import GuardedRoute from './helpers/GuardedRoute'
import Userdisplay from './components/users/Userdisplay'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const users = useSelector(state => state.users)

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
      <AuthGuard user={user} redirect={false}>
        <Header handleLogout={handleLogout} user={user} />
      </AuthGuard>

      <Switch>
        <Route path="/login">
          {user ?
            <Redirect to="/" /> :
            <Login handleLogin={handleLogin} /> }
        </Route>

          <GuardedRoute user={user} redirect={true} path="/blogs">
              <Bloglist user={user} />
          </GuardedRoute>

          <GuardedRoute user={user} redirect={true} path="/users/:id" render={({ match }) => (
              <Userdisplay user={users.find(user => user.id === match.params.id)}/>
          )}
          />

          <GuardedRoute user={user} redirect={true} path="/users">
            <Userlist users={users} />
          </GuardedRoute>

          <GuardedRoute user={user} redirect={true} path="/">
            <Redirect to="/blogs" />
          </GuardedRoute>

      </Switch>

    </>
  )
}

export default App
