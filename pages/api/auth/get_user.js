export default async function handler(req, res) {
    const { accessToken } = req.body
    // const url = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';
    const url = 'https://api.linkedin.com/v2/userinfo';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   console.error('Error:', errorData);
        //   throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        // }

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ status: "Failed", error: errorData });
        }


        const data = await response.json();
        return res.status(200).json({ status: "Success", data: data });

        // const data = await response.json();
        // console.log('Member Handles Data:', data);
        // return data;

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}