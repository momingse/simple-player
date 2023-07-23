import React from "react";
import MusicControls from "./MusicControls";
import SongCover from "./SongCover";
import { useDispatch, useSelector } from "react-redux";
import { closeWindow, openList } from "../redux/actions/common";
import PlayerSpectrum from "./PlayerSpectrum";

const Home = () => {
  const dispatch = useDispatch();

  const openedList = useSelector((state) => state.app.openedList);
  const isDragingFile = useSelector((state) => state.app.draggingFile);

  const handleMenuClick = () => {
    dispatch(openList());
  };

  const onCloseClick = () => {
    dispatch(closeWindow());
  };

  const _className =
    "home-container" +
    (openedList ? " file-list-opened" : "") +
    (isDragingFile ? " files-over" : "");

  return (
    <div className={_className}>
      <div className="player-title">
        <div className="close-button" onClick={onCloseClick}></div>
        <div className="menu-button" onClick={handleMenuClick}></div>
      </div>
      <div className="music-controls">
        <PlayerSpectrum />
        <SongCover />
        <MusicControls />
      </div>
    </div>
  );
};

export default Home;
