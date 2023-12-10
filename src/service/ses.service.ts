import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { formattedEpisodeDetails } from "../types/types";

export const sendEmail = async (client: SESClient, episodes: formattedEpisodeDetails[]) => {
    let message;
    
    if (episodes.length === 0) {
        message = `
        <html>
        <body>
            <h2>
                Good morning.</br>
            </h2>
            <p>
            There are no new episodes available on Spotify today.</br>
            </p>
        </body>
        </html>
        `
    } else {
        message = `
        <html>
            <body>
                <h2>
                    Good morning. The following new episodes are available on Spotify.</br>
                </h2>
        `
        for (const episode of episodes) {
            const string = `
            <h3>Podcast:</h3> <p>${episode.podcast}</p></br>
            <b>ID:</b> <p>${episode.id}</p></br>
            <b>Title:</b> <p>${episode.title}</p></br>
            <b>Description:</b> <p>${episode.html_description}</p></br>
            <b>Release date:</b> <p>${episode.release_date}</p></br>
            <b>Duration (ms):</b> <p>${episode.duration_ms}</p></br>
            <b>Link:</b> <p>${episode.link}</p></br>
            `
            message = message + string;
        };
    
        message = message + 
        `
            </body>
        </html>
        `
    }

    const input = {
        Source: 'jaket.awsemailalerts@gmail.com',
        Destination: {
            ToAddresses: [
                'jakedanielturner@gmail.com'
            ]
        },
        Message: {
            Subject: {
                Data: 'Daily Spotify episodes update.'
            },
            Body: {
                Html: {
                    Data: message
                }
            }
        }
    }

    const command = new SendEmailCommand(input);
    await client.send(command);
};
