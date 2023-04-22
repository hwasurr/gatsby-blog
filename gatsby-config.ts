module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "Hwasurr's Devlog",
    author: {
      name: 'hwasurr',
      summary:
        'Typescript, Web Fullstack, Aws, CI/CD, DevOps 등에 관심이 많습니다.🚴‍♀️',
    },
    description: '항상 어제보다 더 나은 내가 되기 위해 노력합니다.',
    siteUrl: 'https://hwasurr.io/',
    social: {
      github: 'hwasurr',
      gmail: 'iamsupermazinga@gmail.com',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-137390145-2',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            // eslint-disable-next-line max-len
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.nodes.map((node) => ({
              ...node.frontmatter,
              description: node.excerpt,
              date: node.frontmatter.date,
              url: site.siteMetadata.siteUrl + node.fields.slug,
              guid: site.siteMetadata.siteUrl + node.fields.slug,
              custom_elements: [{ 'content:encoded': node.html }],
            })),
            query: `
              {
                allMarkdownRemark(sort:{ frontmatter: { date: DESC } }) {
                  nodes {
                    excerpt
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
            // optional configuration to specify external rss feed, such as feedburner
            link: 'https://feeds.feedburner.com/gatsby/blog',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Hwasurr's Devlog",
        short_name: 'hwasurr',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'content/assets/favicon/favicon-32x32.png',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-sitemap', // 사이트맵
  ],
};
