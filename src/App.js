import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import Moviescard from "./component/MoviesCards";
import wordsToNumbers from "words-to-numbers";
import Modal from "./component/Modal/Modal";
import ReactGA from 'react-ga';





const alanKey =
  "5c0dde699f7be267f2b24fa877066ad02e956eca572e1d8b807a3e2338fdd0dc/stage";

const COMMANDS = {
  SHOW_MOVIE: "showMovie",
  HIGHLIGHT: "highlight",
  OPEN: "openMovie",
  PLAY: "play",
};

const App = () => {
  const [alanInstance, setAlanInstance] = useState();
  const [movies, setMovies] = useState([]);
  const [activeMovies, setActiveMovies] = useState(0);
  const [videos, setVideos] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    ReactGA.initialize('UA-206713505-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const isPlaying = () => {
    setPlaying(true);
  };
  const notPlaying = () => {
    setPlaying(false);
  };

  const show_movie = useCallback(({ detail: { list } }) => {
    console.log(list);
    setMovies(list);
    setActiveMovies(-1);
  }, []);

  const highlight = useCallback(() => {
    setActiveMovies((prevActiveMovies) => prevActiveMovies + 1);
  }, []);

  const open_movie = useCallback(
    ({ detail: { number, list } }) => {
      console.log(number);
      const parsedNumber =
        number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
      const article = list[parsedNumber - 1];

      if (parsedNumber > list.length) {
        alanBtn().playText("Please try that again...");
      } else if (article) {
        window.open("https://www.themoviedb.org/movie/" + article.id, "_blank");
        alanInstance.playText("Opening...");
      } else {
        alanInstance.playText("Please try that again...");
      }
    },
    [alanInstance]
  );

  const play_movie = useCallback(({ detail: { video } }) => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            video.id +
            "/videos?api_key=b6d1627d45cef30c68b54c63da1c3226&language=en-US"
        );
        let jsonData = await response.json();
        console.log(jsonData.results.length);

        if (jsonData.results.length <= 0) {
          console.log("bye");
          alanInstance.playText(
            "Sorry no trailer available for " + video.original_title
          );
        } else {
          console.log("data available");
          setVideos(jsonData);
          setOpen(true);
          setPlaying(true);
          alanInstance.playText("Playing trailer for " + video.original_title);
        }
      } catch (e) {
        // Some fetch error
        console.log(e);
      }
    })();
  }, [alanInstance]);

  useEffect(() => {
    window.addEventListener(COMMANDS.SHOW_MOVIE, show_movie);
    window.addEventListener(COMMANDS.HIGHLIGHT, highlight);
    window.addEventListener(COMMANDS.OPEN, open_movie);
    window.addEventListener(COMMANDS.PLAY, play_movie);

    return () => {
      window.removeEventListener(COMMANDS.SHOW_MOVIE, show_movie);
      window.removeEventListener(COMMANDS.HIGHLIGHT, highlight);
      window.removeEventListener(COMMANDS.OPEN, open_movie);
      window.removeEventListener(COMMANDS.PLAY, play_movie);
    };
  }, [show_movie, highlight, open_movie, play_movie]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: alanKey,
        zIndex: "2000",
        showOverlayOnMicPermissionPrompt: true,
        onCommand: ({ command, list, number, video }) => {
          window.dispatchEvent(
            new CustomEvent(command, {
              detail: { list: list, number: number, video: video },
            })
          );
        },

      })
    );
  }, []);

  useEffect(() => {
    if (videos && videos.results) {
      console.log(videos.results[0]);
      setVideoKey(videos.results[0].key);
    }
  }, [videos, videos.results]);

  return (
    <div>
      <div className="main">
        {videos && (
          <Modal
            show={isOpen}
            handleClose={hideModal}
            movieKey={videoKey}
            playing={playing}
            stopPlaying={notPlaying}
          >
            <p>Modal</p>
          </Modal>
        )}
        <Moviescard list={movies} activeMovies={activeMovies} />
      </div>
    </div>
  );
};

export default App;
