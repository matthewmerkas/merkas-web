import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'

import { SitesComponent } from './sites.component'
import { SitesRoutingModule } from './sites-routing.module'
import { AuthGuard } from '../../guards/auth-guard.service'

import { ReactiveFormsModule } from '@angular/forms'
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatRipple } from '@angular/material/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FileBoardComponent } from './file-board/file-board.component'
import { SiteComponent } from './site/site.component'
import { TextBoardComponent } from './text-board/text-board.component'

@NgModule({
  declarations: [SitesComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SitesRoutingModule,
    MatAccordion,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRipple,
    MatToolbarModule,
    MatTooltipModule,
    FileBoardComponent,
    SiteComponent,
    TextBoardComponent
  ],
  providers: [AuthGuard]
})
export class SitesModule {}
