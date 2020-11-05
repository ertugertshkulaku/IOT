import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssetListComponent} from './asset-list/asset-list.component';
import {DevicesComponent} from './devices/devices.component';

const routes: Routes = [
  {path:'', component: AssetListComponent},
  {path:'assets', component: AssetListComponent},
  {path:'assets/:id', component: DevicesComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
