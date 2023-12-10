export type spotifyEpisodesResponse = {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: spotifyEpisode[]
}

export type spotifyEpisode = {
    audio_preview_url: string,
    description: string,
    html_description: string,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: {
        url: string,
        height: number,
        width: number
    }[],
    is_externally_hosted: boolean,
    is_playable: boolean,
    language: string,
    languages: string[],
    name: string,
    release_date: string,
    release_date_precision: string,
    resume_point: {
        fully_played: boolean,
        resume_position_ms: boolean,
    },
    type: string,
    uri: string,
    restrictions: {
        reason: string
    }
}

export type enumeratedSpotifyEpisodes = {
    [key: string]: spotifyEpisode,
}

export type spotifyEpisodeWithName = enumeratedSpotifyEpisodes & {
    podcastName: string
}

export type formattedEpisodeDetails = {
    id: string,
    title: string,
    release_date: string,
    description: string,
    duration_ms: number,
    link: string,
    html_description: string,
    podcast: string
};
