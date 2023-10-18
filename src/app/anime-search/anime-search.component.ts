import { Component, HostListener, OnInit } from '@angular/core';
import { AnimeService } from '../data/service/anime.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

// importing JSON file containing genres with ID and name of each genre
import importedGenres from '../data/json/genres.json'

const CACHE_KEY = 'httpAnimesCache'

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
  // genres: string[] = ['Adventure', 'Action', 'Shounen', 'Horror', 'Fantasy']
  genres: {'mal_id': number, "name": string, "url": string, count: number}[] = importedGenres.data
  selectedGenres: Set<string> = new Set<string>()
  selectedGenresId: Set<string> = new Set<string>()

  showGenresList: boolean = false;

  // IF: current query params saved to be used in functions
  currentSearchQuery?: string;
  currentOrderBy?: string;
  currentSortBy?: string;
  // currentSelectedGenres?: string[];
  
  constructor(private animeService: AnimeService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(p => {
      if (Object.keys(p).length === 0) {
        this.getAnimeList()
      } else {
        
        // set the currently searched anime info to variables to allow us to search for more
        this.currentSearchQuery = p['search']
        this.currentOrderBy = p['orderBy']
        this.currentSortBy = p['sortBy']

        // turning genres selected ID from a set to an array
        const genresSelected = Array.from(this.selectedGenresId)

        this.getAnimeList(
          p['search'] ? p['search'] : undefined,
          p['orderBy'] ? p['orderBy'] : undefined,
          p['sortBy'] ? p['sortBy'] : undefined,
          genresSelected.length >= 1 ? genresSelected : undefined
        )
        console.log(p);
      }
    })
  }

  ngOnInit(): void {
  }

  getAnimeList(title?: string, orderBy?: string, sortBy?: string, selectedGenres?: string[]): void {
    console.log(selectedGenres)
    this.animeService.getAnimeList(this.pageNumber, title, orderBy, sortBy, selectedGenres)
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

  sortByScore(type: string): void {
    this.showSortbyList = false;

    this.pageNumber = 1

    // reset animes fetched so far
    this.animes = []

    // route to this page again but with the new query search, which re-triggers the getAnimeList with the new search value
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { orderBy: 'score', sortBy: type },
        queryParamsHandling: 'merge'
      }
    )

  }

  changeSelectedGenres(genre: string, genreId: number): void {
    // if genres are changed the animes fetched should be reset and page number back to 1
    this.animes = []
    this.pageNumber = 1


    this.selectedGenres.has(genre) ? this.selectedGenres.delete(genre) : this.selectedGenres.add(genre)
    this.showGenresList = false;
    this.selectedGenresId.has(genreId.toString()) ? this.selectedGenresId.delete(genreId.toString()) : this.selectedGenresId.add(genreId.toString())

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { genres: Array.from(this.selectedGenres) },
        queryParamsHandling: 'merge'
      }
    )
  }

  searchForAnime(): void {
    // reset everything we have so far
    this.animes = []
    this.selectedGenresId.clear()
    this.selectedGenres.clear()
    
    this.pageNumber = 1

    // route to this page again but with the new query search, which re-triggers the getAnimeList with the new search value
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { search: this.searchInput.value },
        queryParamsHandling: ''
      }
    )
  }

}
