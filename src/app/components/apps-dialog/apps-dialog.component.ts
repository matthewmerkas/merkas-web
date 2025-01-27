import { NgForOf } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '../../stores/store'
import { SiteComponent } from '../site/site.component'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { MatDialogClose } from '@angular/material/dialog'

@Component({
  selector: 'app-apps-dialog',
  imports: [
    NgForOf,
    SiteComponent,
    MatIcon,
    MatTooltip,
    MatDialogClose,
    MatButton
  ],
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
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
}
