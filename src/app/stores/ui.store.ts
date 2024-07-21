import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError.js'
import { action, observable } from 'mobx-angular'

import { io, Socket } from 'socket.io-client'
import { Store } from './store'
import { getToken, removeTokens } from '../functions/local-storage'
import { environment } from '../../environments/environment'

export class UiStore {
  @observable loading = false
  @observable spinner = false
  @observable name = 'Merkas'
  @observable socket: Socket

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store
  ) {
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
  }

  @action
  onLogin() {
    this.store.recreate('app')
  }

  @action
  onLogout() {
    removeTokens()
    this.store.recreate('app')
    this.store.recreate('board')
    this.setLoading(false)
    this.setSpinner(false)
    return this.router.navigate(['/'])
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading
  }

  @action
  setSpinner(spinner: boolean) {
    this.spinner = spinner
  }

  openSnackbar(message?: string, action = 'Close', duration = 3000) {
    if (message) {
      this.snackbar.open(message, action, { duration })
    }
  }
}

export default UiStore
