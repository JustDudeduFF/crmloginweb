import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CustomerLogin from './CustomerLogin';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Sigma Networks</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="#about">About</a>
              <a className="nav-link" href="#services">Services</a>
              <a className="nav-link" href="#pricing">Plans & Pricing</a>
              <a className="nav-link" href="#contact">Contact</a>
              <a className="nav-link" href="/CustomerLogin">Customer Login</a>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
