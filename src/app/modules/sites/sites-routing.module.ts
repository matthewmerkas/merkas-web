import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SitesComponent } from './sites.component'
import { canActivate } from '../../guards/auth-guard.service'
import { TITLE_SUFFIX } from '../../functions/constants'

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    canActivate: [canActivate],
    title: 'Sites' + TITLE_SUFFIX
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
