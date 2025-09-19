import Logo from '@/components/logo/Logo'
import { Loader2 } from 'lucide-react'
import React from 'react'

import { colors } from './../Helpers/colors';

export default function Loading() {
  return (
    <div style={{ backgroundColor: colors.background, color: colors.foreground }}
  className="flex flex-col items-center justify-center min-h-screen gap-8">
 
      <div   className="text-5xl font-extrabold animate__animated animate__pulse animate__infinite">
        <Logo />
      </div>


      <Loader2 className="w-14 h-14 text-purple-600 animate-spin" />

      <p className="text-gray-600 text-lg animate__animated animate__fadeIn">
        Loading, please wait...
      </p>
    </div>
  )
}
