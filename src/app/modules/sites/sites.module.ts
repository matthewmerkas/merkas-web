import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'

import { FileBoardComponent } from './file-board/file-board.component'
import { SiteComponent } from '../../components/site/site.component'
import { SitesComponent } from './sites.component'
import { SitesRoutingModule } from './sites-routing.module'
import { TextBoardComponent } from './text-board/text-board.component'
import { PasswordFieldComponent } from '../../components/password-field/password-field.component'
import { AuthGuard } from '../../guards/auth-guard.service'

import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { ReactiveFormsModule } from '@angular/forms'
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader
} from '@angular/material/expansion'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix
} from '@angular/material/input'
import { MatTooltip } from '@angular/material/tooltip'
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card'
import {
  MatButtonToggle,
  MatButtonToggleGroup
} from '@angular/material/button-toggle'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatDialogClose } from '@angular/material/dialog'
import { MatRipple } from '@angular/material/core'

@NgModule({
  declarations: [FileBoardComponent, SitesComponent, TextBoardComponent],
  imports: [
    CommonModule,
    CdkTextareaAutosize,
    MatAccordion,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDialogClose,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatProgressBar,
    MatProgressSpinner,
    MatRipple,
    MatSuffix,
    MatTooltip,
    NgOptimizedImage,
    PasswordFieldComponent,
    ReactiveFormsModule,
    SiteComponent,
    SitesRoutingModule
  ],
  providers: [AuthGuard]
})
export class SitesModule {}
