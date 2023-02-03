import { PaletteMode } from '@mui/material';

export const themeSettings = (mode: PaletteMode) => {
    return {
        palette: {
            mode: mode as PaletteMode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        dark: "#2b3938",
                        main: "#2f4140",
                        light: "#4d6866",
                    },
                    secondary: {
                        dark: "#1e646b",
                        main: "#26757d",
                        light: "#38939c",
                    },
                    neutral: {
                        dark: "#000",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#000",
                        light: "#000",
                    },
                    border: {
                        main: "#ffffff",
                    },
                    background: {
                        default: "#303030",
                        paper: "#3f3f3b",
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: "#215651",
                        main: "#427b75",
                        light: "#63a29c",
                    },
                    secondary: {
                        dark: "#29808c",
                        main: "#4daebb",
                        light: "#7ecfda",
                    },
                    neutral: {
                        dark: "#ffffff",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#000",
                        light: "#000",
                    },
                    border: {
                        main: "#000000",
                    },
                    background: {
                        default: "#e8e8de",
                        paper: "#ceceac",
                    },
                }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};