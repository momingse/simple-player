import VolumnIconSvg from "./VolumeIconSvg";
import { useDispatch, useSelector } from "react-redux";
import { unmute, mute, setVolumn } from "../redux/actions/common";
import { useState } from "react";
import CustomizedRange from "./CustomizedRange";

const MIN_VOLUME = 0;
const MAX_VOLUME = 100;

const VolumeControl = () => {
  const dispatch = useDispatch();

  const volume = useSelector((state) => state.app.volume);
  const isMuted = useSelector((state) => state.app.isMuted);

  const [testing, setTesting] = useState(50);

  const toggleVolume = () => {
    if (isMuted) {
      dispatch(unmute());
    } else {
      dispatch(mute());
    }
  };

  const handleVolumeChange = (value) => {
    dispatch(setVolumn(value));
  };

  return (
    <div className="volume-control">
      <div className="volume-range">
        <CustomizedRange
          max={MAX_VOLUME}
          min={MIN_VOLUME}
          onChange={handleVolumeChange}
          values={[volume]}
        />
      </div>
      <div className="volume-button" onClick={toggleVolume}>
        <VolumnIconSvg
          isMuted={isMuted}
          volume={volume / MAX_VOLUME}
          className="volume-icon"
          fill="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
