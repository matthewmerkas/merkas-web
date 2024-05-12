import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SitesComponent } from './sites.component'
import { SitesRoutingModule } from './sites-routing.module'
import { AuthGuard } from '../../guards/auth-guard.service'

import { ReactiveFormsModule } from '@angular/forms'
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FileBoardComponent } from './file-board/file-board.component'
import { SiteComponent } from './site/site.component'
import { TextBoardComponent } from './text-board/text-board.component'
import { ToolbarComponent } from '../toolbar/toolbar.component'

@NgModule({
  declarations: [SitesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SitesRoutingModule,
    MatAccordion,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    FileBoardComponent,
    SiteComponent,
    TextBoardComponent,
    ToolbarComponent
  ],
  providers: [AuthGuard]
})
export class SitesModule {}
