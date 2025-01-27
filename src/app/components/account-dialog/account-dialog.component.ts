import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Store } from '../../stores/store'
import { matchValidator } from '../../functions/forms'
import { UserUpdate } from '../../functions/types'
import { getDecoded } from '../../functions/local-storage'
import { NgIf } from '@angular/common'
import { PasswordFieldComponent } from '../password-field/password-field.component'

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  imports: [ReactiveFormsModule, NgIf, PasswordFieldComponent],
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent {
  formGroup = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', Validators.required]
    },
    { validators: matchValidator('newPassword', 'confirmPassword') }
  )
  user = getDecoded()

  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    private fb: FormBuilder,
    public store: Store
  ) {}

  static getData = () => {
    return {
      title: 'Account Settings',
      buttonLabel: 'Save'
    }
  }

  onSubmit = () => {
    if (this.formGroup.invalid || this.store.ui.loading) {
      return
    } else {
      const data = this.formGroup.getRawValue() as UserUpdate
      delete data.confirmPassword
      this.store.user.update(data).subscribe(() => {
        this.dialogRef?.close()
      })
    }
  }
}
