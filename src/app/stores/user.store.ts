import { HttpClient } from '@angular/common/http'
import { action } from 'mobx-angular'
import { map, Observable } from 'rxjs'

import { getRefreshToken, setTokens } from '../functions/local-storage'
import { Jwt } from '../functions/types'
import { apiConfig } from '../../environments/api.config'
import { environment } from '../../environments/environment'

export class UserStore {
  url = environment.apiUrl + apiConfig.user.base

  constructor(private http: HttpClient) {}

  @action
  login(data: any): Observable<any> {
    return this.http.post<any>(this.url + apiConfig.user.login, data).pipe(
      map((res: Jwt) => {
        setTokens(res)
        return res
      })
    )
  }

  @action
  refresh(): Observable<any> {
    const data = { refreshToken: getRefreshToken() }
    return this.http.post<any>(this.url + apiConfig.user.refresh, data).pipe(
      map((res: Jwt) => {
        setTokens(res)
        return res
      })
    )
  }
}
