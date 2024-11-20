import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { AdminComponent } from './admin.component';
import { ExpertComponent } from './expert/expert.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guard/auth.guard';
const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'plants',
        pathMatch: 'full'
      },
      {
        path: 'plants',
        component: PlantComponent
      },
      {
        path: 'experts',
        component: ExpertComponent,
      },
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: '**',  // Ruta comodín para capturar rutas incorrectas
        redirectTo: 'plants'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
