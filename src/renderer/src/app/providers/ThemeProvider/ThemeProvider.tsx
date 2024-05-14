import { createContext, ReactNode, useState } from "react";
import { ThemeMode } from "../../../shared/config/theme/types";

// Define the type for the context value
type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark', // Default theme
    setTheme: () => {} // Placeholder function
});

// ThemeProvider component
const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [theme, setTheme] = useState<ThemeMode>('dark'); // Initial theme state
    const values = { theme, setTheme };

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    );
};

// Export the ThemeProvider
export { ThemeProvider };
