import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/components/Login/login"
import Signup from "../src/components/Signup/signup"
import WhatsApp from "./whatsapp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
      </Routes>
    </Router>
  )
}

export default App;