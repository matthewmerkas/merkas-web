import { MatSnackBar } from '@angular/material/snack-bar'
import { isUnauthorizedError } from '@thream/socketio-jwt/build/UnauthorizedError.js'
import { action, observable } from 'mobx-angular'
import { io, Socket } from 'socket.io-client'

import { Store } from './store'
import { getToken } from '../functions/local-storage'
import { environment } from '../../environments/environment'
import * as Y from 'yjs'
import { BoardStore } from './board.store'

export class UiStore {
  @observable loading = false
  @observable name = 'Merkas'
  @observable socket: Socket

  constructor(private snackbar: MatSnackBar, private store: Store) {
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
  onLogout() {
    this.store.recreate('board')
    this.setLoading(false)
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading
  }

  openSnackbar(message?: string, action = 'Close', duration = 3000) {
    if (message) {
      this.snackbar.open(message, action, { duration })
    }
  }
}

export default UiStore
