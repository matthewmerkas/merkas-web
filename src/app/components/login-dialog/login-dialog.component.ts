import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton, MatIconButton } from '@angular/material/button'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card'
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog'
import { MatError, MatFormField } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInput, MatLabel } from '@angular/material/input'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router'

import { PasswordFieldComponent } from '../password-field/password-field.component'
import { DEFAULT_PATH } from '../../functions/constants'
import { Store } from '../../stores/store'
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDialogClose,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    PasswordFieldComponent,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  formGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
    public store: Store
  ) {}

  static getData = () => {
    return {
      title: 'Log In',
      buttonLabel: 'Continue'
    }
  }

  onSubmit = () => {
    if (this.formGroup.invalid || this.store.ui.loading) {
      return
    } else {
      const data = this.formGroup.getRawValue()
      this.store.user.login(data).subscribe(() => {
        this.store.ui.onLogin()
        this.dialogRef?.close()
        this.dialogRef?.afterClosed().subscribe(() => {
          return this.router.navigate([DEFAULT_PATH])
        })
      })
    }
  }
}
