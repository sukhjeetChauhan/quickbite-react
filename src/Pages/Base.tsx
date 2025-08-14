import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navigation from '../Components/Navigation'
import { useNavigate } from 'react-router-dom'

export default function Base() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,

    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0()

  // const signup = () => login({ authorizationParams: { screen_hint: 'signup' } })

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } })

  // Navigation
  const navigate = useNavigate()

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-2xl font-bold text-orange-500">Loading....</p>
      </div>
    )
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <div className="w-full flex justify-between items-center pt-8 h-24 border-b-2 border-gray-300 p-8">
        <div>
          <h1 className="text-2xl text-orange-500">Quickbite</h1>
        </div>

        {/* Navigation bar */}

        <Navigation />

        {/* User and signIn */}
        <div className="flex items-center justify-center gap-6">
          <div>
            <button
              onClick={() => navigate('/cart')}
              className="text-xl font-semibold text-orange-500 cursor-pointer"
            >
              View Cart
            </button>
          </div>
          {isAuthenticated ? (
            <div className="flex gap-4 items-center justify-between">
              <p>{user?.nickname}</p>

              <button
                className="cursor-pointer rounded-full  border-2 border-orange-500 p-2 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-between">
              {/* <button
                className="cursor-pointer rounded border-2 border-orange-500 p-2 font-semibold text-orange-500"
                onClick={signup}
              >
                Signup
              </button> */}
              <p>Guest Login</p>

              <button
                className="cursor-pointer rounded-full  border-2 border-orange-500 p-2 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
                onClick={() => login()}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
