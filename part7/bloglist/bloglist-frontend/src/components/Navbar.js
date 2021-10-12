import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ handleLogout, user }) => {

  const linkStyle = {
    margin: '0px 5px' 
  }

  return (
    <div>
        <Link style={linkStyle} to="/blogs">blogs</Link> 
        <Link style={linkStyle} to="/users">users</Link> 
      <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
    </div>
  )
}

export default Navbar
