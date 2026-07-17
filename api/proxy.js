// api/proxy.js
export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url, authToken } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Missing "url" parameter' });
    }

    if (!authToken) {
        return res.status(400).json({ error: 'Missing "authToken" in request body' });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Referer': 'https://pwthor.live/',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
