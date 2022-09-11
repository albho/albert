import React from 'react';
import { graphql, Link } from 'gatsby';
import { useStaticQuery } from 'gatsby';

import { blog_post } from '/styles/pages/blogs.module.scss';

const Blogs = () => {
  const data = useStaticQuery(graphql`
    query BlogsQuery {
      allMdx {
        nodes {
          frontmatter {
            slug
            title
            description
          }
          body
        }
      }
    }
  `);

  const blogsList = data.allMdx.nodes.map(blog => {
    const { slug, title, description } = blog.frontmatter;

    return (
      <Link key={title} className={blog_post} to={slug}>
        <h1 className="text--md">{title}</h1>
        <p>{description}</p>
      </Link>
    );
  });

  return (
    <div>
      <h1>Blogs</h1>
      {blogsList}
    </div>
  );
};

export default Blogs;
