import { makeStyles } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { FetchTrendingCoins } from "../../config/functions";
import { Crypto } from "../../contexts/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
}));

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
};

// Component Start

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency, symbol } = useContext(Crypto);

    useEffect(() => {
        FetchTrendingCoins(currency).then((result) => {
            setTrending(result.data);
        });
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />

                <span>
                    {coin?.symbol} &nbsp;
                    <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}>
                        {profit && "+"}{" "}
                        {coin?.price_change_percentage_24h?.toFixed(2) + "%"}
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol}
                    {numberWithCommas(coin?.current_price.toFixed(1))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <>
            <div className={classes.carousel}>
                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableButtonsControls
                    disableDotsControls
                    responsive={responsive}
                    autoPlay
                    items={items}
                />
            </div>
        </>
    );
};

export default Carousel;
