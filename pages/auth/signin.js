'use client'
import FbBtn from '@/components/Auth/FbBtn'
import React from 'react'
import { useSession } from 'next-auth/react'
import { LinkedInCallback } from "react-linkedin-login-oauth2";
const signin = () => {
  const { data: session, status } = useSession()
  // console.log(session,'session signin')
  // console.log(status,'status signin')
  return (
    <>
      {/* <FbBtn /> */}
      <LinkedInCallback />
    </>
  )
}

export default signin
