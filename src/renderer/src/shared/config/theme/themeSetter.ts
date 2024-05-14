import { ThemeMode } from "./types";

type BoxShadowProps = [number, number, number, number];

export const themeSetter = (theme: ThemeMode, boxShadow?: BoxShadowProps): React.CSSProperties => {
    let boxShadowStyle: string | undefined;
    
    if (boxShadow && boxShadow.length === 4) {
        const [horizontalOffset, verticalOffset, blurRadius, spreadRadius] = boxShadow;
        boxShadowStyle = `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px rgba(0, 0, 0, 0.5)`;
    }

    if (theme === 'dark') {
        return {
            backgroundColor: 'rgba(20, 20, 20, 1)',  // Corrected alpha value to be between 0 and 1
            color: 'rgba(200, 200, 200, 1)',          // Corrected alpha value
            border: '1px solid rgba(50, 50, 50, 1)',  // Corrected alpha value
            boxShadow: boxShadowStyle
        };
    } else if (theme === 'light') {
        return {
            backgroundColor: 'rgba(255, 255, 255, 1)',  // Assuming light theme has white background
            color: 'rgba(0, 0, 0, 0.87)',              // Standard text color for light themes
            border: '1px solid rgba(120, 120, 120, 1)', // Light grey border for light theme
            boxShadow: boxShadowStyle
        };
    }

    return {}; // Return an empty object if no theme matches
};
