import { Component, OnInit } from '@angular/core'
import { Store } from '../../stores/store'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { debounceTime } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Site } from '../../functions/types'
import { animations } from '../../functions/animations'

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  animations: animations('200ms'),
  standalone: false
})
export class SitesComponent implements OnInit {
  searchFc = new FormControl('')
  sites: Site[] = []
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY

  constructor(public store: Store, public router: Router) {
    // Listening to page visibility
    this.store.ui.hidden.subscribe((hidden) => !hidden && this.setValue())
  }

  ngOnInit() {
    this.searchFc.valueChanges
      .pipe(debounceTime(environment.DEBOUNCE_TIME))
      .subscribe((query) => {
        this.store.site.getList().subscribe((res) => {
          if (!query) {
            this.sites = res
          } else {
            const sites = []
            for (const site of res) {
              const index = `${site.title} ${site.subtitle} ${
                site.url
              } ${site.tags?.join(' ')}`
              if (index.search(new RegExp(query, 'i')) >= 0) {
                sites.push(site)
              }
            }
            this.sites = sites
          }
        })
      })
    this.setValue()
  }

  setValue() {
    setTimeout(() => this.store.ui.setSpinner(true))
    return this.store.site.getList().subscribe((res) => {
      this.sites = res
      setTimeout(() => this.store.ui.setSpinner(false))
    })
  }
}
