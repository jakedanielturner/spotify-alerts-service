import { getSecrets } from "../lib/secrets";
import { getAuthToken } from "../service/authentication.service";
import { poll } from "../service/poll.service";

export const handler = async () => {
    console.log('Lambda invoked...');

    const secrets = await getSecrets();

    console.log('Secrets returned successfully.');

    const authToken = await getAuthToken(secrets);

    console.log('Auth token obtained successfully.')

    const pollResults = await poll(authToken);

    console.log(pollResults);

    return {
        statusCode: 200,
        body: {
            res: 'Hello from lambda!'
        }
    }
};

export default handler;