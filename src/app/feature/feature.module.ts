import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostionComponent } from './add-postion/add-postion.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';

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
    NgZorroAntdModule,
    RouterModule.forChild(routes)

  ]
})
export class FeatureModule { }
