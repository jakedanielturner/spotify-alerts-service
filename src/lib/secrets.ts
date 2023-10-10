import { GetSecretValueCommand, GetSecretValueCommandInput, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

export const getSecrets = async () => {
    const secretsManager = new SecretsManagerClient();

    const input = {
        "SecretId": process.env.SPOTIFY_SECRETS_NAME
    };

    const command = new GetSecretValueCommand(input);

    const { SecretString } = await secretsManager.send(command);

    return JSON.parse(SecretString);
};
