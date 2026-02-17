import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <App />
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>,
);
