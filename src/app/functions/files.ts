export const getIconName = (mimetype: string): string => {
  return '/assets/fa/' + _getIconName(mimetype) + '-solid.svg'
}

export const _getIconName = (mimetype: string): string => {
  // https://www.iana.org/assignments/media-types/media-types.xhtml#text
  if (mimetype === 'upload') {
    return 'file-arrow-up'
  } else if (mimetype === 'application/pdf') {
    return 'file-pdf'
  } else if (
    mimetype.includes('msword') ||
    mimetype.includes('ms-word') ||
    mimetype.includes('wordprocessingml')
  ) {
    return 'file-word'
  } else if (
    mimetype.includes('ms-excel') ||
    mimetype.includes('spreadsheetml')
  ) {
    return 'file-excel'
  } else if (
    mimetype.includes('ms-powerpoint') ||
    mimetype.includes('presentationml')
  ) {
    return 'file-powerpoint'
  } else if (mimetype.includes('zip') || mimetype.includes('7z-compressed')) {
    return 'file-zipper'
  } else if (
    mimetype.includes('css') ||
    mimetype.includes('html') ||
    mimetype.includes('java') ||
    mimetype.includes('octet-stream') ||
    mimetype.includes('php') ||
    mimetype.includes('python') ||
    mimetype.includes('script') ||
    mimetype.includes('x-bsh') ||
    mimetype.includes('x-sh')
  ) {
    return 'file-code'
  } else if (mimetype?.includes('audio/')) {
    return 'file-audio'
  } else if (mimetype?.includes('image/')) {
    return 'file-image'
  } else if (mimetype?.includes('text/')) {
    return 'file-lines'
  } else if (mimetype?.includes('video/')) {
    return 'file-video'
  } else {
    return 'file'
  }
}
