import * as types from "./types";

export function closeWindow() {
  return {
    type: types.CLOSE_WINDOW,
  };
}

export function draggingFile() {
  return {
    type: types.DRAGGING_FILES,
  };
}

export function notDraggingFile() {
  return {
    type: types.NOT_DRAGGING_FILES,
  };
}

export function openList() {
  return {
    type: types.OPEN_LIST,
  };
}

export function closeList() {
  return {
    type: types.CLOSE_LIST,
  };
}

export function reorderedList(newList) {
  return {
    type: types.REORDER_LIST,
    newList,
  };
}

export function removeFromList(ids) {
  return {
    type: types.REMOVE_FROM_LIST,
    ids,
  };
}

export function playSong(song) {
  return {
    type: types.PLAY_SONG,
    song,
  };
}

export function pauseSong(song) {
  return {
    type: types.PAUSE_SONG,
    song,
  };
}

export function mute() {
  return {
    type: types.MUTE_SOUND,
  };
}

export function unmute() {
  return {
    type: types.UNMUTE_SOUND,
  };
}

export function setVolumn(volume) {
  return {
    type: types.SET_VOLUME,
    volume,
  };
}

export function restartSong() {
  return {
    type: types.RESTART_SONG,
  };
}

export function playNextSong() {
  return {
    type: types.PLAY_NEXT_SONG,
  };
}

export function playPreviousSong() {
  return {
    type: types.PLAY_PREVIOUS_SONG,
  };
}

export function seek(value) {
  return {
    type: types.SEEK_SONG,
    value,
  };
}

export function dropFiles(songList) {
  return {
    type: types.DROP_FILES,
    songList,
  };
}
