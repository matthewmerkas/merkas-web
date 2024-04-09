import {
  faFile,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFileImage,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper
} from '@fortawesome/free-solid-svg-icons'

export const getIcon = (mimetype: string) => {
  // https://www.iana.org/assignments/media-types/media-types.xhtml#text
  if (mimetype === 'application/pdf') {
    return faFilePdf
  } else if (
    mimetype.includes('msword') ||
    mimetype.includes('ms-word') ||
    mimetype.includes('wordprocessingml')
  ) {
    return faFileWord
  } else if (
    mimetype.includes('ms-excel') ||
    mimetype.includes('spreadsheetml')
  ) {
    return faFileExcel
  } else if (
    mimetype.includes('ms-powerpoint') ||
    mimetype.includes('presentationml')
  ) {
    return faFilePowerpoint
  } else if (mimetype.includes('zip') || mimetype.includes('7z-compressed')) {
    return faFileZipper
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
    return faFileCode
  } else if (mimetype?.includes('audio/')) {
    return faFileAudio
  } else if (mimetype?.includes('image/')) {
    return faFileImage
  } else if (mimetype?.includes('text/')) {
    return faFileLines
  } else if (mimetype?.includes('video/')) {
    return faFileVideo
  } else {
    return faFile
  }
}
