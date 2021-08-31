import React, { useState, useEffect } from "react";
import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import Moviescard from "./component/MoviesCards";
import wordsToNumbers from "words-to-numbers";
import Modal from "./component/Modal/Modal";

const alanKey =
  "5c0dde699f7be267f2b24fa877066ad02e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovies, setActiveMovies] = useState(0);
  const [videos, setVideos] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    alanBtn({
      key: alanKey,
      showOverlayOnMicPermissionPrompt: true,
      onCommand: ({ command, list, number, video }) => {
        if (command === "showMovie") {
          setMovies(list);
          setActiveMovies(-1);
        } else if (command === "highlight") {
          setActiveMovies((prevActiveMovies) => prevActiveMovies + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = list[parsedNumber - 1];

          if (parsedNumber > list.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(
              "https://www.themoviedb.org/movie/" + article.id,
              "_blank"
            );
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        } else if (command === "play") {
          console.log(video);
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
                alanBtn().playText(
                  "Sorry no trailer available for " + video.original_title
                );
              } else {
                console.log("data available");
                setVideos(jsonData);
                setOpen(true);
                setPlaying(true);
                alanBtn().playText(
                  "Playing trailer for " + video.original_title
                );
              }
              //   if (jsonData.results !== 0) {
              // 	// setVideos(jsonData);
              // 	console.log("data available");
              // 	alanBtn().playText(
              // 	  "Playing trailer for" + video.original_title
              // 	);
              // 	// setOpen(true);
              // 	// setPlaying(true);
              //   } else {
              // 	console.log("bye");
              // 	alanBtn().playText(
              // 	  "Sorry np trailer available for" + video.original_title
              // 	);
              //   }
            } catch (e) {
              // Some fetch error
              console.log(e);
            }
          })();
          // }
        }
      },
    });
  }, []);
  useEffect(() => {
    if (videos && videos.results) {
      console.log(videos.results[0]);
      setVideoKey(videos.results[0].key);
    }
  }, [videos, videos.results]);
  console.log(movies)
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
