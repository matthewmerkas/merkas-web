import { DOCUMENT } from '@angular/common'
import { EventEmitter, inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError.js'
import { action, observable } from 'mobx-angular'
import { io, Socket } from 'socket.io-client'
import store from 'store2'

import {
  getDecoded,
  getItem,
  getToken,
  removeItem
} from '../functions/local-storage'
import { environment } from '../../environments/environment'
import { applyTheme } from '../functions/colors'
import { DEFAULT_COLORS } from '../functions/constants'
import { isStatic } from '../functions/helpers'
import { Store } from './store'

export class UiStore {
  document = inject(DOCUMENT)

  @observable fab = true
  @observable hidden = new EventEmitter<boolean>()
  @observable init = false
  @observable loading = false
  @observable spinner = false
  @observable name = 'Merkas'
  @observable socket!: Socket
  @observable toolbarTheme?: 'inverse' | 'dark' | 'light'

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store
  ) {
    if (isStatic()) return
    // Require Bearer Token
    const socket = (this.socket = io(environment.socketUri, {
      auth: { token: `Bearer ${getToken()}` }
    }))
    // Handling token expiration
    socket.on('connect_error', (error) => {
      if (isUnauthorizedError(error) && getToken()) {
        console.debug('Refreshing token...')
        this.store.user.refresh().subscribe()
      }
    })
    // Page Visibility API
    this.document.addEventListener('visibilitychange', () =>
      this.hidden.emit(this.document.hidden)
    )
    // Set theme
    this.setTheme()
    // Set flag to enable some animations after page load
    setTimeout(() => (this.init = true), 1000)
  }

  @action
  onLogin() {
    removeItem('colors')
    this.setTheme()
    this.store.recreate('app')
  }

  @action
  onLogout() {
    if (isStatic()) {
      return Promise.resolve(false)
    }
    store.clearAll()
    applyTheme(DEFAULT_COLORS.primary)
    this.store.recreate('app')
    this.store.recreate('board')
    this.setLoading(false)
    this.setSpinner(false)
    return this.router.navigate(['/'])
  }

  @action
  openSnackbar(message?: string, action = 'Close', duration = 3000) {
    if (message) {
      this.snackbar.open(message, action, { duration })
    }
  }

  @action
  setFab(shown: boolean) {
    this.fab = shown
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading
  }

  @action
  setSpinner(spinner: boolean) {
    if (isStatic()) return
    this.spinner = spinner
  }

  @action
  setToolbarTheme(theme?: 'inverse' | 'dark' | 'light') {
    this.toolbarTheme = theme
  }

  private setTheme() {
    const colors = getDecoded()?.colors || getItem('colors') || DEFAULT_COLORS
    colors && applyTheme(colors.primary, colors.tertiary, colors.secondary)
  }
}

export default UiStore
