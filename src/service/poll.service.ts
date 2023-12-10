import axios from 'axios';

export const poll = (authToken: string, id: string) => {
    const headers = {
        Authorization: `Bearer ${authToken}`
    };

    const res = axios.get(
        `https://api.spotify.com/v1/shows/${id}/episodes?offset=0&limit=3`, {
            headers,
        }
    );

    return res;
};
