import React, { Fragment } from 'react';
import styles from './NavBar.module.css';


const NavBar = () => {
  return (
    <Fragment>
      <nav className={styles.navbar} >
        <a href="/">POKEDEX</a>
      </nav>
    </Fragment>
  )
};

export default NavBar;
