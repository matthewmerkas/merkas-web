import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, Validators } from '@angular/forms'
import { observable } from 'mobx-angular'
import { Store } from '../../../stores/store'
import { matchValidator } from '../../../functions/forms'
import { UserUpdate } from '../../../functions/types'

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent implements OnInit {
  @observable loading = false
  accountForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', Validators.required]
    },
    { validators: matchValidator('newPassword', 'confirmPassword') }
  )
  closeIsDisabled = true

  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private fb: FormBuilder,
    public store: Store
  ) {}

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

  onSubmit = () => {
    if (this.accountForm.invalid || this.store.ui.loading) {
      return
    } else {
      const data = this.accountForm.getRawValue() as UserUpdate
      delete data.confirmPassword
      this.store.user.update(data).subscribe(() => {
        this.dialogRef?.close()
      })
    }
  }
}
