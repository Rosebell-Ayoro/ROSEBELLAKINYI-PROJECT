import React, { useState } from "react";
import api from "../../services/api";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload && onUpload(res.data);
      setFile(null);
    } catch (err) {
      alert("Upload failed.");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="application/pdf,image/*" onChange={handleChange} />
      <button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
    </form>
  );
};

export default FileUpload;