// import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const FbBtn = ({ socialLogin, setCredential, setShowMob }) => {
  // const { data: session } = useSession();
  // console.log(data,'data')
  // console.log(session, 'session')
  const [doamin_url, setDomainUrl] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainUrl(window.location.origin)
    }
  }, [])

  const { linkedInLogin } = useLinkedIn({
    clientId: "782oqow2dx0bgq",
    // redirectUri: `https://indiaretail.vercel.app/auth/signin`,
    // redirectUri: `http://localhost:3000/auth/signin`,
    redirectUri: `${doamin_url}/auth/signin`,
    scope: "email profile w_member_social openid",
    state: "782oqow2dx0bgq",
    // email profile
    onSuccess: async (code) => {
      // console.log(code);
      const accessToken = await handleLogin(code)
      if (accessToken) {
        let values = await getUserEmail(accessToken)
        userLogin(values)
      }
      // console.log(await getAuthorization(),"getAuthorization")
      // console.log(await getAccessToken(code), "code accesss")
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const userLogin = (data) => {
    if (data && data.email) {
      data['linkedin'] = true
      setCredential(data)


      socialLogin(data)
      // if(data.phone){
      //   socialLogin(data)
      // }else{
      //   setShowMob(true)
      // }
    } else {
      toast.error(`Register your email with the linkedin...!`)
    }
  }

  const handleLogin = async (code) => {
    // let url = `http://localhost:3000/api/auth/signin`;
    let url = `${doamin_url}/api/auth/signin`
    // let url = "https://indiaretail.vercel.app/api/auth/signin"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: `${doamin_url}/auth/signin`
        })
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access Authorization:', errorData);
        throw new Error(`Failed to fetch access Authorization: ${errorData.error_description}`);
      }

      const data = await response.json();
      // console.log(data,"data")
      if (data.status == "Success") {
        return data.access_token;
      } else {
        toast.error(data.error)
        return undefined
      }

    } catch (error) {
      console.error('Error in Authorization:', error);
      throw error; // Re-throw the error after logging it
    }

  };

  async function getUserEmail(accessToken) {

    // let url = `http://localhost:3000/api/auth/get_user`;
    let url = `${doamin_url}/api/auth/get_user`;
    // let url = `https://indiaretail.vercel.app/api/auth/get_user`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          accessToken: accessToken
        })
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching access Authorization:', errorData);
        toast.error(errorData.error_description)
        // throw new Error(`Failed to fetch access Authorization: ${errorData.error_description}`);
      }

      const data = await response.json();
      // console.log(data,"data")
      if (data.status == "Success") {
        return data.data;
      } else {
        toast.error(data.error)
        return undefined
      }

    } catch (error) {
      console.error('Error in Authorization:', error);
      throw error; // Re-throw the error after logging it
    }

  }

  return (
    <>
      <Image height={20} onClick={linkedInLogin} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='linkedin' src={'/login/linkedin.webp'} />
    </>
  )
}

export default FbBtn
