import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import "./index.css";
import Newsletter from "./pages/newsletter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="newsletter" element={<Newsletter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
