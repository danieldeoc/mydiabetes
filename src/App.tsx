import React from "react";
import HomePage from "./views/nonlogged/homepage";
import RegisterPage from "./views/nonlogged/register";
import {
    BrowserRouter as Router,
    Routes,
    Route} from "react-router-dom";
import Dashboard from "./views/logged/dashboard";
import LoginPage from "./views/nonlogged/login";


function App():JSX.Element {


    return(
        <>
            <Router>
                <Routes>                
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/signin" element={<LoginPage />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    
                </Routes>
            </Router> 
        </>
    )
}

export default App;