import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contributors from "./pages/Contributors";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound"

const ANIMATOR_URL = "https://animate.advancedarmorstands.ir";

function AnimatorRedirect() {
  useEffect(() => {
    window.location.replace(ANIMATOR_URL);
  }, []);

  return null;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animate" element={<AnimatorRedirect />} />
      <Route path="/download" element={<Download />} />
      <Route path="/contributors" element= {<Contributors />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}
