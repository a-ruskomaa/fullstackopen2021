import React from 'react'

const Header = ({ handleLogout, user }) => {

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Header
