import { NgForOf } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '../../stores/store'
import { SiteComponent } from '../site/site.component'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'app-apps-dialog',
  imports: [NgForOf, SiteComponent, MatIcon, MatTooltip, MatButton],
  templateUrl: './apps-dialog.component.html',
  styleUrl: './apps-dialog.component.scss'
})
export class AppsDialogComponent {
  constructor(
    protected dialogRef: MatDialogRef<DialogComponent>,
    public store: Store
  ) {}

  static getData = () => {
    return {
      title: 'Apps',
      buttonLabel: ''
    }
  }
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
}
