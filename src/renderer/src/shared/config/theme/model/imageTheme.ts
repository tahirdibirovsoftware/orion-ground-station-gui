import { ThemeMode } from "../types";

export const setImageToTheme = (currentTheme: ThemeMode, imageLight: string, imageDark: string):string=>(
    currentTheme === 'light' ? imageDark : imageLight
)