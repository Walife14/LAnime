import { Component, HostListener, OnInit } from '@angular/core';
import { AnimeService } from '../data/service/anime.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

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

  animes?: any[];
  pageNumber: number = 1;

  // search input
  searchInput = new FormControl("searchInput")

  // sort by
  showSortbyList: boolean = false;

  // genres
  genres: string[] = ['Adventure', 'Action', 'Shounen', 'Horror', 'Fantasy']
  selectedGenres: Set<string> = new Set<string>()
  showGenresList: boolean = false;
  
  constructor(private animeService: AnimeService) { }

  ngOnInit() {
    // Get initial component load animes to display
    // this.animeService.getAnime().subscribe({
    //   next: (data: any) => {
    //     this.animes = data
    //     console.log(data);
    //   },
    //   error: (e) => {
    //     console.error(e)
    //   }
    // })

    this.loadAnime()
  }

  changeSelectedGenres(genre: string):void {
    this.selectedGenres.has(genre) ? this.selectedGenres.delete(genre) : this.selectedGenres.add(genre)
    this.showGenresList = false;
    console.log(this.selectedGenres);
  }

  searchAnimeByName() {
    this.animeService.searchAnime(this.searchInput.value).subscribe({
      next: data => {
        console.log(data)
      },
      error: e => 
      console.log('We got an error: ' + e)
    })
  }

  loadAnime(): void {
    this.animeService.getAnime(this.pageNumber)
      .subscribe({
        next: (data) => {
          if(this.animes === undefined) {
            this.animes = data.data
          } else {
            this.animes = [...this.animes, ...data.data]
            console.log(this.animes)
          }
        },
        error: (e) => {
          console.error('We have an error fetching anime: ', e)
        }
      })

    this.pageNumber = this.pageNumber + 1
  }









  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
  //     // this.animeService.getAnime().subscribe({
  //     //   next: (data: any) {

  //     //   }
  //     // })
  //   }
  // }

}
