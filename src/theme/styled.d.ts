// import original module declarations
import {Colors, Theme } from './types'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: Colors
    isDark: boolean
  }
}
