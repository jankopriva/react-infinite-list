React Infinite List
==============

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
        numOfVisibleItems={5}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
```

`items`, `numOfVisibleItems` and `itemHeight` are mandatory. The latter two controls
the height of the component.

`listItemClass` is optional. Rather, it serves for default list item view overriding.

There are also some mandatory css rules:
```css
    .infinite-list {
        overflow: auto  ;
        position: relative;
    }

    .infinite-list-content {
        margin: 0;
        position: absolute;
    }
```

See [example.js](example/example.js) for more details.



