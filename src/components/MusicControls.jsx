import VolumeControl from "./VolumeControl";
import Seeker from "./Seeker";
import { useDispatch, useSelector } from "react-redux";
import {
  playSong,
  playPreviousSong,
  playNextSong,
  restartSong,
  pauseSong,
} from "../redux/actions/common";
import { useState } from "react";

const MusicControls = () => {
  const songPlaying = !useSelector((state) => state.app.playingSong?.isPaused);
  const dispatch = useDispatch();

  const handlePreviousButtonClicked = () => {
    dispatch(playPreviousSong());
  };

  const handleNextButtonClicked = () => {
    dispatch(playNextSong());
  };

  const handlePlayButtonClicked = () => {
    dispatch(playSong());
  };

  const handlePauseButtonClicked = () => {
    dispatch(pauseSong());
  };

  return (
    <div className="music-container">
      <div className="basic-container">
        <div
          className="previous-button"
          onClick={handlePreviousButtonClicked}
        ></div>
        {songPlaying ? (
          <div
            className="music-container-pause-button"
            onClick={handlePauseButtonClicked}
          ></div>
        ) : (
          <div
            className="music-container-play-button"
            onClick={handlePlayButtonClicked}
          ></div>
        )}
        <div className="next-button" onClick={handleNextButtonClicked}></div>
      </div>
      <Seeker />
      <VolumeControl />
    </div>
  );
};

export default MusicControls;
