import { Route, Redirect } from 'react-router-dom'

const GuardedRoute = ({ user, redirect, children, ...args }) => {

  if (!user) {
    return redirect ? (<Redirect to="/login"></Redirect>) : null
  }

  return (<Route {...args}>
    {children}
  </Route>)
}

export default GuardedRoute
