import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <div style={{ backgroundColor: 'blue' }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <img
            src='https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg'
            alt='logo'
            style={{ width: '70px', height: '40px' }}
          />
          <h3>
            <Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>
              Users
            </Link>
          </h3>
          <h3>
            <Link to='/posts' style={{ color: '#fff', textDecoration: 'none' }}>
              Posts
            </Link>
          </h3>
          <h3>
            <Link
              to='/comment'
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Comments
            </Link>
          </h3>
        </nav>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h5>Custom Data Grid With Search and sort</h5>
      </div>
    </div>
  );
}
