import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostionDetailComponent } from './add-postion/position-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { PositionComponent } from './position/position.component';
import { NgxsModule } from '@ngxs/store';
import { PositionState } from '../core/state/state/position.state';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
{
  path: 'position/detail',
  component: PostionDetailComponent,
  data: { breadcrumb: 'Organizational Structure' }
},
{
  path: 'position/create',
  component: PositionComponent,
  data: { breadcrumb: 'Position Form' }
},



]

@NgModule({
  declarations: [
    PostionDetailComponent,

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
