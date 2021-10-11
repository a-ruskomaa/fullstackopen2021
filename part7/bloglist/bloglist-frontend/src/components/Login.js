import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const userCredentials = {
      username,
      password,
    }
    handleLogin(userCredentials)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label>
            username
            <input
              id="login-input-username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div className="form-item">
          <label>
            password
            <input
              id="login-input-password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button id="login-button-login" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
