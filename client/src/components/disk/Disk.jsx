import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFiles, createDir } from '../../actions/file';
import FileList from './fileList/FileList';
import './diskCSS/disk.css'
import PopUp from './popUp/PopUp';
import { popFromStack, setCurrentDir, setPopupDisplay } from '../../store/reducers/fileReducer';
const    Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state=>state.file.currentDir); 
  const parentDir = useSelector(state=>state.file.dirStack).slice().reverse()[0];
  useEffect(()=>{
    dispatch(getFiles(currentDir));
  },[currentDir]);

  const backDirHandler = ()=>{
    dispatch(popFromStack());
    dispatch(setCurrentDir(parentDir));
  }
  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back' onClick={backDirHandler}>Back</button>
        <button className='disk__create' onClick={()=>dispatch(setPopupDisplay('flex'))}>Create directory</button>
      </div>
      <FileList/>
      <PopUp/>
    </div>
  );
};

export default Disk;