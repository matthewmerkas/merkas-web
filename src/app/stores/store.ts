import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { observable } from 'mobx-angular'

import { FileStore } from './file.store'
import { ImageStore } from './image.store'
import { SiteStore } from './site.store'
import { UiStore } from './ui.store'
import { UserStore } from './user.store'
import { BoardStore } from './board.store'

@Injectable({
  providedIn: 'root'
})
export class Store {
  @observable board: BoardStore
  @observable file: FileStore
  @observable image: ImageStore
  @observable site: SiteStore
  @observable ui: UiStore
  @observable user: UserStore

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
    this.board = new BoardStore(http)
    this.image = new ImageStore(http)
    this.site = new SiteStore(http)
    this.ui = new UiStore(snackbar, this)
    this.file = new FileStore(http, this)
    this.user = new UserStore(http)
  }

  recreate(name: string) {
    if (name === 'board') {
      this.board = new BoardStore(this.http)
    }
  }
}
