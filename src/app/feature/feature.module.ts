import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostionComponent } from './add-postion/add-postion.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { PositionDetailComponent } from './position-detail/position-detail.component';
import { PositionComponent } from './position/position.component';
import { NgxsModule } from '@ngxs/store';
import { PositionState } from '../core/state/state/position.state';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
  path: 'position/create',
  component: AddPostionComponent
},
{
  path: 'position/detail',
  component: PositionComponent
},
{path:'position/detail/:id',
  component:PositionComponent
},
{
  path:'position/list',
  component:PositionDetailComponent
}



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
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forFeature([PositionState]) ,
    RouterModule.forChild(routes)

  ]

})
export class FeatureModule { }
