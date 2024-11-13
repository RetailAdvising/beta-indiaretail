// import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { code,redirect_uri } = req.body; // Read code from the body
    const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, NEXTAUTH_URL } = process.env;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code missing', message: "Failed" });
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
                redirect_uri: redirect_uri, // Ensure this matches what you registered with LinkedIn
                // redirect_uri: `https://indiaretail.vercel.app/auth/signin`, // Ensure this matches what you registered with LinkedIn
                // redirect_uri: `http://localhost:3000/auth/signin`, // Ensure this matches what you registered with LinkedIn
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ status: "Failed",error: errorData.error_description });
        }

        const data = await response.json();
        return res.status(200).json({ status: "Success",access_token: data.access_token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

