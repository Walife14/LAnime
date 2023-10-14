import { Component, OnInit } from '@angular/core';

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

  animes: Array<Anime> = [
    {
      name: 'Naruto', imgUrl: 'www.img.com'
    },
    {
      name: 'One Piece', imgUrl: 'www.img.com'
    },
    {
      name: 'Boku no Hero', imgUrl: 'www.img.com'
    },
    {
      name: 'Death Note', imgUrl: 'www.img.com'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
