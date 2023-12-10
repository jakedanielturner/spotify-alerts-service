import { getSecrets } from "../lib/secrets";
import { getAuthToken } from "../service/authentication.service";
import { poll } from "../service/poll.service";
import { checkAndSaveItem } from "../service/dynamodb.service";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { spotifyEpisodeWithName } from "../types/types";

const episodeIds = {
    'The Price of Football': '7c7ltYVwnicbVz0uYTXAW5',
    'Self-Taught Devs': '4g08UndVH5YfVQWsiXxs9o'
}

const ddbClient = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async () => {
    console.log('Lambda invoked...');

    const secrets = await getSecrets();

    console.log('Secrets returned successfully.');

    const authToken = await getAuthToken(secrets);

    console.log('Auth token obtained successfully.')

    const results: spotifyEpisodeWithName[] = [];

    for (const [podcastName, id] of Object.entries(episodeIds)) {
        console.log(`Getting episodes for ${podcastName}...`)
        const res = await poll(authToken, id);
        results.push({...res.data.items, podcastName});
    }

    for (const episode of results) {
        await checkAndSaveItem(episode, docClient);
    }

    return {
        statusCode: 200,
        body: {
            res: 'Hello from lambda!'
        }
    }
};

export default handler;
