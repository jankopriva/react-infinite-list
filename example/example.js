/** @jsx React.DOM */

var React = require('react');
var InfiniteList = require('react-infinite-list');

var items = [];
for (var i = 0; i < 50; i++) {
    items.push({
        title: 'item #' + i
    });
}

var InfiniteListItem = React.createClass({
    render: function() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.item.title}</div>
        );
    }
});

React.render(
    <InfiniteList
        items={items}
        numOfVisibleItems={5}
        itemHeight={20}
        listItemClass={InfiniteListItem}
    />,
    document.getElementById('infinite-list')
);