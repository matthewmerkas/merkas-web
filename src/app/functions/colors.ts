import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  TonalPalette
} from '@material/material-color-utilities'

interface Color {
  hex: string
  tone: number
}

interface ColorPalette extends Object {
  error: Color[]
  neutral: Color[]
  neutralVariant: Color[]
  primary: Color[]
  secondary: Color[]
  tertiary: Color[]
}

// Based on https://medium.com/@raultonello18/angular-material-m3-dynamic-runtime-colors-6d6d1036d2bb
export const applyTheme = (
  primary: string,
  tertiary?: string,
  secondary?: string
) => {
  const theme = themeFromSourceColor(argbFromHex(primary))
  if (tertiary) {
    theme.palettes.primary = TonalPalette.fromInt(argbFromHex(primary))
    theme.palettes.tertiary = TonalPalette.fromInt(argbFromHex(tertiary))
  }
  if (secondary) {
    theme.palettes.secondary = TonalPalette.fromInt(argbFromHex(secondary))
  }
  // const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // Angular material tones
  const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
  const neutrals = [4, 6, 12, 17, 22, 24, 87, 92, 94, 96]
  // A colors dictionary
  const colors = Object.entries(theme.palettes).reduce(
    (acc: any, curr: [string, TonalPalette]) => {
      const array = curr[0] === 'neutral' ? [...tones, ...neutrals] : tones
      const hexColors = array.map((tone) => ({
        tone,
        hex: hexFromArgb(curr[1].tone(tone))
      }))

      return { ...acc, [curr[0]]: hexColors }
    },
    {}
  )
  // Apply the colors to the DOM :root element
  createCustomProperties(colors, 'p')
}

const createCustomProperties = (
  colorPalette: ColorPalette,
  paletteKey: 'p' | 't'
) => {
  let styleString = ':root,:host{'
  for (const [key, palette] of Object.entries(colorPalette)) {
    ;(palette as Array<Color>).forEach(({ hex, tone }) => {
      if (key === 'primary') {
        styleString += `--${key}-${tone}:${hex};`
      } else {
        styleString += `--${paletteKey}-${key}-${tone}:${hex};`
      }
    })
  }
  styleString += '}'
  const sheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [sheet]
  sheet.replaceSync(styleString)
}
