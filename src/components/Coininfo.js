import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../contexts/CryptoContext";
import { FetchHistoricData } from "../config/functions";
import Chart from "react-apexcharts";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    overflowX: "auto",
    overflow: "hidden",
    overscrollBehavior: "none",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  chart: {
    width: "100%",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  btn: {
    padding: "0.4rem 1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#126caf",
    color: "#fff",
  },
}));

const Coininfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [options, setOptions] = useState();
  const [series, setSeries] = useState();

  const [days, setDays] = useState();
  const { currency } = useContext(Crypto);
  const classes = useStyles();

  useEffect(() => {
    FetchHistoricData(coin.id, days, currency).then((result) => {
      setHistoricData(result.data.prices);
      setOptions({
        chart: {
          id: "crypto-chart",
        },
        xaxis: {
          category: result.data.prices.slice(1, 100).map((coins) => {
            const date = new Date(coin[0]);
            const time =
              date.getHours() > 12
                ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                : `${date.getHours()}: ${date.getMinutes()} AM `;
            return days === 1 ? time : date.toLocaleDateString();
          }),
        },
      });

      setSeries([
        {
          name: "series 1",
          data: result.data.prices.slice(1, 100).map((coins) => {
            return parseInt(coins[1]);
          }),
        },
      ]);
    });
  }, [days]);

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
        <div className={classes.container}>
          {!historicData ? (
            <CircularProgress
              style={{ color: "rgb(203 229 246)" }}
              size={250}
              thickness={1}
            />
          ) : (
            <div>
              <Chart
                options={options}
                series={series}
                type="area"
                height={550}
                width={1000}
              />
              <div className={classes.buttons}>
                <button
                  value="1"
                  onClick={(e) => setDays(+e.target.value)}
                  className={classes.btn}
                >
                  1 Day
                </button>
                <button
                  value="15"
                  onClick={(e) => setDays(+e.target.value)}
                  className={classes.btn}
                >
                  15 Days
                </button>
                <button
                  value="30"
                  onClick={(e) => setDays(+e.target.value)}
                  className={classes.btn}
                >
                  30 Days
                </button>
                <button
                  value="90"
                  onClick={(e) => setDays(+e.target.value)}
                  className={classes.btn}
                >
                  90 Days
                </button>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Coininfo;
