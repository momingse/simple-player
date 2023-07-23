import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  draggingFile,
  notDraggingFile,
  reorderedList,
} from "../redux/actions/common";
import SortableListItem from "./SortableListItem";
import { useSelector } from "react-redux";

const InnerList = React.memo(({ data }) => {
  function areEqual(prevProps, nextProps) {
    if (prevProps.data === nextProps.data) {
      return true;
    }
  }
  return data.map((item, index) => (
    <SortableListItem
      key={item.id}
      id={item.id}
      item={item}
      index={index}
    />
  ));
});

const SortableList = (props) => {
  const data = useSelector((state) => state.app.songList);
  const [draggingFilesOver, setDraggingFilesOver] = useState(false);

  const dispatch = useDispatch();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderedList(items));

    setDraggingFilesOver(false);
    dispatch(notDraggingFile());
  };

  const handleOnDragStart = () => {
    setDraggingFilesOver(true);
    dispatch(draggingFile());
  };

  const _className = `container ${draggingFilesOver ? "has-filesOver" : ""}`;

  return (
    <DragDropContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      className={_className}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingover={snapshot.isDraggingOver}
            isStart={snapshot.draggingFromThisWith}
          >
            <InnerList data={data} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SortableList;
