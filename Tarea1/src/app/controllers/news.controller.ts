
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2';

export const getSources = async (req: Request, res: Response) => {
    try {
        const axios = await import('axios');
        const response = await axios.default.get(`${NEWS_API_URL}/sources`, {
            params: {
                apiKey: API_KEY
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTopHeadlines = async (req: Request, res: Response) => {
    const { q, country, category } = req.query;
    try {
        const axios = await import('axios');
        const response = await axios.default.get(`${NEWS_API_URL}/top-headlines`, {
            params: {
                apiKey: API_KEY,
                q,
                country,
                category
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEverything = async (req: Request, res: Response) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'El parámetro "q" es requerido.' });
    }

    try {
        const axios = await import('axios');
        const response = await axios.default.get(`${NEWS_API_URL}/everything`, {
            params: {
                apiKey: API_KEY,
                q
            }
        });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};