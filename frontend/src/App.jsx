import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NotFound from './pages/NotFound';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} limit={2} theme='colored'/>
      <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/task/:id" element={<TaskPage/>}/>
        <Route path="/not-found" element={<NotFound/>}/>
        <Route path="*" element={<Navigate to="/not-found" />}/>
      </Routes>
    </Router>
    </React.Fragment>
    
  );
}

export default App;
