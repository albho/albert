import React from 'react';
import { Helmet } from 'react-helmet';

// Layout components
import NavBar from './navbar';

// Stylesheets
import { main_wrapper } from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/74850bafa2.js"
          crossOrigin="anonymous"
        ></script>
        <title>Albert's Website</title>
      </Helmet>
      <NavBar />
      <main className={main_wrapper}>{children}</main>
    </div>
  );
};

export default Layout;
