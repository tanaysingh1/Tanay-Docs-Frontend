import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateFile() {
  const [textContent, setTextContent] = useState("");
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const handleSaveFile = () => {
    navigate("/");

    axios
      .post("http://localhost:8080/save-file", {
        fileName: fileName,
        text: textContent,
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
      <h1>Text Saver</h1>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Enter your text here"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        rows="20"
        cols="100"
      />
      <br />
      <button onClick={handleSaveFile}>Save File</button>
    </div>
  );
}

export default CreateFile;
