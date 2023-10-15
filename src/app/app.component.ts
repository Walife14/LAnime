import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LAnime';

  displayNav: boolean = false;

  // close nav on scroll
  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.displayNav = false;
  }

}
