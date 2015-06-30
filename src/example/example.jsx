import React from 'react';
var InfiniteList = require('../InfiniteList.jsx');

require('./styles/app.scss');

var items = [];
for (var i = 0; i < 500; i++) {
    items.push({
        id: i,
        title: 'item #' + i
    });
}

const InfiniteListItem = class extends React.Component {
    render() {
        return (
            <div className="infinite-list-item">{this.props.title}</div>
        );
    }
};

React.render(
    <InfiniteList
        className="custom-list-class"
        items={items}
        height={150}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
    document.getElementById('app')
);
