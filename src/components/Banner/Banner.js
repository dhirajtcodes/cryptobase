import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(https://wallpaperaccess.com/full/1267580.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.banner}>
        <Container className={classes.bannerContainer}>
          <div className={classes.tagline}>
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
              }}
            >
              Crypto Base
            </Typography>
            <Typography
              varient="subtitle2"
              style={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all information about you favorites crypto
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
};

export default Banner;
