import { expressMap } from 'src/config'
export const Cookie = {
  get (name) {
    const cookie = document.cookie
    const reg = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`)
    const match = cookie.match(reg)
    return match ? match[1] : null
  },
  set (name, value, expire = null) {
    const now = new Date()
    let exdate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
    let cookieStr = `${name}=${value};expires=${expire === null ? exdate.toUTCString() : expire};path=/;domain=${window.document.domain}`
    document.cookie = cookieStr
  }
}

export function getExpressName(name) {
  return expressMap[name].label || '暂无'
}
export function getExpressPhone(name) {
  return expressMap[name].phone || '暂无'
}