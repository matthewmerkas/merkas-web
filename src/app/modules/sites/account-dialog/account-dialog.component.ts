import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { NgIf } from '@angular/common'
import { observable } from 'mobx-angular'
import { Store } from '../../../stores/store'
import { PasswordFieldComponent } from '../../../components/password-field/password-field.component'
import { matchValidator } from '../../../functions/forms'
import { UserUpdate } from '../../../functions/types'

@Component({
  selector: 'app-account-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatProgressSpinner,
    NgIf,
    PasswordFieldComponent
  ],
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
