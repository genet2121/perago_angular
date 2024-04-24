import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostionComponent } from './add-postion/add-postion.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'position/create',
  component: AddPostionComponent
},



]

@NgModule({
  declarations: [
    AddPostionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class FeatureModule { }
