import { Children, useEffect, useState } from "react";
import BetterDrag from "../utils/BetterDrag";
import readFiles from "../utils/readFiles";
import { useDispatch, useSelector } from "react-redux";
import {
  draggingFile,
  notDraggingFile,
  dropFiles,
} from "../redux/actions/common";
import WaterFallOver from "../utils/WaterFallOver";

const DropArea = (props) => {
  const [hover, setHover] = useState(false);
  const { children } = props;
  const betterDrag = new BetterDrag(document);
  const dispatch = useDispatch();

  const currentSongListLength = useSelector(
    (state) => state.app.songList.length
  );

  const onDragOver = (e) => {
    const file = e.dataTransfer.files;
    // TODO dun know why length is 0 but drag is fine
    setHover(true);
    dispatch(draggingFile());
    if (file.length) {
      return;
    }
  };

  const onDragOut = (e) => {
    dispatch(notDraggingFile());
    setHover(false);
  };

  const onDrop = async (e) => {
    const obj = readFiles.separateDirectoriesFromFiles(e.dataTransfer.files);
    let files = obj.files;
    if (obj.directories.length) {
      const filesInDirectory = await readFiles.getAllFiles(obj.directories);
      files = [...files, ...filesInDirectory];
    }

    const filteredFile = readFiles.filterFilesByType(files, "audio");
    if (!filteredFile.length) return;

    const songList = [];

    const waterFall = new WaterFallOver(filteredFile);
    const onProcessFile = (obj) => {
      obj.item.readTags().then(() => {
        songList.push(obj.item);
        obj.next();
      });
    };
    const onFinish = () => {
      waterFall.removeListener("process", onProcessFile);
      dispatch(dropFiles(songList));
    };

    waterFall.on("process", onProcessFile);
    waterFall.once("finish", onFinish);
    waterFall.execute();
  };

  useEffect(() => {
    betterDrag.on("dragenter", onDragOver);
    betterDrag.on("dragleave", onDragOut);
    betterDrag.on("drop", onDrop);

    return () => {
      betterDrag.removeAllListeners();
      betterDrag.destroy();
    };
  }, []);

  return (
    <div>
      {children}
      <div className={`message-area${hover ? " message-area--hover" : ""}`}>
        <div className="dashed-container">Release to add to the list</div>
      </div>
    </div>
  );
};

export default DropArea;
