// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import PizzaBuilder from './components/PizzaBuilder';
// import Auth from './components/Auth';
// // import UserDash from './components/UserDash'; 

// function App() {
//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>🍕 Custom Pizza Delivery App</h1>
//       <hr />
      
//       {/* This renders the custom pizza flow we built earlier */}
//       {/* <PizzaBuilder /> */}
//       <Auth />

//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPortal from './components/AuthPortal';
import PizzaBuilder from './components/PizzaBuilder';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        
        {/* Simple Navigation for testing */}
        <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <Link to="/user/login" style={{ marginRight: '15px' }}>User Portal</Link>
            <Link to="/admin/login">Admin Portal</Link>
        </nav>

        <Routes>
          <Route path="/user/login" element={<AuthPortal portalType="user" />} />
          <Route path="/admin/login" element={<AuthPortal portalType="admin" />} />
          <Route path="/dashboard" element={<PizzaBuilder />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* Add routes for /verify/:token and /reset-password/:token later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;