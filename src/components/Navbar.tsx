"use client"

import { useSession, signIn, signOut } from "next-auth/react"

const Navbar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-white">Home</a>
          <a href="/me" className="ml-4 text-white">Profile</a>
          <a href="/data" className="ml-4 text-white">Data</a>
        </div>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">Hello, {session.user?.name}</span>
              <button onClick={() => signOut({callbackUrl: "/"})} className="text-white">Logout</button>
            </>
          ) : (
            <button onClick={() => signIn()} className="text-white">Login</button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar