import { graphql, Link } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ToggleButton from '../components/toggleButton';
import Utterances from '../components/utterances';
import { rhythm, scale } from '../utils/typography';

function BlogPostTemplate({ data, pageContext, location }): JSX.Element {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <ToggleButton />
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        {post.frontmatter.image && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              borderRadius: '16px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight: 300,
              backgroundImage: `url(${post.frontmatter.image.src})`,

            }}
            />
            <span style={{
              ...scale(-1 / 2),
              marginBottom: 0,
              fontStyle: 'italic',
            }}
            >
              {post.frontmatter.image.description}
              {' '}
              (Pictured by
              {' '}
              {post.frontmatter.image.author}
              )
            </span>

          </div>
        )}
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <small
            style={{
              display: 'block',
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            {post.frontmatter.tags.sort().map((tag: string) => (
              <span
                className="category-tag"
                key={post.frontmatter.title + tag}
              >
                {tag}
              </span>
            ))}
          </small>
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
            {' '}
            {data.markdownRemark.timeToRead > 25 ? (
              <span>
                {new Array(Math.ceil((
                  data.markdownRemark.timeToRead - 25) / 5)).fill(0).map((i, idx) => (
                    <span role="img" key={`${i}${idx}`} aria-label="readtime-coffee">🍕</span>
                ))}
              </span>
            ) : (
              <span>
                {new Array(Math.ceil(data.markdownRemark.timeToRead / 5)).fill(0).map((i, idx) => (
                  <span role="img" key={`${i}${idx}`} aria-label="readtime-coffee">☕️</span>
                ))}
              </span>
            )}
            {' 읽는 데 '}
            {data.markdownRemark.timeToRead}
            {' 분 '}
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

      <nav style={{ marginTop: 8 }}>
        <ul
          style={{
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
            listStyle: 'none',
          }}
        >
          <li className="navigation-link-wrapper">
            {previous && (
              <Link to={previous.fields.slug} rel="prev" className="navigation-link">
                ←
                {' '}
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="navigation-link-wrapper">
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

      <Utterances repo="hwasurr/hwasurr.io" />

    </Layout>
  );
}

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
        date(formatString: "YYYY. MM. DD")
        description
        tags
        image {
          src
          author
          description
        }
      }
      tableOfContents
      timeToRead
    }
  }
`;
