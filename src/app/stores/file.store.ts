import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http'
import { action } from 'mobx-angular'
import { map, Observable } from 'rxjs'

import { apiConfig } from '../../environments/api.config'
import { environment } from '../../environments/environment'
import { MerkasFile } from '../functions/types'
import { Store } from './store'

export class FileStore {
  url = environment.apiUrl + apiConfig.file.base
  constructor(private http: HttpClient, private store: Store) {}

  @action
  getList(target: 'public' | 'private'): Observable<MerkasFile[]> {
    const url = this.url + apiConfig.file[target]
    return this.http.get<MerkasFile[]>(url)
  }

  @action
  delete(target: 'public' | 'private'): Observable<void> {
    const url = this.url + apiConfig.file[target]
    return this.http.delete<void>(url)
  }

  @action
  download(target: 'public' | 'private'): Observable<number | Blob> {
    const url = this.url + apiConfig.file.download + apiConfig.file[target]
    return this.http
      .get<Blob>(url, {
        responseType: 'blob' as 'json',
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.store.ui.openSnackbar('Downloading...')
              break
            case HttpEventType.ResponseHeader:
              return 1
            case HttpEventType.DownloadProgress:
              return Math.round((event.loaded / event.total!) * 100)
            case HttpEventType.Response:
              const content = event.headers.get('content-disposition') || ''
              const url = URL.createObjectURL(event.body)
              let a = document.createElement('a')
              document.body.appendChild(a)
              a.setAttribute('style', 'display: none')
              a.href = url
              const regex = /"(.*?)"/g
              const arr = regex.exec(content)
              a.download = arr?.at(0) || ''
              a.click()
              window.URL.revokeObjectURL(url)
              a.remove()
              return event.body
          }
        })
      )
  }

  @action
  upload(
    files: File[],
    target: 'public' | 'private'
  ): Observable<number | MerkasFile[]> {
    const url = this.url + apiConfig.file.upload + apiConfig.file[target]
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    return this.http
      .put(url, formData, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.store.ui.openSnackbar('Uploading...')
              break
            case HttpEventType.ResponseHeader:
              return 1
            case HttpEventType.UploadProgress:
              return Math.round((event.loaded / event.total!) * 100)
            case HttpEventType.Response:
              this.store.ui.openSnackbar('Uploaded successfully')
              return event.body
          }
        })
      )
  }
}
