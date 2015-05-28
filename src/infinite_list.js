/** @jsx React.DOM */

var React = require('react');

var InfiniteListItem = React.createClass({
    render: function() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.item.title}</div>
        );
    }
});

module.exports = React.createClass({
    onScroll: function() {
        var scrolledPx = this.getDOMNode().scrollTop;

        var visibleStart = parseInt(scrolledPx / this.props.itemHeight);
        var visibleEnd = Math.min(visibleStart + this.props.numOfVisibleItems, this.props.items.length - 1);

        if (visibleStart !== this.state.renderedStart) {
            this._showItems(visibleStart, visibleEnd);
        }
    },

    renderFromStart: function () {
        this.getDOMNode().scrollTop = 0;

        this.setState({
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        });
    },

    _showItems: function(visibleStart, visibleEnd) {
        this.setState({
            renderedStart: visibleStart,
            renderedEnd: visibleEnd
        });
    },

    getInitialState: function() {
        return {
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        };
    },

    _getListItemClass: function(item, height, key) {
        if (this.props.listItemClass) {
            return <this.props.listItemClass item={item} height={height} key={key}/>;
        }

        return <InfiniteListItem item={item} height={height} key={key}/>;
    },

    render: function() {
        var itemsToRender = [];

        itemsToRender.push(<div className="topitem"
            style={{height: this.state.renderedStart * this.props.itemHeight}} key="top" />);

        for (var i = this.state.renderedStart; i <= this.state.renderedEnd; i++) {
            var item = this.props.items[i];
            itemsToRender.push(this._getListItemClass(item,
                this.props.itemHeight, 'item ' + i));
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
