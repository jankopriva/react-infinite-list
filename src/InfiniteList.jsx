import {
    findDOMNode,
    PropTypes,
    Component
} from 'react';
import classnames from 'classnames';
import InfiniteListItem from './InfiniteListItem';

var isWebkit = /WebKit/.test(navigator && navigator.userAgent || '');

function isHighDensity() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}

export default class InfiniteList extends Component {
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
        var scrolledPx = findDOMNode(this).scrollTop;

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
            findDOMNode(this).scrollTop = 0;
        }

        if (itemsChanged || heightChanged) {
            this._calculateVisibleItems();
        }
    }

    _getItemComponent(item) {
        var ListItemComponent = this.props.listItemClass || InfiniteListItem;
        return <ListItemComponent key={item.id} {...item} />;
    }

    _getClassNames() {
        return classnames(
            'infinite-list',
            this.props.className
        );
    }

    render() {
        var { renderedStart } = this.state,
            { items, height, itemHeight } = this.props,
            // the number one guarantees there is never empty space at the end of the list
            numOfVisibleItems = Math.ceil(height / itemHeight) + 1,
            totalHeight = items.length * itemHeight;

        var visibleItems = items.slice(renderedStart, renderedStart + numOfVisibleItems);
        var listItems = visibleItems.map(this._getItemComponent, this);

        var padding = this.state.renderedStart * itemHeight;
        var maxPadding = totalHeight - (numOfVisibleItems * itemHeight) + itemHeight;
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
    items: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired
};
