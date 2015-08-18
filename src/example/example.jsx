import React from 'react';
import InfiniteList from '../InfiniteList';
import _ from 'lodash';

import './styles/app.scss';

const PAGE_SIZE = 20;
const TOTAL_COUNT = 10000;

const items = _.times(TOTAL_COUNT, (id) => ({ id }));

_.take(items, PAGE_SIZE).forEach((item, index) => {
    item.title = `item #${index}`;
});

const isItemEmpty = (item) => _.isEmpty(item.title);

function isFetchNeeded(start, end) {
   return _.any(items.slice(start, end), isItemEmpty);
}

// Page cache. We got first page loaded.
let loadedPages = {0: true};

function isPageLoaded(page) {
    if (!loadedPages[page]) {
        loadedPages[page] = true;

        return false;
    }

    return true;
}

function cachePage(page) {
    loadedPages[page] = true;
}

// We count pages from 0
function getPage(index) {
    return parseInt(index / PAGE_SIZE, 10);
}

function getPages(start, end) {
    const startIndexPage = getPage(start);
    const endIndexPage = getPage(end);

    return [startIndexPage, endIndexPage];
}

function getOffset(page) {
    return page * PAGE_SIZE;
}

function getCount(page) {
    // Pages are counted from 0
    const lastPage = parseInt(items.length / PAGE_SIZE, 10) - 1;
    const lastPageItemsCount = items.length % PAGE_SIZE;

    // Determine whether last page item count is lesser than PAGE_SIZE
    return (lastPage === page && lastPageItemsCount) ? lastPageItemsCount : PAGE_SIZE;
}

function setItems(offset, count) {
    for (let i = offset; i < offset + count; i++) {
        items[i].title = 'item #' + i;
    }
}

function fetchData(page) {
    const offset = getOffset(page);
    const count = getCount(page);

    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                page: page,
                items: setItems(offset, count)
            };

            resolve(response);
        }, 100);
    });
}

class InfiniteListExample extends React.Component {
    constructor(props) {
        this.state = {items: props.items};
    }

    onRangeChange(start, end) {
        let pages = _.uniq(getPages(start, end));

        const requests = pages
            .filter((page) => !isPageLoaded(page))
            .map((page) => fetchData(page));

        if (requests.length) {
            Promise.all(requests).then((responses) => {
                responses.forEach((response) => {
                    cachePage(response.page);
                });

                this.setState(items);
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
