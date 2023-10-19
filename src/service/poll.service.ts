import axios from 'axios';

export const poll = (authToken: string) => {
    const headers = {
        Authorization: `Bearer ${authToken}`
    };

    const res = axios.post(
        'https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',
        headers
    );

    return res;
};
