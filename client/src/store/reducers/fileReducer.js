const defaultState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
};

const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR= 'SET CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const POP_FROM_STACK = 'POP_FROM_STACK';

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES: return {...state, files: action.payload};
    case SET_CURRENT_DIR: return {...state, currentDir: action.payload};
    case ADD_FILE: return {...state, files: [...state.files, action.payload]}
    case SET_POPUP_DISPLAY: return {...state, popupDisplay: action.payload}
    case PUSH_TO_STACK: return {...state, dirStack: [...state.dirStack, action.payload]}
    case POP_FROM_STACK: return {...state, dirStack: state.dirStack.slice(0, state.dirStack.length-1)}
    default:
      return state;
  }
};


export const setFiles = (files)=>({type: SET_FILES, payload: files});
export const setCurrentDir = (currentDir)=>({type: SET_CURRENT_DIR, payload: currentDir});
export const addFile = (newFile)=>({type: ADD_FILE, payload: newFile})
export const setPopupDisplay = (display)=>({type: SET_POPUP_DISPLAY, payload: display});
export const pushToStack = (dir)=>({type: PUSH_TO_STACK, payload: dir});
export const popFromStack = ()=>({type: POP_FROM_STACK});
