/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(1 / 2),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 75,
          minHeight: 75,
          borderRadius: '100%',
        }}
        imgStyle={{
          borderRadius: '50%',
        }}
      />
      <div>
        <p style={{ margin: '0px 0px 8px' }}>
          Written by
          {' '}
          <strong>
            {author.name}
            <span
              role="img"
              aria-label="name-thumb"
              style={{ display: 'inline-block' }}
              className="animated bounce infinite slower"
            >
              👍🏻
            </span>
          </strong>
          <br />
          {author.summary}
        </p>

        <div style={{ display: 'flex' }}>
          {social.github && (
          <a className="social" href={`https://github.com/${social.github}`}>
            Github
          </a>
          )}
        </div>
      </div>

    </div>
  );
};

export default Bio;
