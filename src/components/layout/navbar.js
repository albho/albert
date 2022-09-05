import React from 'react';
import { Link } from 'gatsby';

import * as styles from '/styles/layout/navbar.module.scss';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar_link} to="/">
        Home
      </Link>
      <Link className={styles.navbar_link} to="/">
        Blog
      </Link>
    </nav>
  );
};

export default NavBar;
