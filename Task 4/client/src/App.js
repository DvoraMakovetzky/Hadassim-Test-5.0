import React from "react";
import {BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom"
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import OwnerDashboard from "./components/OwnerDashboard";
import OrderTabs from "./components/OrderTabs";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
        <Route path="/dashboard" element={<OwnerDashboard />} />
        <Route path="/orders" element={<OrderTabs />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
