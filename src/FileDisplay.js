import "./File.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FileDisplay() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch file names from the backend
    axios
      .get("http://localhost:8080/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the file list!", error);
      });
  }, []);

  const fetchFileContent = (fileName) => {
    axios
      .get(`http://localhost:8080/files/${fileName}`)
      .then((response) => {
        setSelectedFile(fileName);
        setFileContent(response.data.content);
      })
      .catch((error) => {
        console.error("There was an error fetching the file content!", error);
      });
  };
  const deleteFile = (fileName) => {
    console.log(fileName);
    axios
      .delete(`http://localhost:8080/files/${fileName}`)
      .then((response) => {
        setFiles(files.filter((file) => file !== fileName));
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("There was an error fetching the file content!", error);
      });
  };

  const saveFileContent = () => {
    axios
      .post("http://localhost:8080/update-file", {
        fileName: selectedFile,
        text: fileContent,
      })
      .then((response) => {
        alert("File updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating the file content!", error);
      });
  };

  return (
    <div>
      <h1>File Viewer</h1>
      <div className="File-div">
        <button
          className="File-button"
          onClick={() => {
            navigate("/create-file");
          }}
        >
          Create New File
        </button>
        {files.map((file) => (
          <button key={file} onClick={() => fetchFileContent(file)}>
            {file}
          </button>
        ))}
      </div>
      {selectedFile && (
        <div>
          <h2>Editing: {selectedFile}</h2>
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            rows="20"
            cols="80"
          />
          <br />
          <button onClick={saveFileContent}>Save</button>
          <button onClick={() => deleteFile(selectedFile)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default FileDisplay;
