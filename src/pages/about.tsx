/* eslint-disable react/no-danger */
import { graphql } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import ToggleButton from '../components/toggleButton';

export default function About({ data, location, lang = 'ko' }): JSX.Element {
  const siteTitle = data.site.siteMetadata.title;
  const aboutMeList = data.allMarkdownRemark.edges;

  const _aboutme = aboutMeList.find(({ node }) => node.frontmatter.lang === lang);
  const aboutme = _aboutme.node;

  return (
    <Layout location={location} title={siteTitle}>
      <ToggleButton />
      <Bio />

      <div style={{ textAlign: 'right' }}>
        <span>
          최근 수정일:
          {' '}
          {aboutme.frontmatter.date}
        </span>
      </div>
      <section dangerouslySetInnerHTML={{ __html: aboutme.html }} />

    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: {title: {eq: "about-me"} } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "YYYY. MM. DD")
            lang
          }
        }
      }
    }
  }
`;
