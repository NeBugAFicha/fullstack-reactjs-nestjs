import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import File from './file/File';

import './fileListCSS/fileList.css'
import { setCurrentDir } from '../../../store/reducers/fileReducer';
const FileList = () => {
  const files = useSelector(state=>state.file.files);
  

  return (
    <div className='fileList'>
      <div className='fileList__header'>
        <div className='fileList__name'>Name</div>
        <div className='fileList__date'>Date</div>
        <div className='fileList__size'>Size</div>
      </div>
      {files.map(file=><File key={file._id} file={file}/>)}
    </div>
  );
};

export default FileList;