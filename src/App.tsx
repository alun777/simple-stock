import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import StocksPage from "./pages/StocksPage";
import { Box } from "@mui/material";
import { enUS } from "@mui/material/locale";

// const router = createBrowserRouter([
//   {
//     path: "/simple-stock",
//     element: <Navigate to='/simple-stock/stocks' replace={true} />,
//   },
//   {
//     path: "/simple-stock/stocks",
//     element: <StocksPage />,
//   },
// ]);

const theme = createTheme(
  {
    palette: {
      mode: "dark",
      background: {
        default: "rgb(21, 27, 36)",
      },
    },
  },
  enUS
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        data-testid='app-main'
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
          gridTemplateAreas: `
            'header'
            'main'
          `,
        }}
      >
        <Header />
        <Box
          sx={{
            gridArea: "main",
            overflow: "auto",
            display: "grid",
            gridTemplateRows: "1fr",
            gridTemplateColumns: `1fr minmax(auto, ${theme.breakpoints.values.lg}px) 1fr`,
          }}
        >
          <Router>
            <Routes>
              <Route
                path='/'
                element={<Navigate to='/simple-stock/stocks' replace />}
              />
              <Route path='/simple-stock/stocks' element={<StocksPage />} />
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
