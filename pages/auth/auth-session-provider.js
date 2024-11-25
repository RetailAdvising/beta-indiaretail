'use client'
// import { SessionProvider } from 'next-auth/react'
import React from 'react'

function AuthSessionProvider({ children, session }) {
    // return <SessionProvider session={session}>{children}</SessionProvider>
    return <>{children}</>
}

export default AuthSessionProvider
