import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [user, setUser] = useState(loginService.getFromLocalStorage())
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage} className="error" />
      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <>
          <div>
            <p>{user.name} logged in</p>
          </div>
          <Bloglist />
        </>
      )}
    </>
  )
}

export default App
