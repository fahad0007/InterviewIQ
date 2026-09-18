import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Javascript from "./pages/JavaScript";
import Coding from "./pages/Coding";
import ReactRound from "./pages/ReactRound";
import HR from "./pages/Hr";
import QuestionDetails from "./pages/QuestionDetails";

import Favorites from "./pages/Favorites";
import Completed from "./pages/Completed";
import Analytics from "./pages/Analytics";

import Signup from "./pages/Signup";
import Login from "./pages/Login";


import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";
import { useState } from "react";


function App() {


  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

function AppLayout() {

   const [mobile, setMobile] = useState(false)

  const handleMenu  = ()=>{
   setMobile((prev)=> !prev)
  }
  return (
    <div className="app">

      <Navbar mobile={mobile} handleMenu={handleMenu} />

      <div className="app-layout">

        <Sidebar mobile={mobile} handleMenu={handleMenu}/>

        <main className="main-content">

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/javascript" element={<Javascript />} />

            <Route path="/coding" element={<Coding />} />
            <Route path="/react" element={<ReactRound />} />

            <Route path="/hr" element={<HR />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/completed" element={<Completed />} />

            <Route path="/analytics" element={<Analytics />} />

            <Route
              path="/question/:type/:id"
              element={<QuestionDetails />}
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>


        </main>

      </div>

    </div>
  );
}

export default App;