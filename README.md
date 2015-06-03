React Infinite List
===================
A component that displays large list of data efficiently. Reuses DOM elements during scrolling.
It uses different rendering approach than [https://github.com/Morhaus/react-list-view] or Ember ListView.
Instead of transposing the item rows, it just re-renders the component whenever the top or bottom
list item is scrolled out of the visible area.

Installation
------------
```sh
npm install react-infinite-list --save-dev
# or
bower install react-infinite-list --save-dev
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
and wait till webpack builds the bundel. Brower shall be opened on port 3000.
