import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [			
    AppComponent,
    HomeComponent,
      AnimeComponent,
      AnimeSearchComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
