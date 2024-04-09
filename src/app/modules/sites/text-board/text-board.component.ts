import { Component, Input, OnInit } from '@angular/core'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { toTitleCase } from '../../../functions/helpers'
import { debounceTime } from 'rxjs'
import { Store } from '../../../stores/store'
import * as Y from 'yjs'

const DEBOUNCE = 1000
const OPTS = { emitEvent: false }

@Component({
  selector: 'app-text-board',
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './text-board.component.html',
  styleUrl: './text-board.component.scss'
})
export class TextBoardComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() formControl = new FormControl('')
  @Input() target: 'public' | 'private' = 'public'

  protected readonly toTitleCase = toTitleCase

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(debounceTime(DEBOUNCE))
      .subscribe((text) => {
        this.store.board.update(this.target, text || '').subscribe((res) => {
          this.formControl.setValue(res, OPTS)
        })
      })
    this.store.board.getList(this.target).subscribe((res) => {
      this.formControl.setValue(res, OPTS)
    })
    // Listening to events
    const doc = this.store.board[this.target]
    this.store.ui.socket.on(this.target + '_board', (res) => {
      const update = new Uint8Array(res)
      Y.applyUpdate(doc, update)
    })
    doc.on('update', () => {
      this.formControl.setValue(doc.getText().toString(), OPTS)
    })
  }
}
