import Logo from '@/components/logo/Logo'
import { colors } from '@/Helpers/colors'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div style={{background:colors.secondary}} className="flex flex-col justify-center items-center gap-6 min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4">
      
      {/* Logo with a subtle animation */}
      <div className="animate-bounce">
        <Logo className="w-32 h-32 text-purple-600" />
      </div>

      {/* Main message */}
      <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-md animate-pulse">
        404
      </h1>
      <h3 className="text-xl text-gray-700 text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </h3>

      {/* Optional button to go home */}
      <Link
        href="/"
        className="mt-4 px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-500 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}
