import * as diff from 'fast-diff'
import * as Y from 'yjs'
import { HttpClient } from '@angular/common/http'
import { Buffer } from 'buffer/'
import { action } from 'mobx-angular'

import { map, Observable } from 'rxjs'
import { apiConfig } from '../../environments/api.config'
import { environment } from '../../environments/environment'

export class BoardStore {
  public: Y.Doc
  private: Y.Doc
  url = environment.apiUrl + apiConfig.board.base

  constructor(private http: HttpClient) {
    this.public = new Y.Doc()
    this.private = new Y.Doc()
  }

  @action
  getList(target: 'public' | 'private'): Observable<string> {
    const url = this.url + apiConfig.board[target]
    return this.http.get(url).pipe(
      map((res: any) => {
        if (res?.type === 'Buffer' && Array.isArray(res.data)) {
          const update = Uint8Array.from(res.data)
          Y.applyUpdate(this[target], update)
        }
        return this[target].getText().toString()
      })
    )
  }

  @action
  update(target: 'public' | 'private', text: string): Observable<string> {
    const url = this.url + apiConfig.board[target]
    const changes = []
    const diffs = diff(this[target].getText().toString(), text)
    let cursorPos = 0
    for (const d of diffs) {
      switch (d[0]) {
        case diff.INSERT:
          this[target].getText().insert(cursorPos, d[1])
          changes.push([d[0], cursorPos, d[1]])
          cursorPos += d[1].length
          break
        case diff.EQUAL:
          cursorPos += d[1].length
          break
        case diff.DELETE:
          this[target].getText().delete(cursorPos, d[1].length)
          changes.push([d[0], cursorPos, d[1].length])
          break
      }
      if (cursorPos < 0) cursorPos = 0
    }
    const state = Buffer.from(Y.encodeStateAsUpdate(this[target]))
    return this.http.post(url, state).pipe(
      map((res: any) => {
        if (res?.type === 'Buffer' && Array.isArray(res.data)) {
          const update = Uint8Array.from(res.data)
          Y.applyUpdate(this[target], update)
        }
        return this[target].getText().toString()
      })
    )
  }
}
