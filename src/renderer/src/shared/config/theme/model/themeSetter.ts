import { darkBorder, lightBorder } from "../constants";
import { BorderColor, BoxShadowProps, IBorders, ThemeMode } from "../types";





export const themeSetter = (theme: ThemeMode, borders: IBorders = { bt: true, bb: true, br: true, bl: true }, boxShadow?: BoxShadowProps): React.CSSProperties => {
    let boxShadowStyle: string | undefined;

    if (boxShadow && boxShadow.length === 4) {
        const [horizontalOffset, verticalOffset, blurRadius, spreadRadius] = boxShadow;
        const boxPxParams = `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px`;
        boxShadowStyle = boxPxParams + (theme === 'dark' ? "#000000" : "#999999")
    }

    const borderStyles = (borderColor: BorderColor): React.CSSProperties => ({
        borderTop: borders.bt ? `1px solid ${borderColor}` : undefined,
        borderBottom: borders.bb ? `1px solid ${borderColor}` : undefined,
        borderRight: borders.br ? `1px solid ${borderColor}` : undefined,
        borderLeft: borders.bl ? `1px solid ${borderColor}` : undefined
    })

    if (theme === 'dark') {
        return {
            backgroundColor: '#222222',
            color: 'rgba(200, 200, 200, 1)',
            ...borderStyles(darkBorder),
            boxShadow: boxShadowStyle
        };
    } else if (theme === 'light') {
        return {
            backgroundColor: '#eeffef',
            color: 'rgba(0, 0, 0, 0.87)',
            ...borderStyles(lightBorder),
            boxShadow: boxShadowStyle
        };
    }

    return {}; // Return an empty object if no theme matches
};
