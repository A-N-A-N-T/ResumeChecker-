import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Home from './Components/Home.jsx';

import {AuthProvider} from './Context/context.jsx'
import Protected from './Protected/Protected.jsx';
import Mainpage from './Components/Mainpage.jsx';
import ResumeUplaodPage from './Components/ResumeUplaodPage.jsx';
import InterviewReport from './Components/InterviewReport.jsx';
import { InterviewProvider } from './Context/InterviewContext.jsx';

function App() {
  

  return (
    
    <AuthProvider>
    <InterviewProvider>
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainpage" element={<Protected><ResumeUplaodPage/></Protected>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/interview/:interviewId' element={<InterviewReport/>} />
        </Routes>
      </div>
    </Router> 
    </InterviewProvider>
    </AuthProvider>
  )
}

export default App
