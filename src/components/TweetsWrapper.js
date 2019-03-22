import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import TweetFormat from "./TweetFormat";

export default function TweetsWrapper({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage
}) {
  const itemsCount = hasNextPage ? items.length + 1 : items.length;
  console.log(itemsCount);
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = index => !hasNextPage || index < items.length;
  const Item = ({ index, style }) => {
    let content;
    console.log(style);
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index];

      return <TweetFormat style={style} status={content} />;
    }
    return <div style={style}>{content}</div>;
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemsCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={400}
          itemCount={itemsCount}
          itemSize={200}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}
