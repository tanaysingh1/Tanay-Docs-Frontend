import "./App.css";
import FileDisplay from "./FileDisplay";
import CreateFile from "./CreateFile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FileDisplay />} />
          <Route path="/create-file" element={<CreateFile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
