import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '../../stores/store'
import { observable } from 'mobx-angular'
import { getRealToken } from '../../functions/local-storage'
import { MatDialog } from '@angular/material/dialog'
import { DEFAULT_PATH } from '../../functions/constants'
import { animations } from '../../functions/animations'
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { AppsDialogComponent } from '../../components/apps-dialog/apps-dialog.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: animations('200ms'),
  standalone: false
})
export class HomeComponent implements OnInit {
  @observable appName = '...'
  @observable title = '...'
  showSplash = false

  protected readonly AppsDialogComponent = AppsDialogComponent
  protected readonly LoginDialogComponent = LoginDialogComponent

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public store: Store
  ) {}

  ngOnInit() {
    if (getRealToken()) {
      // Don't flash protected content in static renders
      this.router.navigate([DEFAULT_PATH])
    } else {
      this.showSplash = true
    }
  }

  openDialog = (component: { getData: () => any }) => {
    this.dialog.open(DialogComponent, {
      data: { component, ...component.getData() },
      maxWidth: '100dvw'
    })
  }
}
