import React from 'react';
import InfiniteList from '../InfiniteList';
import _ from 'lodash';

require('./styles/app.scss');

const PAGE_SIZE = 20;
const TOTAT_COUNT = 1000;

var items = [];

for (var i = 0; i < 20; i++) {
    items.push({
        id: i,
        title: 'item #' + i
    });
}
for (var i = 20; i < 1000; i++) {
    items.push({id: i});
}

function isFetchNeeded(start, end) {
   return _.some(items.slice(start, end), isItemEmpty);
}

function calculatePage(end) {
    return parseInt(end / PAGE_SIZE, 10);
}

// TODO: calculate page
function fetchData(start, end, callback) {
    console.log('fetching: ', start ,end);
    let arr = [];

    return new Promise((resolve, reject) => {
        console.log('creating new promise for page #: ', calculatePage(end));

        setTimeout(() => {
            console.log('fetched for: ', start, end);
            const page = calculatePage(end);
            const startIndex = page * PAGE_SIZE;
            const endIndex = Math.min(startIndex + PAGE_SIZE, items.length);

            for (var i = startIndex; i < endIndex; i++) {
                items[i] = {
                    id: i,
                    title: 'item #' + i
                }
            }

            resolve({ page, items });
        }, 100);
    });
}


function isItemEmpty(item) {
    return !item.title;
}


let pageCache = {};
function isInPageCache(page) {
    if (!pageCache[page]) {
        pageCache[page] = true;

        return false;
    }

    return true;
}

class InfiniteListExample extends React.Component {
    constructor(props) {
        this.state = {items: props.items};
    }

    onRangeChange(start, end) {
        if (isFetchNeeded(start, end)) {
            fetchData(start, end).then((params) => {
                let { page, items } = params;

                if (!isInPageCache(page)) {
                    this.setState({ items });
                }
            });
        }
    }

    render() {
        return <InfiniteList
            className="custom-list-class"
            items={this.state.items}
            height={150}
            itemHeight={20}
            listItemClass={InfiniteListItem}
            onRangeChange={this.onRangeChange.bind(this)}
            firstVisibleItemIndex={0}
            isItemEmpty={isItemEmpty}
        />;
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

React.render(
    <InfiniteListExample items={items}/>,
    document.getElementById('app')
);
