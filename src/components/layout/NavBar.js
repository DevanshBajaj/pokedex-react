import React, { Fragment } from 'react';
import styles from './NavBar.module.css';
import Pokeball from './pokeball.svg';

const NavBar = () => {
  return (
    <Fragment>
      <nav className={styles.navbar} >
        <img src={Pokeball} alt="logo.svg"/>
        <a href="/">POKEDEX</a>
      </nav>
    </Fragment>
  )
};

export default NavBar;
