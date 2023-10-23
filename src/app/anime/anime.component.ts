import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../data/service/anime.service';
import { FetchedAnime } from '../core/models/fetchedAnime';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {

  // fetchedAnime variable to fetch a specific anime
  fetchedAnime?: FetchedAnime;

  // anime 4 popular characters by favourites array
  // popularCharacters?: Array<{name: string, image_url: string}>
  popularCharacters?: any;

  // anime recommendations
  fetchedAnimeRecommendations?: any;

  // anime videos
  fetchedAnimeVideos?: any;
  showModal: boolean = false;

  // synopsis button text
  showMoreDescription: boolean = false;

  // Variable to hold the recommendations container for scrolling feature
  @ViewChild('recommendationsContainer') recommendationsContainer: any;

  
  constructor(private animeService: AnimeService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id = data['id']

      // fetch anime data
      this.fetchAnime(id)

      // fetch anime characters
      this.fetchAnimeCharacters(id)

      // fetch anime recommendations
      this.fetchAnimeRecommendations(id)

      // fetch anime videos
      this.fetchAnimeVideos(id)

    })
  }

  // function to fetch a specific anime by ID and save to our fetchedAnime variable
  fetchAnime(animeId: string) {
    this.animeService.getAnimeById(animeId).subscribe({
      next: anime => {
        this.fetchedAnime = anime.data
        console.log(this.fetchedAnime)
      },
      error: e => {
        console.warn('We got an error fetching the anime by id: ', e)
      }
    })
  }

  // function to fetch anime characters and then sort them to the top 4 characters by favourites
  fetchAnimeCharacters(animeId: string) {
    this.animeService.getAnimeCharacters(animeId).subscribe({
      next: data => {
        // console.log(data.data)

        // creating a sorted characters list based on number of favorites on character by vote
        let sortedCharacters = data.data.sort(
          (p1: any, p2: any) => (p1.favorites < p2.favorites) ? 1 : (p1.favorites > p2.favorites) ? -1 : 0
        )

        // adding only 4 characters to the list from the sorted ones
        this.popularCharacters = sortedCharacters.splice(0,4);

        console.log(this.popularCharacters)
      },
      error: e => {
        console.warn('We got an error fetching the anime characters', e)
      }
    })
  }

  // fetch anime recommendations
  fetchAnimeRecommendations(animeId: string): void {
    this.animeService.getAnimeRecommendations(animeId).subscribe({
      next: data => {
        this.fetchedAnimeRecommendations = data.data
        // console.log(this.fetchedAnimeRecommendations)
      },
      error: e => {
        console.warn('We got an error fetching the anime recommendations: ', e)
      }
    })
  }

  // fetch anime videos
  fetchAnimeVideos(animeId:string): void {
    this.animeService.getAnimeVideosById(animeId).subscribe({
      next: data => {
        this.fetchedAnimeVideos = data.data.promo
        // console.log(data.data.promo)
      },
      error: e => {
        console.warn('We got an error fetching the anime videos: ', e)
      }
    })
  }

  // set up video || STEP 1
  setUpVideo(videoUrl: string): void {
    this.showModal = true;
    setTimeout(() => {
      document.querySelector('#video')?.setAttribute('src', videoUrl + "?autoplay=1&controls=1&fs=1")
    }, 1)

    // removing window scroll
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  }

  // close video || STEP 2
  closeVideo(): void {
    // close modal
    this.showModal = false;
    // re-enable scrolling
    document.body.style.height = 'auto'
    document.body.style.overflow = 'auto'

  }
  
  // function to handle scrolling in recommendations container
  // scrollRecommendedLeft() {
  //   console.log("scrolling left");
  //   this.recommendationsContainer.nativeElement.scrollBy({
  //     left: -1000,
  //     behavior: "smooth"
  //   })
  // }
  // scrollRecommendedRight() {
  //   console.log("scrolling right");
  //   this.recommendationsContainer.nativeElement.scrollBy({
  //     left: 1000,
  //     behavior: "smooth"
  //   })
  // }
  scrollRecommendations(direction: string) {
    this.recommendationsContainer.nativeElement.scrollBy({
      left: direction === "right" ? 500 : -500,
      behavior: "smooth"
    })
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
