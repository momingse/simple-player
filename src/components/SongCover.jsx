import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UNKNOWN_URL = "/img/unknown-cover.svg";

const SongCover = () => {
  const [url, setUrl] = useState(UNKNOWN_URL);

  const playingSong = useSelector((state) => state.app.playingSong);
  const songPlaying = !useSelector((state) => state.app.playingSong?.isPaused);

  useEffect(() => {
    if (playingSong) {
      handleSongPlay(playingSong);
    }
  }, [playingSong?.name]);

  const handleSongPlay = async (file) => {
    if (file.cover) {
      setUrl(file.cover);
      return;
    }

    const cover = await file.findCover();
    if (cover) setUrl(cover);
  };

  const _className =
    "songcover-container" +
    (playingSong && songPlaying ? "" : " songcover-container__is-paused");

  return (
    <div
      className={_className}
      style={{ backgroundImage: `url(${url})` }}
    ></div>
  );
};

export default SongCover;
