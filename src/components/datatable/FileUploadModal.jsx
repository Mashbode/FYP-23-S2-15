import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import "./fileuploadmodal.scss";
import instance from '../../axios_config';

Modal.setAppElement('#root'); // Set app element for accessibility

const FileUploadModal = ({ isOpen, isClose, fileID, onFileUpdated }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await instance.post(`/fileupdate/${fileID}`, formData);
      console.log('File upload response:', response.data);

      if (response.data === 'file ok') {
        onFileUpdated();
        isClose();
      } else {
        console.error('File update failed:', response.data);
      }
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  return (
  <div className="Modal" isOpen={isOpen}>
    <h2>Upload File</h2>
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {selectedFile ? (
        <p>Selected file: {selectedFile.name}</p>
      ) : (
        <p>Drag & drop a file here, or click to select a file</p>
      )}
    </div>
    <button onClick={handleUpload}>Confirm Update</button>
    <button onClick={isClose}>Cancel</button>
  </div>
  );
};

export default FileUploadModal;
