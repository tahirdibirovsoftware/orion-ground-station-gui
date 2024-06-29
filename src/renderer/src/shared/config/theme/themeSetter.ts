import { ThemeMode } from "./types";

type BoxShadowProps = [number, number, number, number];
interface IBorders {
    bt: boolean,
    bb: boolean,
    br: boolean,
    bl: boolean
}

export const themeSetter = (theme: ThemeMode, borders: IBorders = { bt: true, bb: true, br: true, bl: true }, boxShadow?: BoxShadowProps): React.CSSProperties => {
    let boxShadowStyle: string | undefined;
    
    if (boxShadow && boxShadow.length === 4) {
        const [horizontalOffset, verticalOffset, blurRadius, spreadRadius] = boxShadow;
        boxShadowStyle = `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px rgba(0, 0, 0, 0.5)`;
    }

    const borderStyles: React.CSSProperties = {
        borderTop: borders.bt ? '1px solid rgba(50, 50, 50, 1)' : undefined,
        borderBottom: borders.bb ? '1px solid rgba(50, 50, 50, 1)' : undefined,
        borderRight: borders.br ? '1px solid rgba(50, 50, 50, 1)' : undefined,
        borderLeft: borders.bl ? '1px solid rgba(50, 50, 50, 1)' : undefined
    };

    if (theme === 'dark') {
        return {
            backgroundColor: 'rgba(20, 20, 20, 1)',
            color: 'rgba(200, 200, 200, 1)',
            ...borderStyles,
            boxShadow: boxShadowStyle
        };
    } else if (theme === 'light') {
        return {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: 'rgba(0, 0, 0, 0.87)',
            ...borderStyles,
            boxShadow: boxShadowStyle
        };
    }

    return {}; // Return an empty object if no theme matches
};
