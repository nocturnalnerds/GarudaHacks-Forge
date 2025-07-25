import axios from "axios";
import { RequestHandler } from "express";

const preprocessQuery = (query: string): string => {
    return query.toLowerCase().replace(/\s+/g, '_');
};

/*

curl -s --compressed "https://api.search.brave.com/res/v1/images/search?q=kucing_lucu&safesearch=strict&count=1&search_lang=en&country=us&spellcheck=1" \
  -H "Accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "X-Subscription-Token: <TOKEN_ID>"

*/

const API_KEY = process.env.BING_API_KEY;
const API_PATH = 'https://api.search.brave.com/res/v1/images/search';


type BraveImageResult = {
    properties?: {
        url?: string;
        [key: string]: any;
    };
    [key: string]: any;
};

type BraveImageResponse = {
    results?: BraveImageResult[];
    [key: string]: any;
};

const fetchImageFromBrave = async (query: string) => {
    try {
        const params = new URLSearchParams({
            q: query,
            count: '3',
            search_lang: 'ms',
            country: 'id',
            spellcheck: '1',
        });

        const response = await fetch(`${API_PATH}?${params}`, {
            headers: new Headers({
                'x-subscription-token': API_KEY || '',
                'accept': 'application/json',
            }),
        });
        const data = await response.json() as BraveImageResponse;
        const idx = Math.floor(Math.random() * 3);
        return data?.results?.[idx]?.properties?.url;
    } catch (error: any) {
        console.error("Brave image search failed:", error?.response?.data || error?.message);
    }
};

