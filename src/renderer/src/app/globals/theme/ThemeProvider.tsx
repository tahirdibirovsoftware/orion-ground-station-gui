
import { Theme } from '@renderer/shared/model'
import React, { createContext } from 'react'



export const ThemeContext = createContext<Theme>('light')


const ThemeProvider = ({children}:{children:React.ReactNode}):JSX.Element=>{


    const values: Theme = 'dark'


    return(
      <ThemeContext.Provider value={values}>
        {children}
      </ThemeContext.Provider>
    )
}

export { ThemeProvider }