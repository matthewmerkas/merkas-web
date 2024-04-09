import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SitesComponent } from './sites.component'
import { canActivate } from '../../guards/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    canActivate: [canActivate]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
