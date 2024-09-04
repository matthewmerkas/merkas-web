import { Component, Input, OnInit, Optional } from '@angular/core'
import {
  NgClass,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet
} from '@angular/common'
import {
  MatCard,
  MatCardAppearance,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card'
import { MatRipple } from '@angular/material/core'
import { MatDialogRef } from '@angular/material/dialog'
import { RouterLink } from '@angular/router'

import { App, Site } from '../../functions/types'
import { Store } from '../../stores/store'
import { getDecoded } from '../../functions/local-storage'
import { animations } from '../../functions/animations'

@Component({
  selector: 'app-site',
  standalone: true,
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatRipple,
    NgClass,
    NgIf,
    NgOptimizedImage,
    NgTemplateOutlet,
    RouterLink
  ],
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
    @Optional() public dialogRef?: MatDialogRef<any>
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
