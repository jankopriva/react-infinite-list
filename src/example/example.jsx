import React from 'react/addons';
//import InfiniteList from '../../dist/InfiniteList';
var  InfiniteList = require('../../dist/InfiniteList.js');

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
        numOfVisibleItems={5}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
    document.getElementById('app')
);

