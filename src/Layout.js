import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header style={{ backgroundColor: '#065fad', height: '80px', width: '100%', alignItems:'center', color: '#fff', padding: '10px 0', textAlign: 'left' }}>
    <nav style={{ marginTop: '20px', display: 'flex',marginLeft: '12%'  }}>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Popular</Link></li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to="/theatre" style={{ color: '#fff', textDecoration: 'none' }}>Theatre</Link></li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to="/kids" style={{ color: '#fff', textDecoration: 'none' }}>Kids</Link></li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to="/drama" style={{ color: '#fff', textDecoration: 'none' }}>Drama</Link></li>
        <li style={{ display: 'inline-block' }}><Link to="/comedy" style={{ color: '#fff', textDecoration: 'none' }}>Comedy</Link></li>
      </ul>
    </nav>
  </header>
  
);

const Layout = ({ children }) => (
  <>
    <Header />
    <main>
      {children}
    </main>
  </>
);

export default Layout;
