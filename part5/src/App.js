import React, { useState } from 'react'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import Login from './components/Login'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage} />
      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <Bloglist />
      )}
    </>
  )
}

export default App
