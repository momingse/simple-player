import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const NUMBER_OF_BARS = 16;
const REFREASHTIME = 1000 / 60;

const PlayerSpectrum = () => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [bars, setBars] = useState(new Array(NUMBER_OF_BARS).fill(0));

  const audioController = useSelector((state) => state.app.audioController);
  const playingSong = useSelector((state) => state.app.playingSong);

  const getFrequency = () => {
    let average = new Array(NUMBER_OF_BARS).fill(0);
    const frequency = audioController.getFrequency(null);
    if (!frequency) return average;

    const averageStep = frequency.length / NUMBER_OF_BARS;
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      average[i] = audioController.analyserAverage(
        frequency,
        i * averageStep,
        (i + 1) * averageStep
      );
    }
    return average;
  };

  const animate = (time) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      return;
    }

    if (time - previousTimeRef.current > REFREASHTIME) {
      const frequency = getFrequency();
      setBars(frequency);
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [playingSong?.name]);

  return (
    <div className="player-spectrum-container">
      {bars.map((bar, index) => (
        <div
          className="spectrum-bar"
          key={index}
          style={{
            left: `${6.25 * index}%`,
            height: `${Math.ceil(bars[index] * 100)}%`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default PlayerSpectrum;
