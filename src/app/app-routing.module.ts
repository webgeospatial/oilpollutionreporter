//imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import component so that this routing module can use outputs from the component to define variables that can be used in links/routing
import { SelectlocationComponent } from './selectlocation/selectlocation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectedlocationComponent } from './selectedlocation/selectedlocation.component';

//set first routing paths and links to the imported component
const routes: Routes = [
  //set default path
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'selectlocation', component: SelectlocationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'selecteditem/:id', component: SelectedlocationComponent },

];

//makes this available everywhere (I think)
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
