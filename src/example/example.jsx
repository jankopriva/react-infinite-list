import React from 'react';
import InfiniteList from '../InfiniteList';
import _ from 'lodash';

import './styles/app.scss';

const PAGE_SIZE = 20;
const TOTAL_COUNT = 1000;

const items = _.times(TOTAL_COUNT, (id) => ({ id }));

_.take(items, PAGE_SIZE).forEach((item, index) => {
    item.title = `item #${index}`;
});

const isItemEmpty = (item) => _.isEmpty(item.title);

function isFetchNeeded(start, end) {
   return _.any(items.slice(start, end), isItemEmpty);
}

function getPage(end) {
    return parseInt(end / PAGE_SIZE, 10);
}

let loadedPages = {};
function isPageLoaded(page) {
    if (!loadedPages[page]) {
        loadedPages[page] = true;

        return false;
    }

    return true;
}

function fetchData(start, end) {
    return new Promise((resolve, reject) => {
        if (!isFetchNeeded(start, end)) {
            return reject('No new data needed');
        }

        const page = getPage(end);

        if (isPageLoaded(page)) {
            return reject(`Page ${page} already loaded.`);
        }

        setTimeout(() => {
            const startIndex = page * PAGE_SIZE;
            const endIndex = Math.min(startIndex + PAGE_SIZE, items.length);

            for (let i = startIndex; i < endIndex; i++) {
                items[i] = {
                    id: i,
                    title: 'item #' + i
                };
            }

            resolve(items);
        }, 100);
    });
}


class InfiniteListExample extends React.Component {
    constructor(props) {
        this.state = {items: props.items};
    }

    onRangeChange(start, end) {
        fetchData(start, end)
            .then((items) => this.setState({ items }))
            .catch((message) => console.log(message));
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
