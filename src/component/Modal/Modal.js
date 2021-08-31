import React, { useEffect, useState } from "react";
import "./modal.css";
import ReactPlayer from "react-player/youtube";
import { BiPlus } from "react-icons/bi";

const Modal = ({ handleClose, show, movieKey,playing,stopPlaying }) => {
  const [uri, setUri] = useState(null);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    if (movieKey){
      const url = "https://www.youtube.com/watch?v=" + movieKey;
      console.log(url);
      setUri(url)
    }
  }, [movieKey])
    

  // useEffect(() => {
  //   setTimeout(() => {
  //     let url = "https://www.youtube.com/watch?v=" + movieKey;
  //     console.log(url);
  //   },1000);

  //   return () => console.log("cleanup");
  // }, [movieKey]);

  function close() {
    stopPlaying();
    handleClose();
    setUri(null)
  }
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <BiPlus
          style={{ color: "#777", height: "30px", width: "30px" }}
          size="sm"
          className="cross"
          onClick={close}
        />
        <ReactPlayer
          url= {uri}
          className="react-player"
          playing={playing}
          width="100%"
          height="90%"
          controls={true}
        />
      </div>
    </div>
  );
};

export default Modal;