import { Component } from '@angular/core'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbar } from '@angular/material/toolbar'
import { MatTooltip } from '@angular/material/tooltip'
import { NgOptimizedImage } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { removeTokens } from '../../functions/local-storage'
import { Store } from '../../stores/store'
import { AccountDialogComponent } from '../sites/account-dialog/account-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatToolbar,
    MatTooltip,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  logout = () => {
    removeTokens()
    this.store.ui.onLogout()
    return this.router.navigate(['/'])
  }

  openDialog = () => {
    this.dialog.open(AccountDialogComponent, {
      maxWidth: '100vw'
    })
  }

  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
}
