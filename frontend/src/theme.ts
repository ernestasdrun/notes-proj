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
                        dark: "#1d2525",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#000",
                        light: "#000",
                        red: "#ec6060",
                    },
                    border: {
                        main: "#ffffff",
                    },
                    search: {
                        background: "#4e4d4d",
                        border: "#ffffff",
                    },
                    background: {
                        default: "#303030",
                        paper: "#3f3f3b",
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: "#2d6e68",
                        main: "#5d9993",
                        light: "#77bdb6",
                    },
                    secondary: {
                        dark: "#29808c",
                        main: "#4daebb",
                        light: "#7ecfda",
                    },
                    neutral: {
                        dark: "#214441",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#000",
                        light: "#000",
                        red: "#7a2828",
                    },
                    border: {
                        main: "#000000",
                    },
                    search: {
                        background: "#ffffff",
                        border: "#5d9993",
                    },
                    background: {
                        default: "#e8e8de",
                        paper: "#ceceac",
                    },
                }),
        },
        breakpoints: {
            values: {
                xs: 0,
                mobile: 400,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            }
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "3em",
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "2.2em",
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "1.8em",
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "1.5em",
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "1em",
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "0.7em",
            },
            body2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: "0.9em",
            }
        },
    };
};