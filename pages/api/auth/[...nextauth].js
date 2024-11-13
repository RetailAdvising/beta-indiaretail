// // pages/api/auth/[...nextauth].js
// import nextAuth from 'next-auth';
// import FacebookProvider from 'next-auth/providers/facebook';
// import AppleProvider from 'next-auth/providers/apple'
// import LinkedInProvider from 'next-auth/providers/linkedin';

// // export const { handlers, auth, signIn, signOut } = nextAuth({
// //     providers: [LinkedInProvider({
// //         clientId: process.env.LINKEDIN_CLIENT_ID,
// //         clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
// //     }),],
// // })

// export default nextAuth({
//     // export const authOptions = ({
//     // pages: {
//     //     signIn: '/auth/signin',
//     // },
//     providers: [
//         // FacebookProvider({
//         //     clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
//         //     clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
//         //     // authorization: { params: { scope: 'email',redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/facebook",response_type: 'code' }},
//         // }),
//         AppleProvider({
//             clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
//             clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET,
//         }),
//         // LinkedInProvider({
//         //     clientId: process.env.LINKEDIN_CLIENT_ID,
//         //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//         // }),
//         LinkedInProvider({
//             clientId: process.env.LINKEDIN_CLIENT_ID,
//             clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            
//             // clientId: "8676pxylpkogss",
//             // clientSecret: "bZFGBR3zxHzHg8Nc",
//             // callbackUrl: "http://localhost:3000/auth/signin",
//             // callbackUrl: "https://indiaretail.vercel.app/api/auth/callback/linkedin",
//             // authorization: {
//             //     params: {
//             //         scope: 'r_liteprofile r_emailaddress',
//             //     },
//             // },
//             scope: ["r_basicprofile","r_emailaddress"],
//             authorization: {
//                 params: {
//                     scope: 'profile email',
//                 },
//             },
//             scope: ["profile","email"],
//         }),
//     ],
//     // secret: "53a83436a46c089d62799997af80a031341622788230249",
//     secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
//     debug: true,
//     // session: {
//     //     strategy: 'jwt'
//     // },
//     // logger:(method, message, ...args)=>{
//     //     console.log(`NEXTAUTH LOGGER ${method}: ${message}`, ...args);
//     // },
//     //     callbacks: {
//     //         async jwt(token, user, account, profile, isNewUser) {
//     //           if (user) {
//     //               token.userId = user.id;
//     //           }
//     //           return token;
//     //       },
//     //       async session(session, token) {
//     //           session.user = token.user;
//     //           delete session.error;
//     //           return session;
//     //       },
//     //       async redirect(url, baseUrl) {
//     //           return "/";
//     //       },
//     //   },
//     cookies: {
//         pkceCodeVerifier: {
//             name: "next-auth.pkce.code_verifier",
//             options: {
//                 httpOnly: true,
//                 sameSite: "none",
//                 path: '/',
//                 secure: true
//             },
//         },
//     },
//     callbacks: {
//         // session: async function ({ session, token }) {
//         //     // session.user=token.user;
//         //     console.log(session,"session callbacks")
//         //     console.log(token,"token callbacks")
//         //     session.customValue = new Date().toISOString()
//         //     return Promise.resolve(session);
//         // }
//         async jwt({ token, account }) {
//             if (account) {
//                 token.accessToken = account.access_token;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.accessToken = token.accessToken;
//             return session;
//         },
//     }


//     // jwt: false,

//     // Add additional NextAuth.js configurations as needed
// });

export default async function handler(req, res) {
    const { code } = req.query;
    const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, NEXTAUTH_URL } = process.env;
  
    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing' });
    }
  
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: `${NEXTAUTH_URL}/api/linkedin/callback`, // Ensure this matches what you registered with LinkedIn
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error_description });
      }
  
      const data = await response.json();
      return res.status(200).json({ access_token: data.access_token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }