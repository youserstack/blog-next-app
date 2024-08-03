import { createContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MaterialThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

// light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f50b5",
      light: "#757ce8",
      dark: "#002884",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#757ce8",
    },
  },
});

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeProvider = ({
  children,
  mode: cacheMode,
}: {
  children: React.ReactNode;
  mode: string;
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const systemMode = prefersDarkMode ? "dark" : "light";
  const [mode, setMode] = useState(cacheMode || systemMode);
  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);
  const toggleMode = () => setMode((mode) => (mode === "light" ? "dark" : "light"));

  // 시스템에 의한 모드변경
  useEffect(() => {
    // CSS미디어쿼리 (os 테마를 가져오는데 css 에 설정되지 않더라도 사용할 수 있다.)
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    // 미디어쿼리 이벤트 파라미터로부터 현재 os 테마를 가져올 수 있다. (동기화 작업을 할 수 있다.)
    const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
      e.matches ? setMode("dark") : setMode("light");
    };

    if (!cacheMode) handleChange(mediaQueryList);

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [setMode, cacheMode]);

  //   모드변경에 의한 캐시
  useEffect(() => {
    document.cookie = `mode=${mode}; expires=31536000; path=/`;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};
