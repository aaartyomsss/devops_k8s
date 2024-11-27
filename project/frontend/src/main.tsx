import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import axios from "axios"

console.log(import.meta.env)

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
