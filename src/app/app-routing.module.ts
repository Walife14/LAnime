import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'anime/:id',
    component: AnimeComponent
  },
  {
    path: 'explore/anime',
    component: AnimeSearchComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
