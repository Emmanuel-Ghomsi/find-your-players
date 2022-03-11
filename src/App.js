import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontend from "./routes/Frontend";
import Backend from "./routes/Backend";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Frontend />} />
          <Route path="in/*" element={<Backend />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
