import { QueryCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { formattedEpisodeDetails, spotifyEpisode, spotifyEpisodeWithName } from "../types/types";

const checkIfItemExistsInDynamo = async (episode: spotifyEpisode, client: DynamoDBDocumentClient) => {
    const command = new QueryCommand({
        TableName: process.env.DYNAMO_DB_TABLE,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': episode.id
        }
    });

    const response = await client.send(command);

    return response.Count;
};

const saveItemToDynamo = async (episode: spotifyEpisode, client: DynamoDBDocumentClient, podcastName: string) => {
    const savedEpisode: formattedEpisodeDetails = {
        id: episode.id,
        title: episode.name,
        release_date: episode.release_date,
        description: episode.description,
        duration_ms: episode.duration_ms,
        link: episode.external_urls.spotify,
        html_description: episode.html_description,
        podcast: podcastName
    };
    const command = new PutCommand({
        TableName: process.env.DYNAMO_DB_TABLE,
        Item: savedEpisode
    });

    await client.send(command);

    return savedEpisode;
};

export const checkAndSaveItem = async (episode: spotifyEpisodeWithName, client: DynamoDBDocumentClient) => {
    const savedItems = [];
    for (const index of Object.keys(episode)) {
        if (index === 'podcastName') {
            break;
        }

        const item = await checkIfItemExistsInDynamo(episode[Number(index)], client)

        if (item) {
            continue;
        }

        const savedItem = await saveItemToDynamo(episode[Number(index)], client, episode.podcastName);

        savedItems.push(savedItem)
    }

    return savedItems;
};
