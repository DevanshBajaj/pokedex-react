import React from 'react';
import styles from './NavBar.module.css';


const NavBar = () => {
  return (
    <div>
      <nav className={styles.navbar} >
        <a href="/">POKEDEX</a>
      </nav>
    </div>
  )
};

export default NavBar;
