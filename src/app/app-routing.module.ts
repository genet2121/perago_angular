import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: "",
    loadChildren:() => import('./core/core.module').then((m)=>m.CoreModule)
  },
  // {
  //   path: "feature",
  //   loadChildren:() => import('./feature/feature.module').then((m)=>m.FeatureModule)
  // },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
