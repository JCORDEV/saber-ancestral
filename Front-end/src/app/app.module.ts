import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlantComponent } from './features/admin/plant/plant.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { ExpertComponent } from './features/admin/expert/expert.component';
import { CategoryComponent } from './features/admin/category/category.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { HomeComponent } from './features/client/home/home.component';
import { ClientComponent } from './features/client/client.component';
import { AdminComponent } from './features/admin/admin.component';
import { AdminRoutingModule } from './features/admin/admin-routing.module';
import { ClientRoutingModule } from './features/client/client-routing.module';
import { PlantsComponent } from './features/client/plants/plants.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterOptionsComponent } from './components/filter-options/filter-options.component';
import { ExpertsComponent } from './features/client/experts/experts.component';
import { AboutComponent } from './features/client/about/about.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalClientComponent } from './components/modal-client/modal-client.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoginComponent } from './features/admin/login/login.component';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantComponent,
    SlidebarComponent,
    ExpertComponent,
    CategoryComponent,
    ModalComponent,
    TableComponent,
    DropdownComponent,
    ClientComponent,
    AdminComponent,
    PlantsComponent,
    NavbarComponent,
    FilterOptionsComponent,
    ExpertsComponent,
    AboutComponent,
    PaginationComponent,
    ModalClientComponent,
    ToastComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ClientRoutingModule
  ],
  providers: [
    // provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
