import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { useState } from 'react'

import i18n from '@/i18n'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const countriesEnum = {
  EN: 'en',
  PT: 'pt',
  ES: 'es',
}

interface ICulture {
  nativeName: string
  flag: string
  value: string
}

const cultures: Record<string, ICulture> = {
  [countriesEnum.EN]: {
    nativeName: 'English',
    flag: getUnicodeFlagIcon('US'),
    value: 'en',
  },
  [countriesEnum.PT]: {
    nativeName: 'Português',
    flag: getUnicodeFlagIcon('BR'),
    value: 'pt',
  },
  [countriesEnum.ES]: {
    nativeName: 'Español',
    flag: getUnicodeFlagIcon('ES'),
    value: 'es',
  },
}

export function LanguageSwitch() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  function handleChangeLanguage(language: string) {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          <span>{cultures[currentLanguage].flag}</span>
          <span>{cultures[currentLanguage].nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {Object.values(cultures).map((culture) => {
          return (
            <DropdownMenuItem asChild key={culture.value}>
              <button
                className="flex w-full items-center gap-2"
                onClick={() => handleChangeLanguage(culture.value)}
              >
                <span>{culture.flag}</span>
                <span>{culture.nativeName}</span>
              </button>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
