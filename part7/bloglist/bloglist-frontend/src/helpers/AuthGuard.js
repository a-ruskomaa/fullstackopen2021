import { Redirect } from 'react-router-dom'

const AuthGuard = ({ user, redirect, children }) => {
  if (!user) {
    return redirect ? (<Redirect to="/login"></Redirect>) : null
  }

  return children
}

export default AuthGuard
