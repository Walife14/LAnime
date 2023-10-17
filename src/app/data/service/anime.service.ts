import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  httpOptions = {
    headers: new HttpHeaders({
      'X-MAL-Client-ID': 'b4ea4ab5561c9deada4dadf6001296ba'
    })
  }

  constructor(private http: HttpClient) {}

  getAnime(pageNumber: number): Observable<any> {
    return this.http.get('https://api.jikan.moe/v4/anime?limit=6&page=' + pageNumber)
  }

  searchAnime(q: any, pageNumber: number): Observable<any> {
    return this.http.get(`https://api.jikan.moe/v4/anime?limit=6&page=${pageNumber}&q=${q}`)
  }

}
