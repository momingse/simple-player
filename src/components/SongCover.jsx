import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UNKNOWN_URL = "/img/unknown-cover.svg";

const SongCover = () => {
  const [url, setUrl] = useState(UNKNOWN_URL);

  const playingSong = useSelector((state) => state.app.playingSong);

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

    try {
      const cover = await file.findCover();
      setUrl(cover);
    } catch (error) {
      console.log(error);
      setUrl(UNKNOWN_URL);
    }
  };

  return (
    <div
      className="songcover-container"
      style={{ backgroundImage: `url(${url})` }}
    ></div>
  );
};

export default SongCover;
