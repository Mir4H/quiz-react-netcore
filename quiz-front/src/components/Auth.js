import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useStateContext from '../hooks/useStateContext'

const Auth = () => {
  const { context } = useStateContext()
  return context.playerId == 0 ? <Navigate to="/" /> : <Outlet />
}

export default Auth
