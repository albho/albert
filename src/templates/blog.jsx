import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

// Components
import CodeBlock from '../components/code_block';

// Demos
import NotificationFactory from '../components/demos/notification_factory';
import StateSingleton from '../components/demos/state_singleton';

// Stylesheets
import './blog.scss';

const shortcodes = {
  Link,
  pre: props => CodeBlock(props),
  NotificationFactory,
  StateSingleton,
};

const PageTemplate = ({ data, children }) => {
  return (
    <div className="blog-template">
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </div>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export default PageTemplate;
