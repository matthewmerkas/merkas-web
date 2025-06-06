import { action, observable } from 'mobx-angular'
import { Observable, of } from 'rxjs'
import { App } from '../functions/types'
import { getToken } from '../functions/local-storage'
import { isStatic } from '../functions/helpers'

export class AppStore {
  @observable array: App[] = [
    {
      title: 'Event Logger',
      subtitle: 'Log recurring events',
      imageUrl: '/assets/icons/apps/light/mariah-touch.svg',
      routerLink: '/mariah'
    },
    {
      title: 'File Converter',
      subtitle: 'Convert any file locally',
      imageUrl: '/assets/icons/apps/light/converter-touch.svg',
      routerLink: '/converter'
    },
    {
      title: 'Ping Plotter',
      subtitle: 'Record network latency',
      imageUrl: '/assets/icons/apps/light/plotter-touch.svg',
      routerLink: '/plotter'
    },
    {
      title: 'Twenty',
      subtitle: '20-20-20 eye care timer',
      imageUrl: '/assets/icons/apps/light/twenty-touch.svg',
      routerLink: '/twenty'
    }
  ]

  constructor() {
    if (isStatic()) return
    if (getToken()) {
      this.array.splice(-1, 0, {
        title: 'Sites',
        subtitle: 'Text & file sharing, links',
        imageUrl: '/assets/icons/apps/light/sites-touch.svg',
        routerLink: '/sites'
      })
    }
  }

  @action
  getList = (): Observable<App[]> => of(this.array)
}
