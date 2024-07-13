import { action, observable } from 'mobx-angular'
import { Observable, of } from 'rxjs'
import { App } from '../functions/types'
import { getToken } from '../functions/local-storage'

export class AppStore {
  @observable array: App[] = [
    {
      title: 'Twenty',
      subtitle: '20-20-20 timer',
      imageUrl: '/assets/icons/twenty-touch.svg',
      routerLink: '/twenty'
    }
  ]

  constructor() {
    if (getToken()) {
      this.array.push({
        title: 'Sites',
        subtitle: 'Text & file sharing, links',
        imageUrl: '/assets/icons/sites-touch.svg',
        routerLink: '/sites'
      })
    }
  }

  @action
  getList = (): Observable<App[]> => of(this.array)
}
