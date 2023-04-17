import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../../actions/file';
import { setPopupDisplay } from '../../../store/reducers/fileReducer';
import './popUpCSS/popUp.css';
const PopUp = () => {
  const [dirName, setDirName] = useState('');
  const dispatch = useDispatch();
  const currentDir = useSelector(state=>state.file.currentDir);
  const display = useSelector(state=>state.file.popupDisplay)
  const createDirHandler = ()=>{
    dispatch(createDir(currentDir, dirName))
    setDirName('')
  }
  const closePopUp =()=>{
    dispatch(setPopupDisplay('none'))
    setDirName('');
  }
  return (
    <div className='popUp' onClick={closePopUp} style={{display}}>
      <div className='popUp__content' onClick={(e)=>e.stopPropagation()}>
        <div className='popUp__header'>
          <div className='popUp__title' >Create new directory</div>
          <button className='popUp__close' onClick={closePopUp}>X</button>
        </div>
        <input type='text' value={dirName} onChange={(e)=>setDirName(e.target.value)} placeholder='Input directory name...'/>    
        <button className='popUp__create' onClick={createDirHandler}>Create Directory</button>
      </div>
    </div>
  );
};

export default PopUp;