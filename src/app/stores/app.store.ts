import { action, observable } from 'mobx-angular'
import { Observable, of } from 'rxjs'
import { App } from '../functions/types'

export class AppStore {
  @observable array: App[] = [
    {
      title: 'Twenty',
      subtitle: '20-20-20 timer',
      imageUrl: '/assets/icons/twenty-touch.svg',
      routerLink: '/twenty'
    }
  ]

  @action
  getList = (): Observable<App[]> => of(this.array)
}
