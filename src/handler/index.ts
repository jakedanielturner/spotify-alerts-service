import { getSecrets } from "../lib/secrets";
import { getAuthToken } from "../service/authentication.service";
import { poll } from "../service/poll.service";
import { checkAndSaveItem } from "../service/dynamodb.service";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { formattedEpisodeDetails, spotifyEpisodeWithName } from "../types/types";
import { SESClient } from "@aws-sdk/client-ses";
import { sendEmail } from "../service/ses.service";

const episodeIds = {
    'The Price of Football': '7c7ltYVwnicbVz0uYTXAW5',
    'Self-Taught Devs': '4g08UndVH5YfVQWsiXxs9o',
    'The Rest is Football': '2fDn3EgvJZ5J1k5rrBwrlZ',
    'This Week\'s Acca': '6YTxPAE2hjeSQUTDZE5AuB',
    'In Sickness and in Health': '62lDZO6FSNG1b9nHRrGaLG'
}

const ddbClient = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(ddbClient);

const sesClient = new SESClient();

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

    console.log(results);

    const newEpisodes: formattedEpisodeDetails[][] = [];

    for (const episode of results) {
        const item = await checkAndSaveItem(episode, docClient);

        if (item) {
            newEpisodes.push(item);
        }
    }

    const flattenedEpisodes = newEpisodes.flat();

    console.log(flattenedEpisodes);
    
    if (newEpisodes) {
        await sendEmail(sesClient, flattenedEpisodes)
    }

    return {
        statusCode: 200,
        body: {
            res: 'Hello from lambda!'
        }
    }
};

export default handler;
