import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function LoginButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="px-3 py-1 bg-blue-600 text-white rounded"
    >
      Login
    </button>
  )
}

export default LoginButton
