import React, { useEffect } from "react";
import Card from "./card/card";
import { Grid, Grow } from "@material-ui/core";
import useStyles from "./style.js";
import Alan from "../assest/alan-logo.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MoviesCards = ({ list, activeMovies }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  console.log(width);
  let view = "";
  if (width < 1024) {
    view = "mobile";
  } else {
    view = "laptop";
  }
  console.log(view);
  if (!list.length) {
    return (
      <div className={classes.main}>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center',fontWeight:'700'}}>COMMANDS</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>

              <Chip
                size="medium"
                avatar={<Avatar style={{backgroundColor:'#fff',color:'#00ab55'}}>W</Avatar>}
                label="What are the best movies today?"
                clickable
                style={{margin:'5px',backgroundColor:'#00ab55',color:'#fff'}}
                
              />
              <Chip
                size="medium"
                avatar={<Avatar style={{backgroundColor:'#fff',color:'#7635dc'}}>T</Avatar>}
                label="Tell me about {movie_name}"
                clickable
                style={{margin:'5px', backgroundColor:"#7635dc",color:'#fff'}}
              />
              <Chip
                size="medium"
                avatar={<Avatar style={{backgroundColor:'#fff',color:'#1ccaff'}}>P</Avatar>}
                label="Play trailer for {movie_name}"
                clickable
           
                style={{margin:'5px',backgroundColor:'#1ccaff',color:'#fff'}}
              />
               <Chip
                size="medium"
                avatar={<Avatar style={{backgroundColor:'#fff',color:'#fda92d'}}>O</Avatar>}
                label="Open movie number {movie_no.}"
                clickable
                
                style={{margin:'5px',backgroundColor:'#fda92d',color:'#fff'}}
              />
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <div className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "40px",
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
            <span
              className={classes.discover}
              style={{
                display: "inline",
                fontWeight: "500",
                fontSize: "7rem",
                color: "transparent",
                letterSpacing: "3px",
                backgroundImage:
                  "linear-gradient(150deg,#7a28ff 30%, #3d7aff 70%)",
                backgroundClip: "text",
              }}
            >
              Discover.
            </span>
          </div>
          <span
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "400",
              letterSpacing: "10px",
              marginTop: "-30px",
              paddingLeft: "10px",
            }}
          >
            The Best Movies
          </span>
          <div className={classes.brands}>
            <div className={classes.brands1}>
              <img src={Alan} width="70px" alt="" />
            </div>
            <div className={classes.brands1} style={{ marginLeft: "25px" }}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                width="60px"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <Tilt
          className={classes.tilt}
          options={{ max: 25 }}
          style={{ height: 350, width: 300 }}
        >
          <div className={classes.Inner}>
            <h1 className={classes.title}>ALAN-MOVIE</h1>
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
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {list.map((list, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <Card list={list} i={i} activeMovies={activeMovies} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default MoviesCards;
