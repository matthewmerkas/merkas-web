import { HttpClient } from '@angular/common/http'
import { action, observable } from 'mobx-angular'
import { map, Observable, of } from 'rxjs'

import { apiConfig } from '../../environments/api.config'
import { environment } from '../../environments/environment'
import { Site } from '../functions/types'

export class SiteStore {
  @observable array: Site[] = []
  url = environment.apiUrl + apiConfig.site

  constructor(private http: HttpClient) {}

  @action
  getList(): Observable<Site[]> {
    if (this.array?.length > 0) {
      return of(this.array)
    }
    return this.http.get<any>(this.url).pipe(
      map((res: Site[]) => {
        this.array = res
        return res
      })
    )
  }
}
