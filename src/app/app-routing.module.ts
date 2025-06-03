import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AppsDialogComponent } from './components/apps-dialog/apps-dialog.component'
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component'
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component'
import { ThemeDialogComponent } from './components/theme-dialog/theme-dialog.component'
import { DialogComponent } from './functions/types'

export const dialogMap = new Map<string, DialogComponent>([
  ['account', AccountDialogComponent],
  ['apps', AppsDialogComponent],
  ['login', LoginDialogComponent],
  ['theme', ThemeDialogComponent]
])
const routes: Routes = [
  {
    path: 'converter',
    loadChildren: () =>
      import('./submodules/converter/converter.module').then(
        (m) => m.ConverterModule
      )
  },
  {
    path: 'mariah',
    loadChildren: () =>
      import('./submodules/mariah/mariah.module').then((m) => m.MariahModule)
  },
  {
    path: 'plotter',
    loadChildren: () =>
      import('./submodules/plotter/plotter.module').then((m) => m.PlotterModule)
  },
  {
    path: 'sites',
    loadChildren: () =>
      import('./modules/sites/sites.module').then((m) => m.SitesModule)
  },
  {
    path: 'twenty',
    loadChildren: () =>
      import('./submodules/twenty/twenty.module').then((m) => m.TwentyModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
