"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Images() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/dalle', { prompt });
            setImageUrl(response.data.choices[0].image_url); // Adjust based on the API response
        } catch (error) {
            console.error('Error fetching image:', error);
            // Handle error appropriately
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Generate Image</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Generated from DALL-E" />}
        </div>
    );
}
