// components/Head.js
import Head from 'next/head';

const GoogleAnalyticsHead = () => (
  <Head>
    {/* Google Analytics */}
    <meta name="google-site-verification" content="rRfoLEZUE0z64vFfkAi__k0lnIUshzMCFTWkIBPK6g0" />

    <script dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFP3DK');`}} />


  </Head>
);

export default GoogleAnalyticsHead;
