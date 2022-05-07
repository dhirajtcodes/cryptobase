import React, { useContext } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useNavigate } from "react-router";
import { Crypto } from "../contexts/CryptoContext";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  Select: {
    width: 100,
    height: 40,
    marginTop: "10px",
  },
  title: {
    flex: 1,
    color: "rgb(203 229 246)",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "larger",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currency, setCurrency } = useContext(Crypto);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container className={classes.container} maxWidth="xl">
            <Toolbar onClick={() => navigate("/")}>
              <Typography className={classes.title}> Crypto Base</Typography>
            </Toolbar>
            <Select
              variant="outlined"
              className={classes.Select}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
