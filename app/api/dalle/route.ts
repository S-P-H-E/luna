import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/images/generations', 
                { prompt: req.body.prompt },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(error.response.status).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
