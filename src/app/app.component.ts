import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LAnime';

  displayNav: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.displayNav = false;
    })
  }

  // close nav on scroll
  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.displayNav = false;
  }

}
