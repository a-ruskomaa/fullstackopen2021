import { Redirect } from 'react-router-dom'

const AuthGuard = ({ user, children }) => {
  if (!user) {
    return (<Redirect to="/login"></Redirect>)
  }

  return children
}

export default AuthGuard
