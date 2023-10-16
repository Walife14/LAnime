import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';

@NgModule({
  declarations: [			
    AppComponent,
    HomeComponent,
      AnimeComponent,
      AnimeSearchComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
