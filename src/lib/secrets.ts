import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

export const getSecrets = async (): Promise< { [key: string]: string } > => {
    const secretsManager = new SecretsManagerClient();

    const input = {
        "SecretId": process.env.SPOTIFY_SECRETS_NAME
    };

    const command = new GetSecretValueCommand(input);

    const { SecretString } = await secretsManager.send(command);

    if (SecretString === undefined) {
        throw new Error('Error getting secrets from secrets manager.')
    }

    return JSON.parse(SecretString);
};
