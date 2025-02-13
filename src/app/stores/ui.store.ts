import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError.js'
import { action, observable } from 'mobx-angular'

import { io, Socket } from 'socket.io-client'
import { Store } from './store'
import {
  getDecoded,
  getItem,
  getToken,
  removeItem
} from '../functions/local-storage'
import { environment } from '../../environments/environment'
import { applyTheme } from '../functions/colors'
import { DEFAULT_COLORS } from '../functions/constants'
import store from 'store2'

export class UiStore {
  @observable fab = true
  @observable loading = false
  @observable spinner = false
  @observable name = 'Merkas'
  @observable socket!: Socket
  @observable toolbarTheme?: 'inverse' | 'dark' | 'light'

  constructor(
    private isBrowser: boolean,
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store
  ) {
    if (!isBrowser) return
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
    // Set theme
    this._setTheme()
  }

  @action
  onLogin() {
    removeItem('colors')
    this._setTheme()
    this.store.recreate('app')
  }

  @action
  onLogout() {
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
    this.spinner = spinner
  }

  @action
  setToolbarTheme(theme?: 'inverse' | 'dark' | 'light') {
    this.toolbarTheme = theme
  }

  _setTheme() {
    const colors = getDecoded()?.colors || getItem('colors')
    colors && applyTheme(colors.primary, colors.tertiary, colors.secondary)
  }
}

export default UiStore
