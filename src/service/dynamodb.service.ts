import { QueryCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { spotifyEpisode, spotifyEpisodeWithName } from "../types/types";

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
    console.log(podcastName);
    const command = new PutCommand({
        TableName: process.env.DYNAMO_DB_TABLE,
        Item: {
            id: episode.id,
            title: episode.name,
            release_date: episode.release_date,
            description: episode.description,
            duration_ms: episode.duration_ms,
            link: episode.href,
            podcast: podcastName
        }
    });

    const response = await client.send(command);
};

export const checkAndSaveItem = async (episode: spotifyEpisodeWithName, client: DynamoDBDocumentClient) => {
    const item = await checkIfItemExistsInDynamo(episode[0], client);

    console.log(episode)

    if (item) {
        return;
    }

    const savedItem = await saveItemToDynamo(episode[0], client, episode.podcastName);
};
