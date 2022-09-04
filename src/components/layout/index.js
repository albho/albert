import React from 'react';
import { Helmet } from 'react-helmet';

// Layout components
import NavBar from './navbar';

// Stylesheets
import * as styles from './index.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
