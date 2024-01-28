import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

const colors = {
  primary: {
    main: "#F79345",
    light: "#FDBDA2",
  },
  grey: {
    100: "#FCFCFC",
    200: "rgba(0,0,0,0.5)",
    500: "#F1F3F5",
  },
  tertiary: {
    main: "rgba(3,11,91,0.5)",
  },
  error: {
    main: "#DC3B31",
  },
  text: {
    main: "#000000",
  },
};

export const theme = createTheme({
  palette: {
    primary: colors.primary,
    // secondary: colors.secondary,
    tertiary: colors.tertiary,
    grey: colors.grey,
    success: { main: "#34C759" },
    error: colors.error,
    warning: { main: "#FFCC00", dark: "#F7BA1E" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1156,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "noStyle" },
          style: {
            color: colors.text.main,
          },
        },
      ],
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
          color: "#ffffff",
          borderColor: colors.grey[500],
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          padding: "12px 16px",
          textTransform: "none",
          minHeight: "auto",
          boxShadow: "0px 4px 8px 0px rgba(255,141,65,0.2)",
          borderRadius: 8,
        },
        sizeLarge: {
          padding: "16px",
          fontSize: "18px",
          lineHeight: "27px",
        },
        sizeSmall: {
          padding: "10px 16px",
          fontSize: "14px",
          lineHeight: "20px",
        },
        contained: {
          color: "#FFFFFF",
          backgroundColor: colors.primary.main,

          "&.Mui-disabled": {
            backgroundColor: colors.primary.light,
          },
        },
        containedInherit: {
          color: "#FFFFFF",
          backgroundColor: colors.primary.main,

          "&.Mui-disabled": {
            backgroundColor: colors.primary.light,
          },
        },
        text: {
          color: "#000000",
          backgroundColor: colors.grey[100],
          boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.1)",
        },
      },
    },
  },
  typography: {
    allVariants: {
      margin: 0,
    },
    h1: {
      fontSize: "60px",
      fontWeight: 600,
      lineHeight: "68px",
    },
    h2: {
      fontSize: "34px",
      fontWeight: 600,
      lineHeight: "48px",
    },
    title1: {
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: "38px",
    },
    title2: {
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: "30px",
    },
    title3: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "28px",
    },
    title4: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    body: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    footnote: {
      fontSize: "14px",
      lineHeight: "21px",
    },
    caption: {
      fontSize: "13px",
      lineHeight: "20px",
    },
    caption1: {
      fontSize: "12px",
      lineHeight: "18px",
    },
    caption2: {
      fontSize: "10px",
      lineHeight: "15px",
    },
  },
});

export type CustomizedTheme = typeof theme;

declare module "@mui/material/styles" {
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
  interface TypographyVariants {
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    footnote: React.CSSProperties;
    body: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    footnote: React.CSSProperties;
    body: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption1: true;
    caption2: true;
    footnote: true;
    body: true;
    title1: true;
    title2: true;
    title3: true;
    title4: true;
  }
}

declare module "@mui/material" {
  interface Color {
    50: string;
    100: string;
    200: string;
    300: string;
    350: string;
    400: string;
    450: string;
    500: string;
    550: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    noStyle: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends CustomizedTheme {}
}
