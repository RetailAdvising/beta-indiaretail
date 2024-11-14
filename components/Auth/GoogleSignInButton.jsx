// import React, { useEffect } from "react";
// import { LoginSocialGoogle } from "reactjs-social-login";

// const GoogleLogin = ({ onSuccess, onFailure }) => {
//   useEffect(() => {
//     // This code will only run on the client side
//     const clientId = "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com";
//     if (typeof window !== "undefined") {
//       // Accessing window object is safe here
//       LoginSocialGoogle.init(clientId);
//     }
//   }, []);

//   return (
//     <LoginSocialGoogle
//       onSuccess={onSuccess}
//       onFailure={onFailure}
//     >
//       Login with Google
//     </LoginSocialGoogle>
//   );
// };

// export default GoogleLogin;

// components/GoogleSignInButton.js
import React, { useEffect } from 'react';
import Script from 'next/script';

// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
const GoogleSignInButton = ({ onSuccess, onFailure }) => {
  // useEffect(() => {
  //   gapi.load('auth2', function () {
  //     gapi.auth2.init({
  //       client_id: '189689673866-irqdceaurkp36epq803g6gdbcsj0rum7.apps.googleusercontent.com',
  //     }).then(() => {
  //       // Now you can access gapi
  //       const auth2 = gapi.auth2.getAuthInstance();
  //       console.log(auth)
  //       // ... rest of your code ...
  //     });
  //   });
  // }, []);

  return (
    <GoogleLogin
      clientId= {"189689673866-irqdceaurkp36epq803g6gdbcsj0rum7.apps.googleusercontent.com"}
      onSuccess={onSuccess}
      onFailure={onFailure}
      shape='square'
      text='signin'
      size='medium'
    />
  );
};

export default GoogleSignInButton;
