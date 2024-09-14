import { Component } from '@angular/core'
import { Store } from './stores/store'
import { animations } from './functions/animations'
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router'
import { AppsDialogComponent } from './components/apps-dialog/apps-dialog.component'
import { TOOLTIP_DELAY } from './functions/constants'
import { DialogComponent } from './components/dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: animations()
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    public store: Store
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.store.ui.setSpinner(true)
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.store.ui.setSpinner(false)
      }
    })
  }

  protected readonly AppsDialogComponent = AppsDialogComponent
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  openDialog = (component: any) => {
    this.dialog.open(DialogComponent, {
      data: { component, ...component.getData() },
      maxWidth: '100dvw'
    })
  }
}
