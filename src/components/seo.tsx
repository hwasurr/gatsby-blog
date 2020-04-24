/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  title: string;
}
export default function SEO({
  lang = 'ko',
  meta = [],
  description = '',
  title
}: SEOProps): JSX.Element {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              github
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'github:card',
          content: 'summary',
        },
        {
          name: 'github:creator',
          content: site.siteMetadata.social.github,
        },
        {
          name: 'github:title',
          content: title,
        },
        {
          name: 'github:description',
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}
