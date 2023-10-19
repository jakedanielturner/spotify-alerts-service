import { getSecrets } from "../lib/secrets";
import { getAuthToken } from "../service/authentication.service";
import { poll } from "../service/poll.service";

const episodeIds = [
    '7c7ltYVwnicbVz0uYTXAW5',
    '4g08UndVH5YfVQWsiXxs9o'
]

export const handler = async () => {
    console.log('Lambda invoked...');

    const secrets = await getSecrets();

    console.log('Secrets returned successfully.');

    const authToken = await getAuthToken(secrets);

    console.log('Auth token obtained successfully.')

    for (const id of episodeIds) {
        const res = await poll(authToken, id);
        console.log(res.data.items);
    }

    return {
        statusCode: 200,
        body: {
            res: 'Hello from lambda!'
        }
    }
};

export default handler;
