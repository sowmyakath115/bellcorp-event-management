import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar/>
        <Routes>
          
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard"  element={
           <ProtectedRoute>
            <Dashboard />
           </ProtectedRoute>
            }/>


        </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

