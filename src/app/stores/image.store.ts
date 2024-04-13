import { HttpClient } from '@angular/common/http'
import { action } from 'mobx-angular'
import { map, Observable, of } from 'rxjs'

import { apiConfig } from '../../environments/api.config'
import { environment } from '../../environments/environment'
import { Site } from '../functions/types'

export class ImageStore {
  map = new Map<string, string>()
  url = environment.apiUrl + apiConfig.images
  constructor(private http: HttpClient) {}
  @action
  get(site?: Site): Observable<string> {
    if (!site?.imageName) {
      return of()
    }
    const url = this.map.get(site._id)
    if (url) {
      return of(url)
    }
    return this.http
      .get<Blob>(this.url + '/' + site.imageName, {
        responseType: 'blob' as 'json'
      })
      .pipe(
        map((res: Blob) => {
          const url = URL.createObjectURL(res)
          this.map.set(site._id, url)
          return url
        })
      )
  }
}
