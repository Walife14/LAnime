import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient) {}

  // get a list of animes based on query/filters
  getAnimeList(pageNumber: number, title?: string, orderBy?: string, sortBy?: string, selectedGenres?: string[]): Observable<any> {
    const selectedGenresIdList = selectedGenres?.join()
    const apiURL = `https://api.jikan.moe/v4/anime?${title ? 'q=' + title + '&' :''}limit=6&page=${pageNumber}${orderBy ? '&order_by=' + orderBy :''}${sortBy ? '&sort=' + sortBy :''}${selectedGenres ? '&genres=' + selectedGenresIdList :''}`
    // console.log("Getting", apiURL)
    return this.http.get(apiURL)
  }

  // get a specific anime by id
  getAnimeById(animeId: string): Observable<any> {
    return this.http.get(`https://api.jikan.moe/v4/anime/${animeId}`)
  }

  // get anime videos
  getAnimeVideosById(animeId: string): Observable<any> {
    return this.http.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`)
  }

  // get anime recommendations by id
  getAnimeRecommendations(animeId: string): Observable<any>  {
    return this.http.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`)
  }

  // get anime characters
  getAnimeCharacters(animeId: string): Observable<any> {
    return this.http.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
  }

}
