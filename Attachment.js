import React, { useState } from "react";
import FileUpload from "../components/common/FileUpload";
import FileList from "../components/common/FileList";

const Attachment = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
  };

  const handleUpload = (fileInfo) => {
    setFiles((prev) => [...prev, fileInfo]);
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <FileUpload onUpload={handleUpload} />
      <h3>Uploaded Files</h3>
      <FileList files={files} />
    </div>
  );
};

export default Attachment;