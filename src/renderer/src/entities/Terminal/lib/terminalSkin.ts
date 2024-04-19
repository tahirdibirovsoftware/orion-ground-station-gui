import { ThemeContext } from "@renderer/app/globals/theme/ThemeProvider";
import { themeConfig } from "@renderer/shared/model";
import { useContext } from "react";

export const useTerminalSkin = ():Partial<React.CSSProperties | undefined> =>{

    const [theme] = useContext(ThemeContext)

    const skin: Partial<React.CSSProperties | undefined> = {}
    if(theme==='dark'){
        skin.backgroundColor = themeConfig.darkWidget;
        skin.border=`1px solid ${themeConfig.lightWidgetBorder}`
    }
    else{
        skin.backgroundColor = themeConfig.lightWidget;
        skin.border=`1px solid ${themeConfig.darkWidgetBorder}`
    }
    return skin
}