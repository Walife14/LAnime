import { Component, HostListener, OnInit } from '@angular/core';
import { AnimeService } from '../data/service/anime.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

const CACHE_KEY = 'httpAnimesCache'
export interface AnimeData {
  id: number;
  title: string;
  imgUrl: string;
}
@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css']
})
export class AnimeSearchComponent implements OnInit {

  animes: any;
  pageNumber: number = 1;

  // search input
  searchInput = new FormControl('', [Validators.required, Validators.minLength(2)])

  // sort by
  showSortbyList: boolean = false;

  // genres
  genres: string[] = ['Adventure', 'Action', 'Shounen', 'Horror', 'Fantasy']
  selectedGenres: Set<string> = new Set<string>()
  showGenresList: boolean = false;

  // IF: current query params saved to be used in functions
  currentSearchQuery?: string;
  currentOrderBy?: string;
  currentSortBy?: string;
  
  constructor(private animeService: AnimeService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(p => {
      if (Object.keys(p).length === 0) {
        this.getAnimeList()
      } else {
        
        // set the currently searched anime info to variables to allow us to search for more
        this.currentSearchQuery = p['search']
        this.currentOrderBy = p['orderBy']
        this.currentSortBy = p['sortBy']

        this.getAnimeList(
          p['search'] ? p['search'] : undefined,
          p['orderBy'] ? p['orderBy'] : undefined,
          p['sortBy'] ? p['sortBy'] : undefined)
        console.log(p);
      }
    })
  }

  ngOnInit(): void {
  }

  getAnimeList(title?: string, orderBy?: string, sortBy?: string): void {
    this.animeService.getAnimeList(this.pageNumber, title, orderBy, sortBy)
      .subscribe({
        next: data => {
          if (this.animes) {
            this.animes = this.animes.concat(data.data)
            console.log(this.animes)
          } else {
            this.animes = []
            this.animes = this.animes.concat(data.data)
          }
          this.pageNumber++
        },
        error: e => {
          console.warn('We got an error: ', e)
        }
      })
  }

  getMoreAnime(): void {
    this.getAnimeList(this.currentSearchQuery, this.currentOrderBy, this.currentSortBy)
  }

  searchForAnime(): void {
    // reset everything we have so far
    this.pageNumber = 1
    this.animes = []

    // route to this page again but with the new query search, which re-triggers the getAnimeList with the new search value
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { search: this.searchInput.value },
        queryParamsHandling: 'merge'
      }
    )
  }

}
