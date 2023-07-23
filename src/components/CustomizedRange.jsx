import { Range } from "react-range";

const Direction = {
  Right: "to right",
  Left: "to left",
  Down: "to bottom",
  Up: "to top",
};

const CustomizedRange = (props) => {
  const {
    min,
    max,
    step = 0.1,
    values,
    onChange,
    onMouseDown,
    onMouseUp,
  } = props;

  const _onMouseDown = onMouseDown || (() => {});
  const _onMouseUp = onMouseUp || (() => {});

  const getTrackBackground = ({
    values,
    colors,
    min,
    max,
    direction = Direction.Right,
    rtl = false,
  }) => {
    if (rtl && direction === Direction.Right) {
      direction = Direction.Left;
    } else if (rtl && Direction.Left) {
      direction = Direction.Right;
    }
    // sort values ascending
    const progress = values
      .slice(0)
      .sort((a, b) => a - b)
      .map((value) => ((value - min) / (max - min)) * 100);
    const middle = progress.reduce(
      (acc, point, index) =>
        `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
      ""
    );
    return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${
      colors[colors.length - 1]
    } 100%)`;
  };

  return (
    <Range
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors: ["#414EB9", "#ccc"],
                min,
                max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "10px",
            width: "10px",
            borderRadius: "10px",
            backgroundColor: "#414EB9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA",
          }}
        >
          <div
            className="range-thumb"
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "10px",
              backgroundColor: "#414EB9",
            }}
          />
        </div>
      )}
    />
  );
};

export default CustomizedRange;
