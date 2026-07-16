import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

/**
 * Custom hook for managing cookies with React state synchronization
 * 
 * @template T - The type of the cookie value
 * @param {string} name - The name of the cookie
 * @param {T} defaultValue - The default value to use when cookie doesn't exist
 * 
 * @returns {readonly [T, (newValue: T, options?: Cookies.CookieAttributes) => void, () => void, (newValue: T, options?: Cookies.CookieAttributes) => void]} 
 * A tuple containing:
 * - [0] current cookie value
 * - [1] function to set cookie value with state sync (triggers re-render)
 * - [2] function to delete the cookie and reset to default value
 * - [3] function to set cookie value without state sync (no re-render)
 * 
 * @example
 * ```tsx
 * // String cookie
 * const [theme, setTheme, deleteTheme, setThemeOnly] = useCookie('theme', 'light')
 * 
 * // Object cookie
 * const [user, setUser, deleteUser, setUserOnly] = useCookie('user', { name: '', email: '' })
 * 
 * // Set cookie with state sync (triggers re-render)
 * setTheme('dark', { expires: 7, secure: true })
 * 
 * // Set cookie without state sync (no re-render, just saves to cookie)
 * setThemeOnly('dark', { expires: 7, secure: true })
 * 
 * // Delete cookie
 * deleteTheme()
 * ```
 */
//TODO: Testar hook com useRef para não precisar usar funções only
export function useCookie<T>(name: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const cookieValue = Cookies.get(name)
      if (cookieValue !== undefined) {
        try {
          return JSON.parse(cookieValue)
        } catch {
          return cookieValue as T
        }
      }
    }
    return defaultValue
  })

  /**
   * Updates the cookie value and synchronizes with React state
   * 
   * @param {T} newValue - The new value to set. If null, the cookie will be removed
   * @param {Cookies.CookieAttributes} [options] - Optional cookie attributes (expires, path, domain, etc.)
   */
  const setCookie = (newValue: T, options?: Cookies.CookieAttributes) => {
    setValue(newValue)

    if (newValue === null) {
      Cookies.remove(name)
      return
    }

    const serializedValue = typeof newValue === 'string'
      ? newValue
      : JSON.stringify(newValue)

    Cookies.set(name, serializedValue, options)
  }

  /**
   * Deletes the cookie and resets the state to the default value
   */
  const deleteCookie = () => {
    setValue(defaultValue)
    Cookies.remove(name)
  }

  /**
   * Updates only the cookie value without synchronizing with React state
   * Use this when you want to save data without triggering a re-render
   * 
   * @param {T} newValue - The new value to set. If null, the cookie will be removed
   * @param {Cookies.CookieAttributes} [options] - Optional cookie attributes (expires, path, domain, etc.)
   */
  const setCookieOnly = (newValue: T, options?: Cookies.CookieAttributes) => {
    if (newValue === null) {
      Cookies.remove(name)
      return
    }

    const serializedValue = typeof newValue === 'string'
      ? newValue
      : JSON.stringify(newValue)

    Cookies.set(name, serializedValue, options)
  }

  /**
   * Deletes only the cookie without reset the state
   */
  const deleteCookieOnly = () => {
    Cookies.remove(name)
  }

  useEffect(() => {
    const cookieValue = Cookies.get(name)
    if (cookieValue !== undefined) {
      try {
        setValue(JSON.parse(cookieValue))
      } catch {
        setValue(cookieValue as T)
      }
    }
  }, [name])


  useEffect(() => {
    const cookieValue = Cookies.get(name)
    if (cookieValue !== undefined) {
      try {
        setValue(JSON.parse(cookieValue))
      } catch {
        setValue(cookieValue as T)
      }
    }
  }, [name])

  return [value, setCookie, deleteCookie, setCookieOnly, deleteCookieOnly] as const
}