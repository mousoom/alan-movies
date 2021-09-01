import React, { useEffect } from "react";
import Card from "./card/card";
import { Grid, Grow } from "@material-ui/core";
import Alan from "../assest/alan-logo.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/HelpOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MoviesCards = ({ list, activeMovies }) => {
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [size, setSize] = React.useState("");
  const [size1, setSize1] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);


  let view = "";
  if (width > 700) {
    view = "laptop";
  } else if (width < 700 && width > 450) {
    view = "tablet";
  } else if (width < 450) {
    view = "mobile";
  }

  function handleResize() {
    if (view === "mobile") {
      setSize("4rem");
      setSize1("1rem");
    } else if (view === "tablet") {
      setSize("5rem");
      setSize1("1.5rem");
    } else if (view === "laptop") {
      setSize("8rem");
      setSize1("2rem");
    }
  }
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [view]);

  if (!list.length) {
    return (
      <div className="main-container">
        <div className="content">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            COMMANDS
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  size="medium"
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fff", color: "#00ab55" }}
                    >
                      W
                    </Avatar>
                  }
                  label="What are the best movies today?"
                  clickable
                  style={{
                    margin: "5px",
                    backgroundColor: "#00ab55",
                    color: "#fff",
                  }}
                />
                <Chip
                  size="medium"
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fff", color: "#7635dc" }}
                    >
                      T
                    </Avatar>
                  }
                  label="Tell me about {movie_name}"
                  clickable
                  style={{
                    margin: "5px",
                    backgroundColor: "#7635dc",
                    color: "#fff",
                  }}
                />
                <Chip
                  size="medium"
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fff", color: "#1ccaff" }}
                    >
                      P
                    </Avatar>
                  }
                  label="Play trailer for {movie_name}"
                  clickable
                  style={{
                    margin: "5px",
                    backgroundColor: "#1ccaff",
                    color: "#fff",
                  }}
                />
                <Chip
                  size="medium"
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fff", color: "#fda92d" }}
                    >
                      O
                    </Avatar>
                  }
                  label="Open movie number {movie_no.}"
                  clickable
                  style={{
                    margin: "5px",
                    backgroundColor: "#fda92d",
                    color: "#fff",
                  }}
                />
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "10px",
              width: "100%",
            }}
          >
            <Tooltip title="Info">
              <IconButton aria-label="info" onClick={handleClickOpen}>
                <InfoIcon style={{ fontSize: 25, color: "#3d7aff" }} />
              </IconButton>
            </Tooltip>
          </div>

          <div>
            {size && (
              <span
                className="discover"
                style={{
                  display: "inline",
                  fontWeight: "500",
                  fontSize: size,
                  letterSpacing: "3px",
                }}
              >
                Discover.
              </span>
            )}
          </div>
          {size1 && (
            <span
              style={{
                color: "white",
                fontSize: size1,
                fontWeight: "400",
                letterSpacing: "10px",
                marginTop: "-30px",
                paddingLeft: "10px",
              }}
            >
              The Best Movies
            </span>
          )}
          <div className="brands">
            <div className="brands1">
              <img src={Alan} width="70px" alt="" />
            </div>
            <div className="brands1" style={{ marginLeft: "25px" }}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                width="60px"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <Tilt
          className={tilt}
          options={{ max: 25 }}
          style={{ height: 350, width: 300 }}
        >
          <div className={Inner}>
            <h1 className={title}>ALAN-MOVIE</h1>
            <h2>Try a Command:</h2>
            <h3>"What are the best movies today?"</h3>
            <h2>Or</h2>
            <h3>"What are the top movies now?"</h3>
          </div>
        </Tilt> */}
      </div>
    );
  }

  return (
    <Grow in>
      <Grid className="container" container>
        {list.map((list, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <Card list={list} i={i} activeMovies={activeMovies}/>
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default MoviesCards;
