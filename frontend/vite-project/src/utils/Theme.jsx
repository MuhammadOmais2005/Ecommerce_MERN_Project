import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const AppThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    typography: {
      fontFamily: "Signika, sans-serif",
    },
    palette: {
      mode: mode ? "light" : "dark", // adjust according to your convention
      primary: {
        main: mode ? "#344050" : "#9DA9BB",
      },
      secondary: {
        main: mode ? "#5E6E82" : "#D8E2FF",
      },
      drawer: {
        main: mode ? "#d9e7fa" : "#0b1727"
      },
      card: {
        // main: mode ? "#FFFFFF" : "#293a50"
        main: mode ? "#E3EAFD" : "#293a50"
        // main: mode? "#FFFFFF": "#121E2D"
      },
      nav: {
        main: mode ? "#1da1f2" : "#1da1f2"
      },

      background: {
        default: mode ? "#d9e7fa" : "#0b1727",
        paper: mode ? "#d9e7fa" : "#0b1727",
        // paper: mode ? "#f5f5f5" : "#1e1e1e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline  />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;


