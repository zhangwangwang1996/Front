import piexif from 'piexifjs'

function attr (items, key, value) {
  if (valid(value)) {
    items[key] = value
  } else {
    return items[key]
  }
}

function valid (value) {
  return !(value === undefined || value === null || value === '')
}

class PiexifHelper {
  constructor (exif) {
    this.exif = exif || {
      '0th': {},
      'Exif': {},
      'GPS': {},
      'Interop': {},
      '1st': {},
      'thumbnail': null
    }
  }

  DateTime (value) {
    let items = this.exif['0th']
    let key = piexif.ImageIFD.DateTime
    return attr(items, key, value)
  }

  DateTimeOriginal (value) {
    let items = this.exif.Exif
    let key = piexif.ExifIFD.DateTimeOriginal
    return attr(items, key, value)
  }

  GPSLatitudeRef (value) {
    let items = this.exif.GPS
    let key = piexif.GPSIFD.GPSLatitudeRef
    return attr(items, key, value)
  }

  GPSLatitude (value) {
    let items = this.exif.GPS
    let key = piexif.GPSIFD.GPSLatitude
    if (valid(value)) {
      this.GPSLatitudeRef(value < 0 ? 'S' : 'N')
      items[key] = piexif.GPSHelper.degToDmsRational(value)
    } else if (items[key]) {
      return piexif.GPSHelper.dmsRationalToDeg(items[key], this.GPSLatitudeRef())
    }
  }

  GPSLongitudeRef (value) {
    let items = this.exif.GPS
    let key = piexif.GPSIFD.GPSLongitudeRef
    return attr(items, key, value)
  }

  GPSLongitude (value) {
    let items = this.exif.GPS
    let key = piexif.GPSIFD.GPSLongitude
    if (valid(value)) {
      this.GPSLongitudeRef(value < 0 ? 'W' : 'E')
      items[key] = piexif.GPSHelper.degToDmsRational(value)
    } else if (items[key]) {
      return piexif.GPSHelper.dmsRationalToDeg(items[key], this.GPSLongitudeRef())
    }
  }
}

export default PiexifHelper
