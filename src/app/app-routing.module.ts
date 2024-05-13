import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  // {
  //   path: 'twenty',
  //   loadChildren: () =>
  //     import('./submodules/twenty/twenty.module').then((m) => m.TwentyModule)
  // },
  // {
  //   path: 'mariah',
  //   loadChildren: () =>
  //     import('./submodules/mariah/mariah.module').then((m) => m.MariahModule)
  // },
  {
    path: 'sites',
    loadChildren: () =>
      import('./modules/sites/sites.module').then((m) => m.SitesModule)
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
