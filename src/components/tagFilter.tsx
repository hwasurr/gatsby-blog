/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';

export interface TagFilterProps {
  posts: Queries.BlogIndexQuery['allMarkdownRemark']['edges'];
  selectedTag: string;
  handleSelectedTag: (tagname: string) => void;
}
export default function TagFilter({
  posts,
  selectedTag,
  handleSelectedTag
}: TagFilterProps): JSX.Element | null {
  const SCROLL_SPEED = 2;

  function getAllTags(): string[] {
    const allTags = ['전체'];
    posts.forEach(({ node }) => {
      const { tags } = node.frontmatter!;

      tags?.forEach((tag) => {
        if (tag && !allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  }

  const [active, setActive] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();
  const [scrollLeft, setScrollLeft] = useState<number>();

  if (posts.length <= 0) return null;
  return (
    <div
      role="listbox"
      tabIndex={0}
      style={{
        backgroundColor: 'inherit',
        outline: 'none',
        overflowY: 'hidden',
        overflowX: 'scroll',
        userSelect: 'none',
        cursor: active ? 'grabbing' : 'pointer',
        display: 'block',
        whiteSpace: 'nowrap',
        padding: 8,
        // marginRight: '-24px',
      }}
      onMouseDown={(e): void => {
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
        setActive(true);
      }}
      onMouseUp={(e): void => { setActive(false); }}
      onMouseLeave={(e): void => { setActive(false); }}
      onMouseMove={(e): void => {
        e.preventDefault();
        if (!active) return;
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - (startX || 0)) * SCROLL_SPEED; // scroll-fast
        e.currentTarget.scrollLeft = scrollLeft || 0 - walk;
      }}
    >
      {getAllTags().map((tag) => (
        <button
          className={selectedTag === tag ? 'category-tag active' : 'category-tag'}
          type="button"
          key={tag}
          style={{ fontSize: 12 }}
          onClick={(): void => handleSelectedTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
