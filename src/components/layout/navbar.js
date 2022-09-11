import React from 'react';
import { Link } from 'gatsby';

import { navbar, navbar_link } from '/styles/layout/navbar.module.scss';

const NavBar = () => {
  return (
    <nav className={navbar}>
      <Link className={navbar_link} to="/">
        Home
      </Link>
      <Link className={navbar_link} to="/blogs">
        Blogs
      </Link>
    </nav>
  );
};

export default NavBar;
