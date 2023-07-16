import itemsData from "./items";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";

export type ItemData = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
  isBookmarked: boolean;
};

// Items visible in Home page
const allItemsData = new BehaviorSubject<ItemData[]>([]);

// Items user has bookmarked, displayed in Watchlist
const bookmarkedItems = new BehaviorSubject<ItemData[]>([]);

// Home page items observable
export const homePageData$ = () => {
  return allItemsData.asObservable().pipe(distinctUntilChanged());
};

// Watchlist items observable
export const watchlistData$ = () => {
  return bookmarkedItems.asObservable().pipe(distinctUntilChanged());
};

const allItems = itemsData.map((item) => {
  // Add 'isBookmarked' prop to data
  const items: ItemData = { ...item, isBookmarked: false };

  watchlistData$().subscribe((bookmarks) => {
    bookmarks.forEach((item) => {
      if (items.title === item.title) {
        items.isBookmarked = true;
      }
    });
  });

  return items;
});

// Update Home page items when bookmarks change
allItemsData.next(allItems);

export const updateHomeData = (items: ItemData[]) => {
  allItemsData.next(items);
};

export const updateWatchlistData = (item: ItemData) => {
  let bookmarks: ItemData[] = [];

  const getBookmarkedItems = watchlistData$().subscribe((items) => {
    bookmarks = items;
  });

  // Find bookmarked item to remove
  const bookmarkToRemove = bookmarks.filter((selectedBoomark) => {
    return selectedBoomark.title === item.title;
  });

  // Remove selected bookmark
  if (bookmarkToRemove.length > 0) {
    const updatedWatchList = bookmarks.filter((toRemove) => {
      return toRemove.title !== item.title;
    });

    bookmarkedItems.next(updatedWatchList);
  } else {
    bookmarkedItems.next([...bookmarks, item]);
  }

  getBookmarkedItems.unsubscribe();
};
