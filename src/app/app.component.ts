import { Component } from '@angular/core'
import { Store } from './stores/store'
import { animations } from './functions/animations'
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: animations()
})
export class AppComponent {
  constructor(private router: Router, public store: Store) {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.store.ui.setSpinner(true)
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.store.ui.setSpinner(false)
      }
    })
  }
}
