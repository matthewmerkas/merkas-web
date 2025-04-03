export const hasKeys = (object: any) => {
  return (
    typeof object === 'object' &&
    !Array.isArray(object) &&
    object !== null &&
    Object.keys(object).length > 0
  )
}

// Returns `true` if page is being rendered statically (SSG/SSR), otherwise `false`
export const isStatic = () => typeof document === 'undefined'

// Converts camelCase to Title Case. From https://stackoverflow.com/a/39718708
export const toTitleCase = (str: string) => {
  str = str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
  return str.trim()
}
