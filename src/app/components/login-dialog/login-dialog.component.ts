import { NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { Router } from '@angular/router'
import { observable } from 'mobx-angular'
import { PasswordFieldComponent } from '../password-field/password-field.component'
import { DEFAULT_PATH } from '../../functions/constants'
import { Store } from '../../stores/store'

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgIf,
    PasswordFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements OnInit {
  @observable loading = false
  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  closeIsDisabled = true

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
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
    if (this.authForm.invalid || this.store.ui.loading) {
      return
    } else {
      const data = this.authForm.getRawValue()
      this.store.user.login(data).subscribe(() => {
        this.dialogRef?.close()
        this.dialogRef?.afterClosed().subscribe(() => {
          return this.router.navigate([DEFAULT_PATH])
        })
      })
    }
  }
}
