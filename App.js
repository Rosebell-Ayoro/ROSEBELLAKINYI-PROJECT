import React from'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import DashboardTabs from './pages/DashboardTabs';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Searchbar from './componts/searchbar';
import LessonPlan from './pages/LessonPlan';
import Schemeofwork from './pages/Schemeofwork';
import Recordofwork from './pages/Recordofwork';
import Feedback from './pages/Feedback';
import Login from './auth/Login';
import Register from './auth/Register';
import Themetoggle from './components/Themetoggle';
import { Themecontext } from './context/themecontext';
import  {useContext} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

import './styles/main.css';
import './styles/themes.css';
import { ThemeProvider } from './themecontext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/student/dashboard" element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/supervisor/dashboard" element={
          <ProtectedRoute role="supervisor">
            <SupervisorDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function App(){
  return(
    <Routes>
      <Route path="/dashboard" element={<DashboardTabs/>}/>
    </Routes>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* your routes */}
      </Routes>
    </>
  );
}
function App(){
    return(
         <>
      <YourRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App(){
  return(
    <>
    {/* Your routes/components*/}
    <Routes>{/*...*/}</Routes>
    {/*Footer*/}
    <Footer/>
    </>
  );
}
function App(){ 
    return(
        <ThemeProvider>
        <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
                <nav className="p-4 flex justify-between bg-blue-500 text-white">
                    <div className="space-x-4">
                        <link to="/">Lesson Plan</link>
                        <link to="/scheme">Scheme</link>
                        <link to="/record">Record</link>
                        <link to="/feedback">Feedback</link>
                        <link to="/login">Login</link>
                        <link to="/register">Register</link>
                    </div>
                    <ThemeSwitcher/>
                </nav>
            <Routes>
                <Route path="/"element={<Home/>}/>
                <Route path="/"element={<LessonPlan/>}/>
                <Route path="/scheme"element={<Schemeofwork/>}/>
                <Route path="/record"element={<Recordofwork/>}/>
                <Route path="/feedback"element={<Feedback/>}/>
                <Route path="/login"element={<Login/>}/>
                <Route path="/register"element={<Register/>}/>
            </Routes>
            </div>
        </Router>
        </ThemeProvider>
    );
}
export default App;