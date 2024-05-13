import { Component, Input, OnInit } from '@angular/core'

import { Site } from '../../../functions/types'
import { Store } from '../../../stores/store'
import { getDecoded } from '../../../functions/local-storage'
import { animations } from '../../../functions/animations'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss',
  animations: animations('200ms')
})
export class SiteComponent implements OnInit {
  @Input() site?: Site
  imageUrl = ''
  siteUrl = ''

  constructor(public store: Store) {}

  ngOnInit() {
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
