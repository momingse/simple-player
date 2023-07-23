import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { playSong, pauseSong } from "../redux/actions/common";

const SortableListItem = (props) => {
  const { id, item, index } = props;
  const dispatch = useDispatch();

  const playingSongId = useSelector((state) => state.app.playingSong?.id);
  const isPaused = useSelector((state) => state.app.playingSong?.isPaused);

  const onPlayButtonClickProxy = () => {
    dispatch(playSong(item));
  };

  const onPauseButtonClickProxy = () => {
    dispatch(pauseSong());
  };

  const isSelect = index === 0;

  const isPlaying = id === playingSongId;

  const _className = `item ${
    index % 2 === 0 ? "list-item__is-even" : "list-item__is-old"
  } ${isSelect ? "is-select" : ""} ${isPlaying ? "is-playing" : ""}`;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={_className}
        >
          <span className={"item-number"}></span>
          <span className={"item-name"}>{item.name}</span>
          {!isPlaying || isPaused ? (
            <i className={"play-button"} onClick={onPlayButtonClickProxy}></i>
          ) : (
            <i className={"pause-button"} onClick={onPauseButtonClickProxy}></i>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SortableListItem;
