import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./routes/root";

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  </BrowserRouter>
);
