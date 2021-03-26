import cookie from 'js-cookie'

export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

export const removeCookie = key => {
  if (typeof window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}

export const getCookie = key => {
  if (typeof window !== 'undefined') {
    return cookie.get(key)
  }
}

export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = key => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export const authenticate = (response) => {
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
}

export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}

export const signout = next => {
  removeCookie('token')
  removeLocalStorage('user')
  next()
}

export const updateUser = (response, next) => {
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'))
    auth = response.data
    localStorage.setItem('user', JSON.stringify(auth))
  }
  next()
}