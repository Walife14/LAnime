import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {

  genres: string[] = ['shounen', 'Action', 'Super power']

  characters: {name: string, imgUrl: string}[] = [
    {name: 'Midoriya', imgUrl: 'www.imgurl.com'},
    {name: 'All Might', imgUrl: 'www.imgurl.com'},
    {name: 'Eraser Head', imgUrl: 'www.imgurl.com'},
    {name: 'Power Loader', imgUrl: 'www.imgurl.com'},
    {name: 'Gran Torino', imgUrl: 'www.imgurl.com'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
