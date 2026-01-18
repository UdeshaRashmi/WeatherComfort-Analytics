import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function LogoutButton() {
  const { logout } = useAuth0()
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
    >
      Logout
    </button>
  )
}

export default LogoutButton
