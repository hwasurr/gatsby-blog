import React, { useState } from 'react';

export interface TagFilterProps {
  posts: any;
  handleSelectedTag: () => void;
}
export default function TagFilter({
  posts,
  handleSelectedTag
}): JSX.Element {
  const SCROLL_SPEED = 2;

  function getAllTags(): string[] {
    const allTags = ['전체'];
    posts.forEach(({ node }) => {
      const { tags } = node.frontmatter;

      tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  }

  const [active, setActive] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();
  const [scrollLeft, setScrollLeft] = useState<number>();

  if (posts.length > 0) {
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
          const walk = (x - startX) * SCROLL_SPEED; // scroll-fast
          e.currentTarget.scrollLeft = scrollLeft - walk;
        }}
      >
        {getAllTags().map((tag) => (
          <button
            className="category-tag"
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
}
