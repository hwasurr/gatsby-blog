import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { CreatePagesArgs, GatsbyNode } from 'gatsby';

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.tsx');
  const result = await graphql<any>(
    `query BlogPost {
        allMarkdownRemark(
          sort: { frontmatter: {date: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
            next {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
`
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post: any, index: any) => {
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous: post.previous,
        next: post.next,
      },
    });
  });
};

export const onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: relativeFilePath,
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }

    type SiteMetadata {
      title: String!
    }
  `);
};
