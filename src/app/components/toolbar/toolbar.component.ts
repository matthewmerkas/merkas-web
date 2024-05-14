import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { NavigationEnd, Router } from '@angular/router'
import { filter, map } from 'rxjs'

import { LoginDialogComponent } from '../login-dialog/login-dialog.component'
import { DEFAULT_PATH, TOOLTIP_DELAY } from '../../functions/constants'
import { getToken, removeTokens } from '../../functions/local-storage'
import { AccountDialogComponent } from '../../modules/sites/account-dialog/account-dialog.component'
import { Store } from '../../stores/store'
import { animations } from '../../functions/animations'
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: animations('200ms')
})
export class ToolbarComponent implements OnInit {
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
    // Don't show the toolbar on the "Merkas!" splash screen
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => {
          this.showToolbar = e.urlAfterRedirects !== '/'
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
