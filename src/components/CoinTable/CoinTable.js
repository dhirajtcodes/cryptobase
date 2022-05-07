import React, { useEffect, useContext, useState } from "react";
import { FetchCoinLists } from "../../config/functions";
import { Crypto } from "../../contexts/CryptoContext";
import { useNavigate } from "react-router";
import { numberWithCommas } from "../Banner/Carousel";
import { Pagination } from "@material-ui/lab";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  pagination: {
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "rgb(203 229 246)  ",
      color: "#1e1b1b",
      fontWeight: 800,
    },
  },
}));

const CoinTable = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = useContext(Crypto);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    FetchCoinLists(currency).then((result) => {
      setCoin(result.data);
    });
    setLoading(false);
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coin.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            CryptoCurrency Price by Market Cap
          </Typography>
          <TextField
            label="Search For a CryptoCurrency here"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backGround: "gold" }}></LinearProgress>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "rgb(203 229 246)" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market cap"].map(
                      (head) => {
                        return (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      let profit = row.price_change_percentage_24h >= 0;
                      return (
                        <TableRow
                          key={row.name}
                          className={classes.row}
                          onClick={() => navigate(`/coin/${row.id}`)}
                          component="th"
                          scope="row"
                        >
                          <TableCell style={{ display: "flex", gap: 15 }}>
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              styles={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgray" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}
                            {numberWithCommas(row?.current_price.toFixed(1))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.market_cap_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinTable;
