import React from 'react';

import classnames from 'classnames';

var isWebkit = /WebKit/.test(navigator && navigator.userAgent || '');

function isHighDensity() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}

class EmptyListItem extends React.Component {
    render() {
        return (
            <div key={this.props.id} className="infinite-list-item empty-item">
                Loading...
            </div>
        );
    }
}

class InfiniteListItem extends React.Component {
    render() {
        return (
            <div key={this.props.id} className="infinite-list-item">
                {this.props.title}
            </div>
        );
    }
}

InfiniteListItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]).isRequired
};

export default class InfiniteList extends React.Component {
    constructor(props) {
        super(props);

        this._scrollTimer = null;
        this.state = { renderedStart: 0 };
    }

    onWheel() {
        this._scrolledByWheel = true;
    }

    onScroll(e) {
        e.stopPropagation();

        // webkit when scrolling by wheel
        if (isWebkit && this._scrolledByWheel && !isHighDensity()) {
            this._scrolledByWheel = false;

            if (!this._scrollTimer) {
                this._scrollTimer = setTimeout(function() {
                    this._scrollTimer = null;
                    this._calculateVisibleItems();
                }.bind(this), 150);
            }

            return;
        }

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
        let ListItemComponent = this.props.listItemClass;
        if (this.props.isItemEmpty(item)) {
            ListItemComponent = this.props.emptyListItemClass;
        }

        return <ListItemComponent key={item.id} {...item} />;
    }

    _getClassNames() {
        return classnames(
            'infinite-list',
            this.props.className
        );
    }

    componentDidMount() {
        this.state.isInitialRender = false;

         var node = React.findDOMNode(this);
         setTimeout(() => {
            node.scrollTop = this.props.firstVisibleItemIndex * this.props.itemHeight;
         }, 0);
    }

    _notifyWhenDataIsNeeded(start, end) {
        const items = this.props.items;

        // Do not go over the end of the array
        if (end >= items.length ) end = items.length - 1;

        const isItemEmpty = this.props.isItemEmpty;

        if (_.any(items.slice(start, end + 1), isItemEmpty)) {
            this.props.onRangeChange(start, end);
        }
    }

    render() {
        var { renderedStart } = this.state,
            { items, height, itemHeight } = this.props,
            // the number one guarantees there is never empty space at the end of the list
            numOfVisibleItems = Math.ceil(height / itemHeight) + 1,
            totalHeight = items.length * itemHeight;

        var visibleItems = items.slice(renderedStart, renderedStart + numOfVisibleItems);
        var listItems = visibleItems.map(this._getItemComponent, this);

        const dataRangeEnd = Math.min(renderedStart + listItems.length, this.props.items.length);
        this.props.paging && this._notifyWhenDataIsNeeded(renderedStart, dataRangeEnd);

        var padding = this.state.renderedStart * itemHeight;
        // if maximum number of items on page is larger than actual number of items, maxPadding can be < 0
        var maxPadding = Math.max(0, totalHeight - (numOfVisibleItems * itemHeight) + itemHeight);
        var paddingTop = Math.min(maxPadding, padding);

        return (
            <div className={this._getClassNames()}
                 onWheel={this.onWheel.bind(this)}
                 onScroll={this.onScroll.bind(this)}
                 style={{height: this.props.height}}>

                <div className="infinite-list-content" style={{height: totalHeight - paddingTop, paddingTop: paddingTop}}>
                    {listItems}
                </div>
            </div>
        );
    }
}

InfiniteList.propTypes = {
    items: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
    itemHeight: React.PropTypes.number.isRequired,
    isItemEmpty: React.PropTypes.func,
    listItemClass: React.PropTypes.func,
    emptyListItemClass: React.PropTypes.func,
    firstVisibleItemIndex: React.PropTypes.number,
    paging: React.PropTypes.bool

};

InfiniteList.defaultProps = {
    firstVisibleItemIndex: 0,
    isItemEmpty: () => false,
    paging: false,
    listItemClass: InfiniteListItem,
    emptyListItemClass: EmptyListItem
};
