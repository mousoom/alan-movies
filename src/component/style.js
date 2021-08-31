import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  container: {
    padding: "0 5%",
    width: "100%",
    margin: 0,
  },
  main: {
    paddingTop:'60px',
    height: "100vh",
    fontFamily: "Poppins",
    flexDirection: "column",
    position: "relative",
    background: `url('https://i.ibb.co/vXqDmnh/background.jpg') no-repeat center center/cover`,
    "&::after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: "0.1",
      background: "rgba(0, 0, 0, 0.3)",
      boxShadow:
        "inset 120px 100px 250px #000000, inset -120px -100px 250px #000000",
    },
  },
  logo: {
    position: "relative",
    zIndex: "2",
    height: "80px",
    paddingLeft: "30px",
    display: "flex",
    alignItems: "center",
  },
  content: {
    position: "relative",
    zIndex: "2",
    width: "100%",
    margin: "auto",
    paddingLeft: "30px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  brands: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",
  },
  brands1: {
    background: "#111",
    padding: "20px",
    height: "90px",
    maxWidth: "100%",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
  },
});
