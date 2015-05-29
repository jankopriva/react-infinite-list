import React from 'react';

class InfiniteListItem extends React.Component {
    render() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.title}</div>
        );
    }
}

InfiniteListItem.propTypes = {
    height: React.PropTypes.number.isRequired,
    title:  React.PropTypes.string.isRequired
};

export default class InfiniteList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { renderedStart: 0 };
    }

    onScroll() {
        this._calculateVisibleItems();
    }

    _calculateVisibleItems() {
        var scrolledPx = React.findDOMNode(this).scrollTop;

        var visibleStart = parseInt(scrolledPx / this.props.itemHeight);

        if (visibleStart !== this.state.renderedStart) {
            this.setState({ renderedStart: visibleStart });
        }
    }

    componentWillReceiveProps(nextProps) {
        var itemsChanged = this.props.items.length !== nextProps.items.length,
            visibleItemsChanged = this.props.numOfVisibleItems !== nextProps.numOfVisibleItems;

        // scroll to the top when searching
        if (itemsChanged) {
            React.findDOMNode(this).scrollTop = 0;
        }

        if (itemsChanged || visibleItemsChanged) {
            this._calculateVisibleItems();
        }
    }

    _getItemComponent(item) {
        var ListItemComponent = this.props.listItemClass || InfiniteListItem;
        return <ListItemComponent key={item.id} {...item} height={this.props.itemHeight} />;
    }

    render() {
        var { renderedStart } = this.state,
            { items, itemHeight, numOfVisibleItems } = this.props,
            paddingHeight = renderedStart * itemHeight,
            visibleHeight = numOfVisibleItems * itemHeight,
            listHeight = items.length * itemHeight;

        var visibleItems = items.slice(renderedStart, renderedStart + numOfVisibleItems);
        var listItems = visibleItems.map(this._getItemComponent, this);

        return (
            <div className="infinite-list" onScroll={this.onScroll.bind(this)} style={{height: visibleHeight}}>
                <div className="infinite-list-content" style={{height: listHeight}}>
                    <div className="topitem" style={{ height: paddingHeight }} key="top" />
                    {listItems}
                </div>
            </div>
        );
    }
}

InfiniteList.propTypes = {
    items: React.PropTypes.array.isRequired,
    itemHeight: React.PropTypes.number.isRequired,
    numOfVisibleItems: React.PropTypes.number.isRequired,
    listItemClass: React.PropTypes.element
};
