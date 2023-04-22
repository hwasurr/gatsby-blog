import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

function NotFoundPage({ data, location }: PageProps<Queries.NotFoundPageQuery>): JSX.Element {
  const siteTitle = data.site!.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>슬퍼요..</h1>
      <p>요청하신 페이지를 찾지 못했어요!</p>
    </Layout>
  );
}

export default NotFoundPage;

export const pageQuery = graphql`query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
