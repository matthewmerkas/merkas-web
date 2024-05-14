import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { observable } from 'mobx-angular'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { Store } from '../../stores/store'
import { FormControlStatus } from '@angular/forms'
import { animations } from '../../functions/animations'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  animations: animations('100ms')
})
export class DialogComponent implements OnInit {
  @observable closeIsDisabled = true
  @observable loading = false
  @observable buttonLabel = ''
  @observable title = ''
  @observable valid = false
  @observable validChange = new EventEmitter<boolean>()
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    public store: Store
  ) {
    this.buttonLabel = data.buttonLabel
    this.title = data.title
    this.valid = false
  }

  @ViewChild('dynamic') set set(dynamic: any) {
    const component = dynamic.componentRef.instance
    this.onSubmit = component.onSubmit
    component?.formGroup.statusChanges.subscribe((status: FormControlStatus) =>
      this.validChange.emit(status === 'VALID')
    )
    this.validChange.subscribe((value) => (this.valid = value))
  }

  @observable onSubmit = () => {}

  ngOnInit() {
    // Ensure close button does not get focus on open
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.closeIsDisabled = false
      }, 100)
    })
    this.dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.closeIsDisabled = true
      }, 100)
    })
  }
}
