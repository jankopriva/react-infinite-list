React Infinite List
===================
A component that displays large list of data efficiently. Reuses DOM elements during scrolling.
It uses different rendering approach than [https://github.com/Morhaus/react-list-view] or Ember ListView.
Instead of transposing the item rows, it just re-renders the component whenever the top or bottom
list item is scrolled out of the visible area.

Installation
------------
```sh
npm install react-infinite-list --save
# or
bower install react-infinite-list --save
```

Usage
-----

```js
 <InfiniteList
        items={items}
        height={100}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
```

`items`, `height` and `itemHeight` are mandatory.

`listItemClass` is optional. Rather, it serves for default list item view overriding.

Infinite List supports paging as well. Just set `paging={true}` when using
the component. When particular list item has no data instance of default
`loadingListItemClass` will be rendered. You can pass your own class using
`loadingListItemClass` property.

By default, list item is being loaded when title property of item model is not defined.
If you are using different rules, you need to define your own helper that can
distinguish item being loaded from loaded one. Pass the helper in `isItemLoading` property.

In `firstVisibleItemIndex`, you can specify which index rendering can start from.
Default is 0.

There are also some mandatory css rules:
```css
    .infinite-list {
        overflow: auto;
        position: relative;
    }

    .infinite-list-content {
        margin: 0;
        position: absolute;
    }
```

Example
-------
Clone this repo and run `npm i`. After the dependencies are installed, just issue:
```
npm start
```
and wait till webpack builds the bundle. Browser shall be opened on port 3000.


Build
-------
```
npm run web-build
```
