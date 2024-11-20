import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { PlantsComponent } from './plants/plants.component';
import { ExpertsComponent } from './experts/experts.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'prefix'
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'plants',
        component: PlantsComponent
      },
      {
        path: 'experts',
        component: ExpertsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '**',  // Ruta comodín para capturar rutas incorrectas
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
