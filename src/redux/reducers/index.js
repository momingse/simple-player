import * as types from "../actions/types";
import { combineReducers } from "redux";
import { ipcRenderer } from "electron";
import WaterFallOver from "../../utils/WaterFallOver";
import AudioController from "../../utils/AudioController";

const audioController = new AudioController(100);
const initalState = {
  openedList: false,
  draggingFile: false,
  songList: [],
  playingSong: null,
  volume: 100,
  isMuted: false,
  audioController,
};

const appReducer = (prevState, action) => {
  if (typeof prevState === "undefined") return initalState;

  switch (action.type) {
    case types.DRAGGING_FILES:
      return {
        ...prevState,
        draggingFile: true,
      };

    case types.NOT_DRAGGING_FILES:
      return {
        ...prevState,
        draggingFile: false,
      };

    case types.CLOSE_WINDOW:
      ipcRenderer.invoke("closeApp");
      return prevState;

    case types.OPEN_LIST:
      return {
        ...prevState,
        openedList: true,
      };

    case types.CLOSE_LIST:
      return {
        ...prevState,
        openedList: false,
      };

    case types.REORDER_LIST:
      return { ...prevState, songList: action.newList };

    case types.DROP_FILES:
      return {
        ...prevState,
        songList: [...prevState.songList, ...action.songList],
      };

    case types.REMOVE_FROM_LIST:
      prevState.songList = prevState.songList.filter((item) => {
        action.ids.indexOf(item.id) === -1;
      });
      return prevState;

    case types.PLAY_SONG:
      if (
        prevState.playingSong &&
        prevState.playingSong.isPaused &&
        (!action.song || prevState.playingSong.id === action.song.id)
      ) {
        audioController.resume();
        prevState.playingSong.isPaused = false;
        return { ...prevState };
      }

      if (!action.song) {
        if (!prevState.songList.length) return prevState;
        if (!prevState.playingSong) {
          prevState.playingSong = prevState.songList[0];
          return prevState;
        }
        for (let i = 0; i < prevState.songList.length; i++) {
          if (prevState.songList[i].id === prevState.playingSong.id) {
            if (i + 1 >= prevState.songList.length) {
              prevState.playingSong.isPause = true;
            } else {
              prevState.playingSong = prevState.playingSong[i + 1];
            }

            return prevState;
          }
        }
        return prevState;
      }

      audioController.play(action.song);
      action.song.isPaused = false;
      return { ...prevState, playingSong: action.song };

    case types.PAUSE_SONG:
      prevState.playingSong.isPaused = true;
      audioController.pause();
      return { ...prevState };

    case types.PLAY_NEXT_SONG:
      if (!prevState.songList.length) return prevState;
      if (!prevState.playingSong) {
        prevState.playingSong = prevState.songList[0];
        return prevState;
      }

      for (let i = 0; i < prevState.songList.length; i++) {
        if (prevState.songList[i].id !== prevState.playingSong.id) continue;
        if (i + 1 >= prevState.songList.length) {
          prevState.playingSong = prevState.songList[0];
        } else {
          prevState.playingSong = prevState.songList[i + 1];
        }

        audioController.play(prevState.playingSong);
        return { ...prevState };
      }

      audioController.restart();
      return prevState;

    case types.PLAY_PREVIOUS_SONG:
      if (!prevState.songList.length) return prevState;
      if (!prevState.playingSong) {
        prevState.playingSong = prevState.songList[0];
        return prevState;
      }

      for (let i = 0; i < prevState.songList.length; i++) {
        if (prevState.songList[i].id !== prevState.playingSong.id) continue;
        if (i - 1 < 0) {
          prevState.playingSong =
            prevState.songList[prevState.songList.length - 1];
        } else {
          prevState.playingSong = prevState.songList[i - 1];
        }

        audioController.play(prevState.playingSong);
        return { ...prevState };
      }
      audioController.restart();
      return prevState;

    case types.STOPPED_PLAYING:
      if (!action.file) return prevState;
      audioController.stop(false);
      return {
        prevState,
        playingSong: null,
      };

    case types.RESTART_SONG:
      audioController.restart();
      return prevState;

    case types.MUTE_SOUND:
      audioController.mute();
      return {
        ...prevState,
        isMuted: true,
      };

    case types.UNMUTE_SOUND:
      audioController.unmute();
      return {
        ...prevState,
        isMuted: false,
      };

    case types.RESTART_SONG:
      audioController.restart();
      return prevState;

    case types.SEEK_SONG:
      audioController.seek(action.value);
      return prevState;

    case types.SET_VOLUME:
      audioController.setVolume(action.volume);
      return {
        ...prevState,
        volume: action.volume,
      };

    default:
      return prevState;
  }
};

export default combineReducers({ app: appReducer });
