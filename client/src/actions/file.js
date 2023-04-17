import axios from 'axios';
import { addFile, setFiles, setPopupDisplay } from '../store/reducers/fileReducer';

export const getFiles = (dirId) => {
  return async (dispatch) => {
    try {
      const {
        data: {data},
      } = await axios.get(`http://localhost:8000/api/files${dirId ? `?parent=${dirId}` : ``}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      dispatch(setFiles(data));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const createDir = (dirId, name) => {
  return async (dispatch) => {
    try {
      const {
        data: {data},
      } = await axios.post(`http://localhost:8000/api/files`,
      {
        ...dirId && {parent: dirId},
        name
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      dispatch(addFile(data));
      dispatch(setPopupDisplay('none'));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
