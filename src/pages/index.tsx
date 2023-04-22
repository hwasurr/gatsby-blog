/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { graphql, Link, PageProps } from 'gatsby';
import React, { useState } from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagFilter from '../components/tagFilter';
import TimeToReadText from '../components/timeToRead';
import ToggleButton from '../components/toggleButton';
import '../styles/animate.css';
// css
import '../styles/global.css';
import { rhythm } from '../utils/typography';

function BlogIndex({ data, location }: PageProps<Queries.BlogIndexQuery>): JSX.Element {
  const siteTitle = data.site!.siteMetadata.title;
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
      <TagFilter
        selectedTag={selectedTag}
        posts={posts}
        handleSelectedTag={handleSelectedTag}
      />
      {posts
        .filter(({ node }) => {
          if (selectedTag === '전체') return true;
          return node.frontmatter?.tags?.includes(selectedTag);
        })
        .map(({ node }) => {
          const title = node.frontmatter?.title || node.fields?.slug;
          return (
            <article key={node.fields?.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={node.fields!.slug!}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {(node.frontmatter!.tags! as Array<string>).sort().map((tag: string) => (
                    <span className="category-tag" key={title + tag}>
                      {tag}
                    </span>
                  ))}
                </small>
                <br />
                <small>
                  {node.frontmatter?.date}
                  {' '}
                  •
                  {' '}
                  <TimeToReadText timeToRead={node.timeToRead} />
                </small>
              </header>
              <section>
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter?.description || node.excerpt!,
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

export const pageQuery = graphql`query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {title: {ne: "about-me"}}}
      sort: {frontmatter: {date: DESC}}
    ) {
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
