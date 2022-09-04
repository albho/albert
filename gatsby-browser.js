import React from 'react';

import Layout from './src/components/layout';

import './styles/main.scss';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
