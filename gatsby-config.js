module.exports = {
  siteMetadata: {
    title: "Hwasurr's Devlog",
    author: {
      name: 'Dan(강 화수)',
      summary: '부산에서 개발하고 있습니다. 항상 어제보다 더 나은 내가 되기 위해 노력합니다.',
    },
    description: '항상 어제보다 더 나은 내가 되기 위해 노력합니다.',
    siteUrl: 'http://localhost:8000/',
    social: {
      github: 'hwasurr',
    },
  },
  plugins: [
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
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Hwasurr's Devlog",
        short_name: 'hwasurr',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/starship.png',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-typescript'
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'hwasurr'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
