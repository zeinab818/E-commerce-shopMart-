'use client'
import React from 'react'
import { LoginForm } from './_components/LoginForm/LoginForm'


export default function page() {

  return <>
  
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className='text-3xl font-bold mb-6'>Welcom Back ! </h1>
      <LoginForm></LoginForm>
    
    </div>
  </>
}
