import React, { useState } from "react";

type DarkModeHook = [
  darkMode: boolean,
  toggleDarkMode: () => void
]

function useDarkMode(): DarkModeHook {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialMode())

  function getInitialMode() {
    const isReturningUser: boolean = 'dark' in localStorage
    const savedSetting = localStorage.getItem('dark')
    const savedMode = (savedSetting !== null) ? JSON.parse(savedSetting) : false
    const userPrefersDark: boolean | null = getPrefColorScheme()

    if (isReturningUser) {
      return savedMode
    } else if (userPrefersDark) {
      return true
    } else {
      return false
    }
  }

  function getPrefColorScheme(): boolean | null {
    if (!window.matchMedia) return null

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  function toggleDarkMode(): void {
    const newMode: boolean = !darkMode
    localStorage.setItem('dark', JSON.stringify(newMode))
    setDarkMode(newMode)
  }

  return [darkMode, toggleDarkMode]
}

export default useDarkMode