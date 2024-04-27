import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PositionState } from './state/state/position.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

const routes: Routes = [

  {
    path: '',
    component: WorkspaceComponent,
    loadChildren: () =>
      import('../feature/feature.module').then((m) => m.FeatureModule),
  },]
// {
//   path: "settings",
//   loadChildren:() => import('./settings/settings.module').then((m)=>m.SettingsModule)
// },
@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxsModule.forRoot([PositionState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [
    NgxsModule,
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule
  ]
})
export class CoreModule { }
