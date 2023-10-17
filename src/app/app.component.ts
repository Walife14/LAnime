import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LAnime';

  displayNav: boolean = false;

  searchInput = new FormControl('', [Validators.required, Validators.minLength(2)])

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.displayNav = false;
    })
  }

  searchForAnime(inputString: string | null): void {
    if (!this.searchInput.errors) {
      this.router.navigate(['/explore/anime/'], { queryParams: { search: inputString }})
    } else {
      console.warn("Search input is invalid")
    }
  }

  // close nav on scroll
  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.displayNav = false;
  }

}
