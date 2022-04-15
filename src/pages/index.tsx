import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagFilter from '../components/tagFilter';
import ToggleButton from '../components/toggleButton';
import '../styles/animate.css';
// css
import '../styles/global.css';
import { rhythm } from '../utils/typography';

function BlogIndex({ data, location }): JSX.Element {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const [selectedTag, setSelectedTag] = useState('전체');
  const handleSelectedTag = (tagname: string): void => {
    setSelectedTag(tagname);
  };

  return (
    <Layout location={location} title={siteTitle}>
      <ToggleButton />
      <SEO title="All posts" />
      <Bio />
      <TagFilter selectedTag={selectedTag} posts={posts} handleSelectedTag={handleSelectedTag} />
      {posts
        .filter(({ node }) => {
          if (selectedTag === '전체') return true;
          return node.frontmatter.tags.includes(selectedTag);
        })
        .map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {node.frontmatter.tags.sort().map((tag: string) => (
                    <span
                      className="category-tag"
                      key={title + tag}
                    >
                      {tag}
                    </span>
                  ))}
                </small>
                <br />
                <small>
                  {node.frontmatter.date}
                  {' '}
                  •
                  {' '}
                  {node.timeToRead > 25 ? (
                    <span>
                      {new Array(Math.ceil((node.timeToRead - 25) / 5)).fill('🍕').map((i, idx) => (
                        <span role="img" key={`${i}-${idx}`} aria-label="readtime-coffee">{i}</span>
                      ))}
                    </span>
                  ) : (
                    <span>
                      {new Array(Math.ceil(node.timeToRead / 5)).fill('☕️').map((i, idx) => (
                        <span role="img" key={`${i}-${idx}`} aria-label="readtime-coffee">{i}</span>
                      ))}
                    </span>
                  )}
                  {' 읽는 데 '}
                  {node.timeToRead}
                  {' 분'}
                </small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: {title: {ne: "about-me"} } }
      sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY. MM. DD")
            title
            description
            tags
          }
          timeToRead
        }
      }
    }
  }
`;
