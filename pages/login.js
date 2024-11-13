import LogIn from '@/components/Auth/LogIn'
import SignUp from '@/components/Auth/SignUp'
import Modal from '@/components/common/Modal'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function login() {
  const [shows, setShows] = useState(false);
  const route = useRouter()

  useEffect(() => {
    if (localStorage["apikey"]) {
      // console.log("l");
      route.push("/")
    }
  }, [shows])
  return (
    <>

      <LogIn show={shows} goPass={() => setShows(!shows)} />


      {/* <button onClick={()=> setShow(!show)}>modal popup</button>

      <div className={`${show ? 'modalActive' : 'modalContainer'}`}>
        <Modal show={show} />
      </div> */}


    </>
  )
}
