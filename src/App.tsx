import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./routes/index";
import Archive from "./routes/archive";
import Reports from "./routes/reports";
import Surveillance from "./routes/surveillance";
import Signal from "./routes/signal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/signal" element={<Signal />} />
      </Routes>
    </BrowserRouter>
  );
}