import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css']
})
export class AnimeSearchComponent implements OnInit {

  animes: { id: string, name: string, imgUrl: string }[] = [
    { id: '1', name: 'Boku no Hero', imgUrl: 'www.imgUrl.com'},
    { id: '2', name: 'Naruto', imgUrl: 'www.imgUrl.com'},
    { id: '3', name: 'One Piece', imgUrl: 'www.imgUrl.com'},
    { id: '4', name: 'Death Note', imgUrl: 'www.imgUrl.com'},
    { id: '5', name: 'Haikyu!', imgUrl: 'www.imgUrl.com'},
    { id: '6', name: 'Kuroko no basket', imgUrl: 'www.imgUrl.com'},
    { id: '7', name: 'Dragon Ball', imgUrl: 'www.imgUrl.com'},
    { id: '8', name: 'Yu Gi Oh!', imgUrl: 'www.imgUrl.com'},
    { id: '9', name: 'Beyblade!', imgUrl: 'www.imgUrl.com'},
    { id: '10', name: 'Pokemon', imgUrl: 'www.imgUrl.com'},
    { id: '11', name: 'Bleach', imgUrl: 'www.imgUrl.com'},
    { id: '12', name: 'Hunter x Hunter', imgUrl: 'www.imgUrl.com'}
  ]

  // sort by
  showSortbyList: boolean = false;

  // genres
  genres: string[] = ['Adventure', 'Action', 'Shounen', 'Horror', 'Fantasy']
  selectedGenres: Set<string> = new Set<string>()
  showGenresList: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  changeSelectedGenres(genre: string):void {
    this.selectedGenres.has(genre) ? this.selectedGenres.delete(genre) : this.selectedGenres.add(genre)
    this.showGenresList = false;
    console.log(this.selectedGenres);
  }

}
