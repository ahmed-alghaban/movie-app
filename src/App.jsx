import React from 'react'
import { MovieContextProvider } from './context/MovieContext'
import { ThemeProvider } from './context/ThemeContext'
import Router from './router/Router'
import { AuthContextProvider } from './context/AuthContext'


const App = () => {
  return (
    <ThemeProvider>
      <MovieContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </MovieContextProvider>
    </ThemeProvider>

  )
}

export default App
