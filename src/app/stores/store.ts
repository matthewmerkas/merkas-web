import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { observable } from 'mobx-angular'

import { AppStore } from './app.store'
import { BoardStore } from './board.store'
import { FileStore } from './file.store'
import { ImageStore } from './image.store'
import { SiteStore } from './site.store'
import { UiStore } from './ui.store'
import { UserStore } from './user.store'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class Store {
  @observable app: AppStore
  @observable board: BoardStore
  @observable file: FileStore
  @observable image: ImageStore
  @observable site: SiteStore
  @observable ui: UiStore
  @observable user: UserStore

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    const isBrowser = isPlatformBrowser(platformId)
    this.app = new AppStore()
    this.board = new BoardStore(http)
    this.image = new ImageStore(http)
    this.site = new SiteStore(http)
    this.ui = new UiStore(isBrowser, router, snackbar, this)
    this.file = new FileStore(http, this)
    this.user = new UserStore(http)
  }

  recreate(name: string) {
    if (name === 'app') {
      this.app = new AppStore()
    } else if (name === 'board') {
      this.board = new BoardStore(this.http)
    }
  }
}
