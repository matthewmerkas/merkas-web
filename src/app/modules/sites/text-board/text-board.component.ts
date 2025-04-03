import { Component, inject, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { toTitleCase } from '../../../functions/helpers'
import { debounceTime } from 'rxjs'
import { Store } from '../../../stores/store'
import * as Y from 'yjs'
import { DOCUMENT } from '@angular/common'

const DEBOUNCE = 1000
const OPTS = { emitEvent: false }

@Component({
  selector: 'app-text-board',
  templateUrl: './text-board.component.html',
  styleUrl: './text-board.component.scss',
  standalone: false
})
export class TextBoardComponent implements OnInit {
  @Input() formControl = new FormControl('')
  @Input() target: 'public' | 'private' = 'public'
  document = inject(DOCUMENT)
  pending = false
  protected readonly toTitleCase = toTitleCase

  constructor(private store: Store) {}

  ngOnInit() {
    this.formControl.valueChanges.subscribe(() => (this.pending = true))
    this.formControl.valueChanges
      .pipe(debounceTime(DEBOUNCE))
      .subscribe((text) => {
        this.store.board.update(this.target, text || '').subscribe((res) => {
          this.formControl.setValue(res, OPTS)
        })
        this.pending = false
      })
    this.setValue()
    // Page Visibility API
    this.document.addEventListener('visibilitychange', () => {
      if (!this.document.hidden && !this.pending) {
        this.setValue()
      }
    })
    // Listening to socket events
    const doc = this.store.board[this.target]
    this.store.ui.socket?.on(this.target + '_board', (res) => {
      const update = new Uint8Array(res)
      Y.applyUpdate(doc, update)
    })
    doc.on('update', () => {
      this.formControl.setValue(doc.getText().toString(), OPTS)
    })
  }

  setValue() {
    return this.store.board.getList(this.target).subscribe((res) => {
      this.formControl.setValue(res, OPTS)
    })
  }
}
