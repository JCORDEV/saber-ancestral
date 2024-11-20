import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantComponent } from './features/admin/plant/plant.component';
import { ExpertComponent } from './features/admin/expert/expert.component';
import { CategoryComponent } from './features/admin/category/category.component';
import { HomeComponent } from './features/client/home/home.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PlantComponent
  // },
  // {
  //   path: 'admin/plants/page/:page',
  //   component: PlantComponent,
  // },
  // {
  //   path: 'admin/plants',
  //   redirectTo: 'admin/plants/page/1'
  // },
  // {
  //   path: 'admin/experts/page/:page',
  //   component: ExpertComponent,
  // },
  // {
  //   path: 'admin/experts',
  //   redirectTo: 'admin/experts/page/1',
  // },
  // {
  //   path: 'admin/categories/page/:page',
  //   component: CategoryComponent,
  // },
  // {
  //   path: 'admin/categories',
  //   redirectTo: 'admin/categories/page/1',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
