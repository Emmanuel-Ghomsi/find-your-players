import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontend from "./routes/Frontend";
import Backend from "./routes/Backend";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Frontend />} />
          <Route path="in/*" element={<Backend />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
