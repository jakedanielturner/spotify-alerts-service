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
    html_descripion: string,
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

export type spotifyEpisodeWithName = {
    0: spotifyEpisode,
    podcastName: string
}
