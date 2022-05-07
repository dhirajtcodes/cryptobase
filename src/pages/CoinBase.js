import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../utils/api";
import parse from "html-react-parser";
import axios from "axios";
import {
  Container,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Crypto } from "../contexts/CryptoContext";
import Coininfo from "../components/Coininfo";
import { numberWithCommas } from "../components/Banner/Carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      border: "none",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinBase = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [singleCoin, setSingleCoin] = useState();
  const { currency, symbol } = useContext(Crypto);
  const classes = useStyles();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setSingleCoin({
      name: data.name,
      image: data.image.large,
      marketCapRank: data.market_cap_rank,
      description: data.description.en,
      marketCurrentPrice:
        data.market_data?.current_price[currency.toLowerCase()],
      market_cap: data.market_data.market_cap[currency.toLowerCase()],
    });
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!singleCoin)
    return <LinearProgress style={{ backgroundColr: "rgb(203 229 246)" }} />;

  return (
    <>
      {singleCoin !== undefined ? (
        <Container maxWidth="xl">
          <div className={classes.container}>
            <div className={classes.sidebar}>
              <img
                src={singleCoin?.image}
                alt={singleCoin.name}
                height="200"
                style={{ marginBottom: 20 }}
              />

              <Typography variant="h3" className={classes.heading}>
                {singleCoin?.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.description}>
                {parse(singleCoin.description.split(". ")[0])}
              </Typography>
              <div className={classes.marketData}>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5" className={classes.heading}>
                    Rank:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {singleCoin?.marketCapRank}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5" className={classes.heading}>
                    Current Price:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {symbol} {numberWithCommas(singleCoin?.marketCurrentPrice)}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5" className={classes.heading}>
                    Market Cap:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                    {symbol}{" "}
                    {numberWithCommas(
                      singleCoin.market_cap.toString().slice(0, -6)
                    )}
                  </Typography>
                </span>
              </div>
            </div>
            <Coininfo coin={coin} />
          </div>
        </Container>
      ) : (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      )}
    </>
  );
};

export default CoinBase;
