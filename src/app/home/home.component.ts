import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../data/service/anime.service';

interface Anime {
  name: string;
  imgUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  animes: any[] = [];

  constructor(private animeService: AnimeService) { }

  ngOnInit() {
    this.getAnimeList()
  }

  getAnimeList(): void {
    this.animeService.getAnimeList(1, undefined, 'favorites', 'desc')
      .subscribe({
        next: data => {
          this.animes = data.data.slice(0, 4)
          console.log(this.animes)
        },
        error: e => {
          console.warn('We got an error fetching anime in the home page: ', e)
        }
      })
  }


}
