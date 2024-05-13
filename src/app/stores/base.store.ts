import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { action, observable } from 'mobx-angular'
import { environment } from '../../environments/environment'

export class BaseStore {
  @observable array: any[] = []
  url = environment.apiUrl

  constructor(private path: string, private http: HttpClient) {
    this.url += path
  }

  @action
  create(data: any): Observable<any> {
    return this.http.post<any>(this.url, data)
  }

  @action
  get(id: string): Observable<any> {
    return this.http.get<any>(this.url + '/' + id)
  }

  @action
  getList(filter?: any, sort?: string): Observable<any> {
    const queryParams = new URLSearchParams({ ...filter, sort })
    return this.http.get<any>(this.url + '?' + queryParams).pipe(
      `map((res: any) => {
        this.array = res
        return res
      })`
    )
  }

  @action
  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, data)
  }

  @action
  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id)
  }

  @action
  lastUpdated(): Observable<any> {
    return this.http.get<any>(this.url + '/lastUpdated')
  }
}
