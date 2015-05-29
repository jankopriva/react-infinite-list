/** @jsx React.DOM */

var React = require('react');

var InfiniteListItem = React.createClass({
    render: function() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.item.title}</div>
        );
    }
});

var InfiniteList = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        };
    },

    onScroll: function() {
        this._calculateVisibleItems();
    },

    _calculateVisibleItems: function() {
        var scrolledPx = this.getDOMNode().scrollTop;

        var visibleStart = parseInt(scrolledPx / this.props.itemHeight);
        var visibleEnd = Math.min(visibleStart + this.props.numOfVisibleItems, this.props.items.length - 1);

        if (visibleStart !== this.state.renderedStart) {
            this.setState({
                renderedStart: visibleStart,
                renderedEnd: visibleEnd
            });
        }
    },

    componentWillReceiveProps: function(nextProps) {
        var itemsChanged = this.props.items.length !== nextProps.items.length,
            visibleItemsChanged = this.props.numOfVisibleItems !== nextProps.numOfVisibleItems;

        // scroll to the top when searching
        if (itemsChanged) {
            this.getDOMNode().scrollTop = 0;
        }

        if (itemsChanged || visibleItemsChanged) {
            this._calculateVisibleItems();
        }
    },

    _getListItemClass: function(item, height) {
        if (this.props.listItemClass) {
            return <this.props.listItemClass item={item} height={height}/>;
        }

        return <InfiniteListItem item={item} height={height}/>;
    },

    render: function() {
        var itemsToRender = {};

        itemsToRender['top'] = (<div className="topitem"
            style={{height: this.state.renderedStart * this.props.itemHeight}} />);

        for (var i = this.state.renderedStart; i <= this.state.renderedEnd; i++) {
            var item = this.props.items[i];
            itemsToRender['item ' + i] = this._getListItemClass(item,
                this.props.itemHeight);
        }

        return (
            <div className="infinite-list" onScroll={this.onScroll}
                style={{height: this.props.itemHeight * this.props.numOfVisibleItems}}>
                <div className="infinite-list-content"
                    style={{height: this.props.items.length * this.props.itemHeight}}>
                    {itemsToRender}
                </div>
            </div>
        );
    }
});

module.exports = InfiniteList;
