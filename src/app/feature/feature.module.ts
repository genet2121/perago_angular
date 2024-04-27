import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostionComponent } from './add-postion/add-postion.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { PositionDetailComponent } from './position-detail/position-detail.component';
import { PositionComponent } from './position/position.component';
import { NgxsModule } from '@ngxs/store';
import { PositionState } from '../core/state/state/position.state';

const routes: Routes = [
  {
  path: 'position/create',
  component: AddPostionComponent
},
{
  path: 'position/detail',
  component: PositionComponent
},



]

@NgModule({
  declarations: [
    AddPostionComponent,
    PositionDetailComponent,
    PositionComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxsModule.forFeature([PositionState]) ,
    RouterModule.forChild(routes)

  ]
})
export class FeatureModule { }
