import { NgForOf } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '../../stores/store'
import { SitesModule } from '../../modules/sites/sites.module'

@Component({
  selector: 'app-apps-dialog',
  standalone: true,
  imports: [SitesModule, NgForOf],
  templateUrl: './apps-dialog.component.html',
  styleUrl: './apps-dialog.component.scss'
})
export class AppsDialogComponent {
  constructor(public store: Store) {}

  static getData = () => {
    return {
      title: 'Apps',
      buttonLabel: ''
    }
  }
}
