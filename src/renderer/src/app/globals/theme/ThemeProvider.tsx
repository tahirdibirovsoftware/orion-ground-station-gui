
import React, { createContext, useState } from 'react'



export const ThemeContext = createContext('light')


const ThemeProvider = ({children}:{children:React.ReactNode}):JSX.Element=>{

  const [theme, setTheme] = useState('dark')

    const values = [theme, setTheme]


    return(
      <ThemeContext.Provider value={values}>
        {children}
      </ThemeContext.Provider>
    )
}

export { ThemeProvider }