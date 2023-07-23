import * as actions from "../redux/actions/common";
import { useDispatch, useSelector } from "react-redux";
import { closeList } from "../redux/actions/common";
import SortableList from "./SortableList";
import { useEffect, useState } from "react";

const KEYCODE_ESC = 27;

const List = (props) => {
  const [selectedItem, setSelectedItem] = useState([]);

  const dispatch = useDispatch();

  const isOpened = useSelector((state) => state.app.openedList);
  const playingSong = useSelector((state) => state.app.playingSong);

  useEffect(() => {
    const onKeyUp = (e) => {
      if (isOpened && e.keyCode === KEYCODE_ESC) {
        dispatch(closeList());
      }
    };
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const handleBackButtonClicked = () => {
    dispatch(closeList());
  };

  const handleRubbishButtonClicked = () => {};

  const _className = "menu-list " + (isOpened ? "is-opened" : "");

  return (
    <div className={_className}>
      <div className="button-container">
        <div className="back-button" onClick={handleBackButtonClicked}></div>
        <div
          className={
            "rubbish-button " + (selectedItem.length ? "is-active" : "")
          }
          onClick={handleRubbishButtonClicked}
        ></div>
      </div>
      <SortableList />
    </div>
  );
};

export default List;
