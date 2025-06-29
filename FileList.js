import React from "react";

const FileList = ({ files }) => (
  <div className="file-list">
    {files.map((file, idx) => (
      <div key={idx} className="file-preview">
        {file.type.startsWith("image/") ? (
          <img src={file.url} alt={file.name} style={{ width: 100, height: "auto" }} />
        ) : file.type === "application/pdf" ? (
          <embed src={file.url} width="100" height="120" type="application/pdf" />
        ) : (
          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
        )}
        <div>{file.name}</div>
      </div>
    ))}
  </div>
);

export default FileList;