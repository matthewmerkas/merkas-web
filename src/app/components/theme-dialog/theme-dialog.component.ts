import { NgForOf, NgTemplateOutlet } from '@angular/common'
import { Component, TemplateRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatDialogRef } from '@angular/material/dialog'

import deepEqual from 'fast-deep-equal'
import { DialogComponent } from '../dialog/dialog.component'
import { applyTheme } from '../../functions/colors'
import {
  getDecoded,
  getItem,
  getToken,
  setItem,
  setTokens
} from '../../functions/local-storage'
import { DEFAULT_COLORS } from '../../functions/constants'
import { Store } from '../../stores/store'

interface Colors {
  primary: string
  tertiary?: string
  secondary?: string
  selected?: boolean
  style?: string
}

const colors = [
  ['#fcfcfc', '#525252', '#ababab'],
  ['#ffb3b6'],
  ['#ffb869'],
  ['#e8c349'],
  ['#a0d57b'],
  ['#97cbff'],
  ['#d8e2ff'],
  ['#cabeff'],
  ['#f7adfd'],
  ['#ffeeb2', '#ffb68e'],
  ['#ccee99', '#f9bc49'],
  ['#b1ebff', '#66dbb2'],
  ['#ebdcff', '#9ecaff'],
  ['#ffd8eb', '#ccbdff']
]

const minify = (colors: Colors) => {
  return {
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary
  }
}

@Component({
  selector: 'app-theme-dialog',
  templateUrl: './theme-dialog.component.html',
  imports: [MatButton, NgTemplateOutlet, NgForOf],
  styleUrl: './theme-dialog.component.scss'
})
export class ThemeDialogComponent {
  colorsArray: Colors[] = []
  colors!: Colors
  formGroup = new FormGroup({})

  @ViewChild('applyButton', { static: true }) applyButton!: TemplateRef<any>
  @ViewChild('saveButton', { static: true }) saveButton!: TemplateRef<any>

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    public store: Store
  ) {
    this.colorsArray = this.constructColors(colors)
    !getToken() && this.formGroup.setErrors({ invalid: true })
  }

  static getData = () => {
    return {
      title: 'Theme',
      buttonLabel: 'Save'
    }
  }

  constructColors = (stringsArray: string[][]) => {
    const colorsArray: Colors[] = []
    const l = this._getColors()
    for (const strings of stringsArray) {
      if (strings.length < 1) {
        continue
      }
      const c: Colors = {
        primary: strings[0],
        tertiary: strings.at(1),
        secondary: strings.at(2),
        selected: false
      }
      if (c.secondary) {
        c.style = `background: conic-gradient(from 270deg, ${c.primary} 50%, ${c.secondary} 50% 75%, ${c.tertiary} 75%);`
      } else if (c.tertiary) {
        c.style = `background: linear-gradient(90deg, ${c.primary} 50%, ${c.tertiary} 50%)`
      }
      colorsArray.push(c)
      if (!this.colors && deepEqual(minify(c), minify(l))) {
        c.selected = true
        this.colors = c
      }
    }
    return colorsArray
  }

  onSelect = (colors: Colors) => {
    this.colors.selected = false
    this.colors = colors
    colors.selected = true
    applyTheme(colors.primary, colors.tertiary, colors.secondary)
    setItem('colors', colors)
  }

  onSubmit = async () => {
    if (!getToken()) return
    const colors = minify(this.colors)
    this.store.user.patch({ colors }).subscribe((user) => {
      setTokens(user.tokens!)
      this.dialogRef?.componentInstance.close()
    })
  }

  _getColors = () => getDecoded()?.colors || getItem('colors') || DEFAULT_COLORS
}
