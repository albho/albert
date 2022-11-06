import React from 'react';
import { graphql, Link } from 'gatsby';
import { useStaticQuery } from 'gatsby';

import {
  blog_post,
  header_container,
  text_light
} from '../../styles/pages/blogs.module.scss';

const Blog = () => {
  const data = useStaticQuery(graphql`
    query BlogsQuery {
      allMdx(sort: { order: ASC, fields: frontmatter___date }) {
        nodes {
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          body
        }
      }
    }
  `);

  const blogsList = data.allMdx.nodes.map(blog => {
    const { path, date, title, description } = blog.frontmatter;

    return (
      <Link key={title} className={blog_post} to={path}>
        <div className={header_container}>
          <h2>{title}</h2>
          <p className={text_light}>{date}</p>
        </div>
        <p className={text_light}>{description}</p>
      </Link>
    );
  });

  return (
    <div>
      <h1>Blog</h1>
      {blogsList}
    </div>
  );
};

export default Blog;
