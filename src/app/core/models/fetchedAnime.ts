export interface FetchedAnime {
    mal_id: string;
    background: string;
    episodes: number;
    popularity: number;
    rank: number;
    rating: string;
    score: number;
    scored_by: number;
    status: string;
    title_english: string;
    title_japanese: string;
    year: number;
    synopsis: string;
    images: {
        'jpg': {'image_url': string, 'large_image_url': string, 'small_image_url': string},
        'webp': {'image_url': string, 'large_image_url': string, 'small_image_url': string}
    };
    trailer: Array<{
        'embed_url': string,
        'images': Array<{'image_url': string, 'large_image_url': string, 'maximum_image_url': string, 'medium_image_url': string, 'small_image_url': string}>,
        'url': string,
        'youtube_id': string,
    }>;
    genres: Array<{
        'mal_id': number,
        'name': string,
        'type': string,
        'url': string}
    >;
    licensors: Array<{
        'mal_id': number,
        'name': string,
        'type': string,
        'url': string}
    >;
    producers: Array<{
        'mal_id': number,
        'name': string,
        'type': string,
        'url': string}
    >;
}
