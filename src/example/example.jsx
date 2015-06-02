import React from 'react';
var InfiniteList = require('../InfiniteList.jsx');

require('./styles/app.scss');

var items = [];
for (var i = 0; i < 50; i++) {
    items.push({
        id: i,
        title: 'item #' + i
    });
}

const InfiniteListItem = class extends React.Component {
    render() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.title}</div>
        );
    }
};

React.render(
    <InfiniteList
        items={items}
        height={100}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
    document.getElementById('app')
);

