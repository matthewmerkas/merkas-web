import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivationStart, NavigationEnd, Router } from '@angular/router'
import { map } from 'rxjs'

import { LoginDialogComponent } from '../login-dialog/login-dialog.component'
import { DEFAULT_PATH, TOOLTIP_DELAY } from '../../functions/constants'
import { getToken, removeTokens } from '../../functions/local-storage'
import { AccountDialogComponent } from '../../modules/sites/account-dialog/account-dialog.component'
import { DialogComponent } from '../dialog/dialog.component'
import { animations } from '../../functions/animations'
import { ExtraOption } from '../../functions/types'
import { Store } from '../../stores/store'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: animations('200ms')
})
export class ToolbarComponent implements OnInit {
  extraOptions: ExtraOption[] = []
  showToolbar = false
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
  protected readonly DEFAULT_PATH = DEFAULT_PATH
  protected readonly getToken = getToken
  protected readonly AccountDialogComponent = AccountDialogComponent
  protected readonly LoginDialogComponent = LoginDialogComponent

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        map((e) => {
          if (e instanceof ActivationStart) {
            const data = e.snapshot.data
            this.extraOptions = data['options'] || []
          } else if (e instanceof NavigationEnd) {
            // Don't show the toolbar on the "Merkas!" splash screen
            this.showToolbar = e.urlAfterRedirects !== '/'
          }
        })
      )
      .subscribe()
  }

  logout = () => {
    removeTokens()
    this.store.ui.onLogout()
    return this.router.navigate(['/'])
  }

  openDialog = (component: any) => {
    this.dialog.open(DialogComponent, {
      data: { component, ...component.getData() },
      maxWidth: '100vw'
    })
  }
}
