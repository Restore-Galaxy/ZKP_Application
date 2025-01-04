import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/home" className={styles.navLink}>Home</Link></li>
          <li><Link to="/check-student" className={styles.navLink}>Hust Event</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;