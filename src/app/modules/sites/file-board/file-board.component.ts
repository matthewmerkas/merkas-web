import { NgIf } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import prettyBytes from 'pretty-bytes'
import { Subscription } from 'rxjs'

import { TOOLTIP_DELAY } from '../../../functions/constants'
import { getIcon } from '../../../functions/files'
import { toTitleCase } from '../../../functions/helpers'
import { MerkasFile } from '../../../functions/types'
import { Store } from '../../../stores/store'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-file-board',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './file-board.component.html',
  styleUrl: './file-board.component.scss'
})
export class FileBoardComponent implements OnInit {
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
  protected readonly prettyBytes = prettyBytes
  protected readonly toTitleCase = toTitleCase

  @Input() target?: 'public' | 'private'

  file?: MerkasFile
  toggleFc = new FormControl()
  // State
  dragover = false
  progress = 0
  _download?: Subscription
  _upload?: Subscription
  // Icons
  faFileArrowUp = faFileArrowUp
  fileIcon = faFileArrowUp

  constructor(public store: Store) {}

  ngOnInit() {
    this.store.file.getList(this.target!).subscribe((files) => {
      this.setFile(files?.at(0))
    })
    this.toggleFc.valueChanges.subscribe(() => {
      // Toggle buttons should not stay depressed/selected
      this.toggleFc.setValue('', { emitEvent: false })
    })
    // Listening to events
    this.store.ui.socket.on('file_delete', (data) => {
      if (data?.target === this.target) {
        this.setFile(undefined)
      }
    })
    this.store.ui.socket.on('file_upload', (data) => {
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
      this.fileIcon = faFileArrowUp
    } else {
      this.fileIcon = getIcon(file.mimetype)
    }
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
