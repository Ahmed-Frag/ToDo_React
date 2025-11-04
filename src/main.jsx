import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme({
  palette: {
    mode: "light", // أو dark لو عايز تبدأ بوضع داكن
    primary: {
      main: "rgb(167 43 22 / 87%)", // اللون الأساسي
    },
    secondary: {
      main: "#ff4081", // اللون الفرعي
    },
    background: {
      default: "#ff4081#f5f5f5", // خلفية الصفحة
      paper: "#ffffff",   // خلفية الكروت والعناصر
    },
  },
  typography: {
  fontFamily: 'Lalezar, sans-serif',
    },
  shape: {
    borderRadius: 12, // الحواف الدائرية الافتراضية
  },
});


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
  <StrictMode>
    <App />
  </StrictMode>,
  </ThemeProvider>
)
