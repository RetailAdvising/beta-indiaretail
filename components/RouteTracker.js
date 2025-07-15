// import { useRouter } from "next/router";
// import { useEffect, useRef } from "react";

// export default function RouteTracker(){
//     const router = useRouter();
//   const routeHistory = useRef([]);

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//         debugger
//       console.log('Route changed to:', url);
//       routeHistory.current.push(url);
//       console.log('Visited Routes:', routeHistory.current);
//     };

//     router.events.on('routeChangeComplete', handleRouteChange);

//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [router]);

//   return null; 
// }