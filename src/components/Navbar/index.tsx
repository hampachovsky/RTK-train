import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

export const Navbar: React.FC = () => {
  return (
    <div className={style.menuWrapper}>
      <ul className={style.menu}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='new'>Add new gradient</Link>
        </li>
      </ul>
    </div>
  );
};
