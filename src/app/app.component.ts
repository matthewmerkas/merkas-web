import { Component } from '@angular/core'
import { Store } from './stores/store'
import { animations } from './functions/animations'
import {
  ActivatedRoute,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router'
import { TOOLTIP_DELAY } from './functions/constants'
import { DialogComponent } from './components/dialog/dialog.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { dialogMap } from './app-routing.module'
import { RouteData } from './functions/types'
import { map, Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: animations(),
  standalone: false
})
export class AppComponent {
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public store: Store
  ) {
    let queryParams: Subscription
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.store.ui.setSpinner(true)
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.store.ui.setSpinner(false)
      }
      if (event instanceof NavigationEnd) {
        const data = this.getRouteData()
        for (const option of data.options || []) {
          dialogMap.set(option.id, option.component)
        }
        !queryParams && (queryParams = this.dialogHandler.subscribe())
      }
    })
  }

  private dialogHandler = this.route.queryParams.pipe(
    map((params) => {
      for (const param in params) {
        const component = dialogMap.get(param)
        if (!component) continue
        const config: MatDialogConfig = {
          data: { component, ...component.getData() },
          maxWidth: '100dvw'
        }
        if (!this.store.ui.init) {
          config.backdropClass = 'backdrop-init'
          config.enterAnimationDuration = 0
        }
        this.dialog
          .open(DialogComponent, config)
          .afterClosed()
          .subscribe(() => {
            const { [param]: removed, ...newParams } = params
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: newParams
            })
          })
      }
    })
  )

  private getRouteData = (route: ActivatedRoute = this.route) => {
    while (route.firstChild) {
      route = route.firstChild
    }
    return route.snapshot.data as RouteData
  }
}
