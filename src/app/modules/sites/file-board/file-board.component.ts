import { Component, inject, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import prettyBytes from 'pretty-bytes'
import { Subscription } from 'rxjs'

import { TOOLTIP_DELAY } from '../../../functions/constants'
import { getIconName } from '../../../functions/files'
import { toTitleCase } from '../../../functions/helpers'
import { MerkasFile } from '../../../functions/types'
import { Store } from '../../../stores/store'
import { environment } from '../../../../environments/environment'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-file-board',
  templateUrl: './file-board.component.html',
  styleUrl: './file-board.component.scss',
  standalone: false
})
export class FileBoardComponent implements OnInit {
  @Input() target?: 'public' | 'private'
  document = inject(DOCUMENT)
  file?: MerkasFile
  toggleFc = new FormControl()
  // State
  dragover = false
  progress = 0
  _download?: Subscription
  _upload?: Subscription
  // Icons
  fileArrowUp = getIconName('upload')
  fileIcon = this.fileArrowUp
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
  protected readonly prettyBytes = prettyBytes
  protected readonly toTitleCase = toTitleCase

  constructor(public store: Store) {}

  ngOnInit() {
    this.toggleFc.valueChanges.subscribe(() => {
      // Toggle buttons should not stay depressed/selected
      this.toggleFc.setValue('', { emitEvent: false })
    })
    this.setValue()
    // Page Visibility API
    this.document.addEventListener('visibilitychange', () => {
      if (!this.document.hidden) {
        this.setValue()
      }
    })
    // Listening to socket events
    this.store.ui.socket?.on('file_delete', (data) => {
      if (data?.target === this.target) {
        this.setFile(undefined)
      }
    })
    this.store.ui.socket?.on('file_upload', (data) => {
      if (data?.target === this.target) {
        this.setFile(data.files?.at(0))
      }
    })
  }

  cancel = () => {
    this._download?.unsubscribe()
    this._upload?.unsubscribe()
    this.progress = 0
  }

  delete = () => {
    this.store.file.delete(this.target!).subscribe(() => {
      this.setFile(undefined)
    })
  }

  // TODO: Consider what happens if file is deleted while user is downloading...
  download = () => {
    try {
      this._download = this.store.file
        .download(this.target!)
        .subscribe((res) => {
          if (typeof res === 'number') {
            this.progress = res
          }
        })
      this._download.add(() => {
        this.progress = 0
        this._download = undefined
      })
    } catch {
      this.progress = 0
      this._download = undefined
    }
  }

  onChange = (event: Event) => {
    const file: File | null = (event.target as HTMLInputElement).files!.item(0)
    return this.upload(file)
  }

  onDragover = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.dragover = true
  }

  onDragleave = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.dragover = false
  }

  onDrop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.dragover = false
    const files = event.dataTransfer?.files
    return this.upload(files!.item(0))
  }

  setFile = (file?: MerkasFile) => {
    this.file = file
    if (!file?.mimetype) {
      this.fileIcon = this.fileArrowUp
    } else {
      this.fileIcon = getIconName(file.mimetype)
    }
  }

  setValue = () => {
    return this.store.file.getList(this.target!).subscribe((files) => {
      this.setFile(files?.at(0))
    })
  }

  upload = async (file: File | null) => {
    // TODO: Zip multiple files automatically?
    if (file) {
      const max = environment.MAX_FILE_SIZE
      if (file.size > max) {
        return this.store.ui.openSnackbar(
          `File is too large (${prettyBytes(file.size)} > ${prettyBytes(max)})`
        )
      }
      try {
        this._upload = this.store.file
          .upload([file], this.target!)
          .subscribe((res) => {
            if (typeof res === 'number') {
              this.progress = res
            } else {
              this.setFile(res?.at(0))
            }
          })
        this._upload.add(() => {
          this.progress = 0
          this._upload = undefined
        })
      } catch {
        this.progress = 0
        this._upload = undefined
      }
    } else {
      return this.store.ui.openSnackbar('Invalid file')
    }
  }
}
