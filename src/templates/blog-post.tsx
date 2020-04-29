import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = ({ data, pageContext, location }): JSX.Element => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  // const disqus_developer = 1;
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
    identifier: post.frontmatter.title,
    title: post.frontmatter.title,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
            {' '}
            •
            {data.markdownRemark.timeToRead > 25 ? (
              <span>
                {new Array(Math.ceil((
                  data.markdownRemark.timeToRead - 25) / 5)).fill(0).map((i) => (
                    <span role="img" key={i} aria-label="readtime-coffee">🍕</span>
                ))}
              </span>
            ) : (
              <span>
                {new Array(Math.ceil(data.markdownRemark.timeToRead / 5)).fill(0).map((i) => (
                  <span role="img" key={i} aria-label="readtime-coffee">☕️</span>
                ))}
              </span>
            )}
            {' '}
            {data.markdownRemark.timeToRead}
            {' '}
            min read
          </p>
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev" className="navigation-link">
                ←
                {' '}
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next" className="navigation-link">
                {next.frontmatter.title}
                {' '}
                →
              </Link>
            )}
          </li>
        </ul>
      </nav>

    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      tableOfContents
      timeToRead
    }
  }
`;
