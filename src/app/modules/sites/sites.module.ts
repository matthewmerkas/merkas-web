import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'

import { AccountDialogComponent } from './account-dialog/account-dialog.component'
import { FileBoardComponent } from './file-board/file-board.component'
import { SiteComponent } from './site/site.component'
import { SitesComponent } from './sites.component'
import { SitesRoutingModule } from './sites-routing.module'
import { TextBoardComponent } from './text-board/text-board.component'
import { PasswordFieldComponent } from '../../components/password-field/password-field.component'

import { AuthGuard } from '../../guards/auth-guard.service'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatDialogClose } from '@angular/material/dialog'

@NgModule({
  declarations: [
    AccountDialogComponent,
    FileBoardComponent,
    SiteComponent,
    SitesComponent,
    TextBoardComponent
  ],
  imports: [
    CommonModule,
    FaIconComponent,
    MatAccordion,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SitesRoutingModule,
    NgOptimizedImage,
    PasswordFieldComponent,
    MatDialogClose
  ],
  exports: [],
  providers: [AuthGuard]
})
export class SitesModule {}
