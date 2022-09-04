import React from 'react';
import { Link } from 'gatsby';

import * as styles from './navbar.module.scss';

const NavBar = () => {
  return (
    <nav className={styles.nav_bar}>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
    </nav>
  );
};

export default NavBar;
