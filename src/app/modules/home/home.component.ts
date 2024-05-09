import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '../../stores/store'
import { FormBuilder, Validators } from '@angular/forms'
import { observable } from 'mobx-angular'
import { getToken } from '../../functions/local-storage'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @observable appName = '...'
  @observable loading = false
  @observable title = '...'
  @observable showPassword = false
  @ViewChild('loginDialog', { static: false }) loginDialog?: TemplateRef<any>
  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  closeIsDisabled = true
  dialogRef?: MatDialogRef<any>
  showSplash = false

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    public store: Store
  ) {}

  ngOnInit() {
    if (getToken()) {
      this.router.navigate(['/sites'])
    } else {
      this.showSplash = true
    }
  }

  openDialog = () => {
    this.dialogRef = this.dialog.open(this.loginDialog!, {
      maxWidth: '100vw'
    })
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.closeIsDisabled = false
      }, 100)
    })
    this.dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.authForm.reset()
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
          return this.router.navigate(['/sites'])
        })
      })
    }
  }
}
