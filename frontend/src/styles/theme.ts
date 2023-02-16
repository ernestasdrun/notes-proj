import { PaletteMode } from '@mui/material';

export const themeSettings = (mode: PaletteMode) => {
    return {
        palette: {
            mode: mode as PaletteMode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        dark: "#27422e",
                        main: "#2b4b33",
                        light: "#295734",
                    },
                    secondary: {
                        dark: "#247936",
                        main: "#28923f",
                        light: "#42ad59",
                    },
                    neutral: {
                        dark: "#304242",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#000",
                        light: "#000",
                        red: "#ec6060",
                    },
                    fieldFocus: {
                        main: "#20c974",
                    },
                    customButton: {
                        dark: "#aec05cb2",
                        main: "#677528af",
                        light: "#8c9e3a",
                    },
                    button: {
                        main: "#0e683b",
                        dark: "#084929",
                        light: "#127e48",
                    },
                    border: {
                        main: "#ffffff",
                    },
                    search: {
                        main: "#4e4d4d",
                        background: "#4e4d4d",
                        border: "#ffffff",
                    },
                    background: {
                        main: "#303030",
                        default: "#303030",
                        paper: "#3f3f3b",
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: "#2f7541",
                        main: "#3a9b52",
                        light: "#4bc469",
                    },
                    secondary: {
                        dark: "#24923c",
                        main: "#2dac49",
                        light: "#2fb14b",
                    },
                    neutral: {
                        dark: "#285e3a",
                        main: "#000",
                        mediumMain: "#000",
                        medium: "#c8d881",
                        light: "#d4e295",
                        red: "#7a2828",
                    },
                    fieldFocus: {
                        main: "#1e974d",
                    },
                    customButton: {
                        dark: "#aec05c",
                        main: "#c8d881",
                        light: "#d4e295",
                    },
                    button: {
                        main: "#16cf73",
                        dark: "#14af62",
                        light: "#23d87e",
                    },
                    border: {
                        main: "#000000",
                    },
                    search: {
                        main: "#ffffff",
                        background: "#ffffff",
                        border: "#5d9993",
                    },
                    background: {
                        main: "#dbe9d7",
                        default: "#dbe9d7",
                        paper: "#adceac",
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

declare module '@mui/material/styles' {

    interface Palette {
        neutral: Palette['primary'];
        fieldFocus: Palette['primary'];
        border: Palette['primary'];
        search: Palette['primary'];
        button: Palette['primary'];
        customButton: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
        fieldFocus?: PaletteOptions['primary'];
        border?: PaletteOptions['primary'];
        search?: PaletteOptions['primary'];
        button?: PaletteOptions['primary'];
        customButton?: PaletteOptions['primary'];
    }

    interface PaletteColor {
        mediumMain?: string;
        medium?: string;
        red?: string;
        background?: string;
        border?: string;
    }

    interface SimplePaletteColorOptions {
        mediumMain?: string;
        medium?: string;
        red?: string;
        background?: string;
        border?: string;
    }
}