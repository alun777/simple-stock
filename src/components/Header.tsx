import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SimplyIcon from "./SimplyIcon";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Header = () => {
  const theme = useTheme();
  const isOverLargeBreakpoint = useMediaQuery(theme.breakpoints.up("lg"));

  const isOverMediumBreakpoint = useMediaQuery("(min-width: 1025px)");

  const headerLinks = [
    "Dashboard",
    "Markets",
    "Discover",
    "Watchlist",
    "Portfolios",
  ];

  return (
    <Box
      sx={{
        gridArea: "header",
        display: "grid",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        gridTemplateColumns: `1fr minmax(auto, ${theme.breakpoints.values.lg}px) 1fr`,
        backgroundColor: isOverLargeBreakpoint
          ? theme.palette.background.default
          : "rgb(27, 34, 45)",
      }}
    >
      <Box
        sx={{
          minWidth: "900px",
          maxWidth: "1200px",
          height: "64px",
          padding: `0 ${isOverMediumBreakpoint ? "24px" : "12px"}`,
          gridColumnStart: 2,
          display: "grid",
          gridTemplateColumns: `${
            isOverLargeBreakpoint ? "160px" : "32px"
          } 1fr ${isOverMediumBreakpoint ? "120px" : "32px"}`,
          alignItems: "center",
        }}
      >
        <SimplyIcon />

        <Box
          sx={{
            paddingTop: "4px",
            paddingLeft: "16px",
            display: "grid",
            gridTemplateRows: "1fr",
            gridTemplateColumns: `${
              isOverMediumBreakpoint ? "1fr 1fr" : "1fr"
            }`,
          }}
        >
          {isOverMediumBreakpoint ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "16px",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {headerLinks.map((linkText, i) => {
                return (
                  <Link
                    key={i}
                    underline='none'
                    href='/simple-stock/stocks'
                    sx={{ color: "white" }}
                  >
                    <Typography variant='body2'>{linkText}</Typography>
                  </Link>
                );
              })}
            </Box>
          ) : null}
          <Box
            sx={{
              width: `${isOverMediumBreakpoint ? "320px" : "100%"}`,
              marginLeft: `${isOverMediumBreakpoint ? "24px" : "0"}`,
            }}
          >
            <TextField
              size='small'
              fullWidth
              placeholder='search companies worldwide'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon sx={{ color: "rgb(35, 148, 223)" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box sx={{ paddingTop: "4px", width: "120px" }}>
          {isOverMediumBreakpoint ? (
            <Button
              fullWidth
              size='medium'
              sx={{
                textTransform: "capitalize",
                padding: "6px 8px",
                backgroundColor: "rgb(35, 148, 223)",
                color: "white",
              }}
              variant='outlined'
            >
              Log in/Sign up
            </Button>
          ) : (
            <PersonOutlinedIcon sx={{ opacity: 0.5, margin: "0 8px" }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
