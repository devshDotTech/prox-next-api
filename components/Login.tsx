"use client"
import React, { SetStateAction, use, useState } from 'react'
import InputField from './ui/InputField'

const Login = ( { setUsername, setPassword, setApiUrl, handleLogin}:{
    setUsername: React.Dispatch<SetStateAction<string>>,
    setPassword: React.Dispatch<SetStateAction<string>>,
    setApiUrl: React.Dispatch<SetStateAction<string>>,
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
    
    return (
        <>
            <form action="" onSubmit={handleLogin} className='flex flex-col gap-y-3 mx-2 mt-3' >
                <InputField onChange={setApiUrl} title='url' name='url' placeholder='Enter your Prox-url' />
                <InputField onChange={setUsername} title='username' name='username' placeholder='Enter your username' />
                <InputField onChange={setPassword} title='password' name='password' placeholder='Enter your Password' type="password" />
                <button type="submit" className='border border-gray-500 w-20 bg-blue-500 rounded-sm text-white px-1 py-1' >Login</button>
            </form>
        </>
    )
}

export default Login