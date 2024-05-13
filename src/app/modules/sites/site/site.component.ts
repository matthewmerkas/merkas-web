import { Component, Input, OnInit } from '@angular/core'

import { Site } from '../../../functions/types'
import { Store } from '../../../stores/store'
import { getDecoded } from '../../../functions/local-storage'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent implements OnInit {
  @Input() site?: Site
  imageUrl = 'assets/placeholder.svg'
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
