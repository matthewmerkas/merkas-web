import { Location } from '@angular/common'
import {
  Component,
  EventEmitter,
  HostListener,
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
  animations: animations('100ms'),
  standalone: false
})
export class DialogComponent implements OnInit {
  @observable closeIsDisabled = true
  @observable loading = false
  @observable buttonLabel = ''
  @observable maxWidth = ''
  @observable minWidth = '0'
  @observable title = ''
  @observable valid = false
  @observable validChange = new EventEmitter<boolean>()
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private location: Location,
    public store: Store
  ) {
    this.buttonLabel = data.buttonLabel
    this.maxWidth = data.maxWidth || '320px'
    this.minWidth = data.minWidth || '0'
    this.title = data.title
    this.valid = false
  }

  @HostListener('document:keydown.escape')
  onEscapeKey = () => this.close()

  @ViewChild('dynamic') set set(dynamic: any) {
    const component = dynamic.componentRef?.instance
    if (!component || typeof window === 'undefined') return
    this.onSubmit = component.onSubmit
    window.setTimeout(() => (this.valid = component.formGroup?.valid))
    component.formGroup?.statusChanges.subscribe((status: FormControlStatus) =>
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
    this.dialogRef.backdropClick().subscribe(() => this.location.back())
    this.dialogRef.disableClose = true
  }

  close = () => this.location.back()
}
