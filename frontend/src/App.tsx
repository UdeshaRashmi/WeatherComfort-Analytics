import React from 'react'
import './App.css'
import { LoginButton } from './auth/LoginButton'
import { LogoutButton } from './auth/LogoutButton'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Weather Comfort Dashboard</h1>
        <div className="flex gap-2">
          <LoginButton />
          <LogoutButton />
        </div>
      </header>

      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default App
