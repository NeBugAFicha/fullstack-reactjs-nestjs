import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../store/reducers/fileReducer';
import FileLogo from '../../../../assets/img/file.svg';
import DirLogo from '../../../../assets/img/dir.svg';
import './fileCSS/file.css';
const File = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state=>state.file.currentDir);
  const isDir = file.type === 'dir';
  const openDirHandler = ()=>{
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  }
  return (
    <div className='file' onClick={isDir ? openDirHandler : ''}>
      <img src={isDir ? DirLogo : FileLogo} alt='' className='file__img'/>
      <div className='file__name'>{file.name}</div>
      <div className='file__date'>{file.date.slice(0,10)}</div>
      <div className='file__size'>{file.size}</div>
    </div>
  );
};

export default File;