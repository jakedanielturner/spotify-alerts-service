import axios from 'axios';
import qs from 'qs';

export const getAuthToken = async (secrets: { [key: string]: string }): Promise<string> => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: secrets.SPOTIFY_CLIENT_ID,
            password: secrets.SPOTIFY_CLIENT_SECRET
        }
    };

    const data = {
        grant_type: 'client_credentials'
    };

    const res = await axios.post(
        'https://accounts.spotify.com/api/token', 
        qs.stringify(data),
        headers
    );

    return res.data.access_token;
};
