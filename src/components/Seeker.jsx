import { useDispatch, useSelector } from "react-redux";
import {
  playNextSong,
  playSong,
  pauseSong,
  seek,
  mute,
  unmute,
} from "../redux/actions/common";
import { useEffect, useState, useRef } from "react";
import CustomizedRange from "./CustomizedRange";

const Seeker = () => {
  const [stopGribbingPlaytime, setStopGribbingPlaytime] = useState(false);
  const [playtime, setPlaytime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioController = useSelector((state) => state.app.audioController);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const _playtime = audioController?.getCurrentPlayingTime();
      const _duration = audioController?.getSongDuration();
      setPlaytime(_playtime);
      setDuration(_duration);

      if (_duration - _playtime < 0.1) {
        dispatch(playNextSong());
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSongStartPlaying = () => {
    setStopGribbingPlaytime(false);
    // setPlaytime(songPlaytime);
    // setDuration(songDuration);
  };

  const handleSongStopPlaying = () => {
    setStopGribbingPlaytime(true);
    setPlaytime(0);
    setDuration(0);
  };

  const onScrubChange = (value) => {
    audioController?.seek([value]);
    setPlaytime([value]);
  };

  const setSongTime = () => {
    if (stopGribbingPlaytime) return;

    // setPlaytime(songPlaytime);
    // setDuration(songDuration);
  };

  const pad = (value, size = 2) => {
    let s = String(value);
    while (s.length < size) [(s = `0${s}`)];
    return s;
  };

  const transformTime = (time) => {
    if (Number.isNaN(time)) {
      return "- -:- -";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${pad(seconds)}`;
  };

  const validateValue = (value) => {
    return !Number.isNaN(value) ? Math.min(value, duration * 1000) : 0;
  };

  const handleScrubMouseDown = () => {
    dispatch(mute());
  };

  const handleScrubMouseUp = () => {
    dispatch(unmute());
  };

  return (
    <div className="seeker-container">
      <div className="playTime">{transformTime(Math.floor(playtime))}</div>
      <div className="time-range">
        {/* <InputRange
          minValue={0}
          maxValue={Math.max(validateValue(duration), 1)}
        /> */}
        <CustomizedRange
          max={Math.max(validateValue(duration), 1)}
          min={0}
          values={[validateValue(playtime)]}
          onChange={onScrubChange}
          onMouseDown={handleScrubMouseDown}
          onMouseUp={handleScrubMouseUp}
        />
      </div>
      <div className="class-time">{transformTime(Math.floor(duration))}</div>
    </div>
  );
};

export default Seeker;
