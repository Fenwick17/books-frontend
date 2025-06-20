import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Login } from "./routes/login"
import { Register } from "./routes/register"

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App