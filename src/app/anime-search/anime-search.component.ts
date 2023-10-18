import { Component, HostListener, OnInit } from '@angular/core';
import { AnimeService } from '../data/service/anime.service';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  haveWeSearched?: boolean = false;

  searchInput = new FormControl('', [Validators.required, Validators.minLength(2)])

  // sort by
  showSortbyList: boolean = false;

  // genres
  genres: string[] = ['Adventure', 'Action', 'Shounen', 'Horror', 'Fantasy']
  selectedGenres: Set<string> = new Set<string>()
  showGenresList: boolean = false;
  
  constructor(private animeService: AnimeService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {

      console.log(Object.keys(p).length)
      if (Object.keys(p).length === 0) {
        this.getAnimeList()
      } else {
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




















  // ngOnInit() {
  //   this.route.queryParams
  //     .subscribe({
  //       next: data => {
  //         if (data['search']) {
  //           this.searchAnimeOnLoad(data['search'])
  //         } else {
  //           this.loadAnime()
  //         }
  //       }
  //     })
  // }

  // changeSelectedGenres(genre: string):void {
  //   this.selectedGenres.has(genre) ? this.selectedGenres.delete(genre) : this.selectedGenres.add(genre)
  //   this.showGenresList = false;
  //   console.log(this.selectedGenres);
  // }

  // searchAnimeOnLoad(queryParamsInput: string): void {
  //   this.haveWeSearched = true
  //   this.pageNumber = 1


  //   this.animeService.searchAnime(queryParamsInput, this.pageNumber)
  //     .subscribe({
  //       next: (data) => {
  //         this.animes = data.data
  //       },
  //       error: e => 
  //       console.log('We got an error searching for anime: ' + e)
  //     })
  // }

  // searchAnimeByName(): void {
  //   if (this.searchInput.errors) {
  //     console.warn("Search input is invalid")
  //   } else {
  //     this.haveWeSearched = true
  //     this.pageNumber = 1

  //     this.animeService.searchAnime(this.searchInput.value, this.pageNumber)
  //       .subscribe({
  //         next: (data) => {
  //           this.animes = data.data
  //         },
  //         error: e => 
  //         console.log('We got an error searching for anime: ' + e)
  //       })
  //   }
  // }

  // loadAnime(): void {
  //   if (this.haveWeSearched) {
  //     this.pageNumber = this.pageNumber + 1

  //     this.animeService.searchAnime(this.searchInput.value, this.pageNumber)
  //     .subscribe({
  //         next: (data) => {
  //           if(this.animes === undefined) {
  //             this.animes = data.data
  //           } else {
  //             this.animes = [...this.animes, ...data.data]
  //             console.log(this.animes)
  //           }
  //         },
  //         error: e => 
  //         console.log('We got an error searching for anime: ' + e)
  //       })
  //   } else {
  //     this.animeService.getAnime(this.pageNumber)
  //       .subscribe({
  //         next: (data) => {
  //           if(this.animes === undefined) {
  //             this.animes = data.data
  //           } else {
  //             this.animes = [...this.animes, ...data.data]
  //             console.log(this.animes)
  //           }
  //         },
  //         error: (e) => {
  //           console.error('We have an error fetching anime: ', e)
  //         }
  //       })
  //     this.pageNumber = this.pageNumber + 1
  //   }

  // }

}
