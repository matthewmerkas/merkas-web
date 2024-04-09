import { environment } from '../../environments/environment'

export function localFilter(objects: any[], filters: any): any {
  function valid(object: any): boolean {
    for (const key of Object.keys(filters)) {
      if (typeof object[key] === 'string' && typeof filters[key] === 'string') {
        if (!object[key].includes(filters[key])) {
          return false
        }
      } else if (
        typeof object[key] === 'boolean' &&
        typeof filters[key] === 'boolean'
      ) {
        if (!object[key] === filters[key]) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }

  const filtered = []
  for (const object of objects) {
    if (valid(object)) {
      filtered.push(object)
    }
  }
  return filtered
}

export function getHost(): string {
  return environment.apiUrl
    .replace('http://', '')
    .replace('https://', '')
    .replace('/api', '')
}
