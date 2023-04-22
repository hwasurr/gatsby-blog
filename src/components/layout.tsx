import { Link, PageProps } from 'gatsby';
import React, { PropsWithChildren } from 'react';
import { rhythm, scale } from '../utils/typography';

interface LayoutProps extends PropsWithChildren {
  title: string
  location: PageProps['location']
}
function Layout({ location, title, children }: LayoutProps) {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          className="title"
          style={{ boxShadow: 'none', }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{ fontFamily: 'Montserrat, sans-serif', marginTop: 0, }}
      >
        <Link
          className="title"
          style={{ boxShadow: 'none', }}
          to="/"
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer style={{ float: 'right' }}>
        <small>
          ©
          {' '}
          {`${2020}-`}
          {new Date().getFullYear()}
          , Built with
          {' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </small>
      </footer>
    </div>
  );
}

export default Layout;
