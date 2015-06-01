import React from 'react/addons';

class InfiniteListItem extends React.Component {
    render() {
        return (
            <div className="infinite-list-item" style={{height: this.props.height}}>{this.props.title}</div>
        );
    }
}

export default class InfiniteList extends React.Component {
    onScroll() {
        var scrolledPx = React.findDOMNode(this).scrollTop;

        var visibleStart = parseInt(scrolledPx / this.props.itemHeight);
        var visibleEnd = Math.min(visibleStart + this.props.numOfVisibleItems, this.props.items.length - 1);

        if (visibleStart !== this.state.renderedStart) {
            this._showItems(visibleStart, visibleEnd);
        }
    }

    renderFromStart() {
        this.getDOMNode().scrollTop = 0;

        this.setState({
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        });
    }

    _showItems(visibleStart, visibleEnd) {
        this.setState({
            renderedStart: visibleStart,
            renderedEnd: visibleEnd
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            renderedStart: 0,
            renderedEnd: this.props.numOfVisibleItems
        };
    }

    _getListItemClass(item, height) {
        if (this.props.listItemClass) {
            return <this.props.listItemClass key={item.id} {...item} height={height}/>;
        }

        return <InfiniteListItem key={item.id} {...item} height={height}/>;
    }

    render() {
        let itemsToRender = {};

        itemsToRender['top'] = (<div className="topitem"
            style={{height: this.state.renderedStart * this.props.itemHeight}} />);

        for (var i = this.state.renderedStart; i <= this.state.renderedEnd; i++) {
            var item = this.props.items[i];
            itemsToRender['item ' + i] = this._getListItemClass(item,
                this.props.itemHeight);
        }

        return (
            <div className="infinite-list" onScroll={this.onScroll.bind(this)}
                style={{height: this.props.itemHeight * this.props.numOfVisibleItems}}>
                <div className="infinite-list-content"
                    style={{height: this.props.items.length * this.props.itemHeight}}>
                    {React.addons.createFragment(itemsToRender)}
                </div>
            </div>
        );
    }
}
