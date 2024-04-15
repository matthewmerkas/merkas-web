import { Component, OnInit } from '@angular/core'
import { Store } from '../../stores/store'
import { removeTokens } from '../../functions/local-storage'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { TOOLTIP_DELAY } from '../../functions/constants'
import { debounceTime } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Site } from '../../functions/types'

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  protected readonly TOOLTIP_DELAY = TOOLTIP_DELAY
  constructor(
    public store: Store,
    public router: Router
  ) {
    // Page Visibility API
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.setValue()
      }
    })
  }

  searchFc = new FormControl('')
  sites: Site[] = []

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
              const index = `${site.title} ${site.subtitle} ${site.url}`
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

  logout() {
    removeTokens()
    this.store.ui.onLogout()
    return this.router.navigate(['/'])
  }

  setValue() {
    return this.store.site.getList().subscribe((res) => {
      this.sites = res
    })
  }
}
