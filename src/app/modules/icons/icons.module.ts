import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'
import {
  faFile,
  faFileArrowUp,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFileImage,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper
} from '@fortawesome/free-solid-svg-icons'

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class IconsModule {
  constructor(public library: FaIconLibrary) {
    library.addIcons(
      faFile,
      faFileArrowUp,
      faFileAudio,
      faFileCode,
      faFileExcel,
      faFileImage,
      faFileLines,
      faFilePdf,
      faFilePowerpoint,
      faFileVideo,
      faFileWord,
      faFileZipper
    )
  }
}
