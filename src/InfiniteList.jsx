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

        var visibleStart = Math.floor(scrolledPx / this.props.itemHeight);

        if (visibleStart !== this.state.renderedStart) {
            this.setState({ renderedStart: visibleStart });
        }
    }

    componentWillReceiveProps(nextProps) {
        var itemsChanged  = this.props.items.length !== nextProps.items.length,
            heightChanged = this.props.height !== nextProps.height;

        // scroll to the top when searching
        if (itemsChanged) {
            React.findDOMNode(this).scrollTop = 0;
        }

        if (itemsChanged || heightChanged) {
            this._calculateVisibleItems();
        }
    }

    _getItemComponent(item) {
        var ListItemComponent = this.props.listItemClass || InfiniteListItem;
        return <ListItemComponent key={item.id} {...item} height={this.props.itemHeight} />;
    }

    render() {
        var { renderedStart } = this.state,
            { items, height, itemHeight } = this.props,
            // the number one guarantees there is never empty space at the end of the list
            numOfVisibleItems = Math.ceil(height / itemHeight) + 1,
            paddingHeight = renderedStart * itemHeight,
            totalHeight = items.length * itemHeight;

        var visibleItems = items.slice(renderedStart, renderedStart + numOfVisibleItems);
        var listItems = visibleItems.map(this._getItemComponent, this);

        return (
            <div className="infinite-list" onScroll={this.onScroll.bind(this)} style={{height: this.props.height}}>
                <div className="infinite-list-content" style={{height: totalHeight}}>
                    <div className="topitem" style={{ height: paddingHeight }} key="top" />
                    {listItems}
                </div>
            </div>
        );
    }
}

InfiniteList.propTypes = {
    items: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    itemHeight: React.PropTypes.number.isRequired
};
