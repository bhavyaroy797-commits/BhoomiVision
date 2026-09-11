import React from 'react'
import { AuthProvider } from './auth/AuthContext'
import AppRoutes from './router/AppRoutes'

export const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App