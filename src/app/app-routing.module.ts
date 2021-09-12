import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';

const routes: Routes = [
  { path: '', component: CardsComponent },
  { path: 'movie/:id', component: ResultDetailsComponent },
  { path: 'tv/:id', component: ResultDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
