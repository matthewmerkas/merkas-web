import { Component, OnInit } from '@angular/core'
import { ActivationStart, NavigationEnd, Router } from '@angular/router'
import { map } from 'rxjs'

import { LoginDialogComponent } from '../login-dialog/login-dialog.component'
import { AccountDialogComponent } from '../account-dialog/account-dialog.component'
import { AppsDialogComponent } from '../apps-dialog/apps-dialog.component'
import { ThemeDialogComponent } from '../theme-dialog/theme-dialog.component'
import { DEFAULT_PATH, TOOLTIP_DELAY } from '../../functions/constants'
import { getToken } from '../../functions/local-storage'
import { animations } from '../../functions/animations'
import { ExtraOption } from '../../functions/types'
import { Store } from '../../stores/store'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: animations('200ms'),
  standalone: false
})
export class ToolbarComponent implements OnInit {
  extraOptions: ExtraOption[] = []
  showToolbar = false
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
  protected readonly DEFAULT_PATH = DEFAULT_PATH
  protected readonly getToken = getToken
  protected readonly AccountDialogComponent = AccountDialogComponent
  protected readonly AppsDialogComponent = AppsDialogComponent
  protected readonly LoginDialogComponent = LoginDialogComponent
  protected readonly ThemeDialogComponent = ThemeDialogComponent

  constructor(public store: Store, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        map((e) => {
          if (e instanceof ActivationStart) {
            const data = e.snapshot.data
            this.extraOptions = data['options'] || []
          } else if (e instanceof NavigationEnd) {
            // Don't show the toolbar on the "Merkas!" splash screen
            this.showToolbar = e.urlAfterRedirects.split('?')[0] !== '/'
            // Reset toolbar to default color
            const exempt = ['/twenty']
            if (!exempt.includes(e.url)) {
              this.store.ui.setToolbarTheme()
            }
          }
        })
      )
      .subscribe()
  }

  getQueryParams = (option: ExtraOption) =>
    option?.id ? { [option.id]: true } : {}

  logout = () => this.store.ui.onLogout()
}
