/**

import getOsAndBrowser from '@/utils/getOsAndBrowser'

 */

function detect (string, list) {
  let regex = null
  let match = null
  let regexv = null
  let matches = null
  let version = ''

  for (const data of list) {
    regex = new RegExp(data.value, 'i')
    match = regex.test(string)

    if (match) {
      regexv = new RegExp(data.version + '[- /:;]([\\d._]+)', 'i')
      matches = string.match(regexv)

      if (matches && matches[1]) {
        matches = matches[1]
      }

      if (matches) {
        matches = matches.split(/[._]+/)

        for (const [index, value] of matches.entries()) {
          version += !index ? value + '.' : value
        }
      } else {
        version = 0
      }

      return {
        name: data.name.toLowerCase(),
        version: Number(version)
      }
    }
  }

  return {
    name: '',
    version: 0
  }
}

export default function () {
  const header = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
    window.opera
  ]

  const dataOs = [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' }
  ]

  const dataBrowser = [
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
  ]

  const os = detect(header.join(' '), dataOs)
  const browser = detect(header.join(' '), dataBrowser)
  const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'mo'
    : 'pc'

  return {
    os,
    browser,
    device
  }
}
