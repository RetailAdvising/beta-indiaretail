import Head from 'next/head'
import { domain, websiteUrl } from '@/libs/config/siteConfig'

const DEFAULT_OG_IMAGE = '/indiaretail_new.png'
export default function SEO({ title = "India Retailing",
    description = "This is IndiaRetailing and its about news and articles based on the popular site.",
    siteName = "Indiaretail",
    canonical = websiteUrl,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterHandle = "@d__indiaRetail" }) {
    return (
        <>
            {/* <html> */}
                <Head>
                    <title key="title">{`${title} – ${siteName}`}</title>
                    <meta name="description" content={description} />
                    <meta name="theme-color" content="#e21b22" />
                    <meta name="og_type" property="og:type" content={ogType} />
                    <meta name="og_title" property="og:title" content={title} />
                    <meta name="og_description" property="og:description" content={description} />
                    <meta name="og_locale" property="og:locale" content="en_IE" />
                    <meta name="og_site_name" property="og:site_name" content={siteName} />
                    <meta name="og_url" property="og:url" content={canonical ?? domain} />
                    <meta name="og_site_name" property="og:site_name" content={siteName} />
                    <meta
                        name="og_image"
                        property="og:image"
                        content={ogImage ?? DEFAULT_OG_IMAGE}
                    />
                    <meta
                        name="og_image:alt"
                        property="og:image:alt"
                        content={`${title} | ${siteName}`}
                    />
                    <meta name="og_image:width" property="og:image:width" content="1200" />
                    <meta name="og_image:height" property="og:image:height" content="630" />

                    <meta name="robots" content="index,follow" />

                    <meta
                        key="twitter:card"
                        name="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        key="twitter:site"
                        name="twitter:site"
                        content={twitterHandle}
                    />
                    <meta
                        key="twitter:creator"
                        name="twitter:creator"
                        content={twitterHandle}
                    />
                    <meta
                        key="twitter:title"
                        property="twitter:title"
                        content={title}
                    />
                    <meta
                        key="twitter:description"
                        property="twitter:description"
                        content={description}
                    />

                    <link rel="canonical" href={canonical ?? domain} />

                    <link rel="shortcut icon" href="/ir_2023.png" />
                </Head>
            {/* </html> */}
        </>
    )
}
