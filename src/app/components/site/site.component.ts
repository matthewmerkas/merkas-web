import { Component, Input, OnInit, Optional } from '@angular/core'
import { MatCardAppearance } from '@angular/material/card'

import { App, Site } from '../../functions/types'
import { Store } from '../../stores/store'
import { getDecoded } from '../../functions/local-storage'
import { animations } from '../../functions/animations'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss',
  animations: animations('200ms')
})
export class SiteComponent implements OnInit {
  @Input() app?: App
  @Input() appearance: MatCardAppearance = 'raised'
  @Input() site?: Site
  imageUrl = ''
  siteUrl = ''

  constructor(
    public store: Store,
    @Optional() public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit() {
    if (this.app) {
      return
    } else if (this.site) {
      this.store.image.get(this.site).subscribe((res) => {
        if (res) {
          this.imageUrl = res
        }
      })
      this.siteUrl = this.site!.url
      if (this.siteUrl.endsWith('/syncthing/')) {
        this.siteUrl += getDecoded()?.username
      }
    }
  }
}
