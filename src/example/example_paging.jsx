import React from 'react';
import InfiniteList from '../InfiniteList';
import _ from 'lodash';

const PAGE_SIZE = 20;
const TOTAL_COUNT = 10001;

const items = _.times(PAGE_SIZE, (i) => ({
    id: i,
    title: `item #${i}`
}));

const isItemLoading = (item) => !item;

function isFetchNeeded(start, end) {
   return _.some(items.slice(start, end), isItemLoading);
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
    const lastPage = parseInt(items.length / PAGE_SIZE, 10);
    const lastPageItemsCount = items.length % PAGE_SIZE;

    // Determine whether last page item count is lesser than PAGE_SIZE
    return (lastPage === page && lastPageItemsCount) ? lastPageItemsCount : PAGE_SIZE;
}

function createItems(offset, count) {
    let items = [];

    for (let i = 0; i < count; i++) {
        let number = offset + i;
        items.push({
            id: number,
            title: 'item #' + number
        });
    }

    return items;
}

function fetchData(page) {
    const offset = getOffset(page);
    const count = getCount(page);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                page: page,
                items: createItems(offset, count)
            };
            resolve(response);
        }, 100);
    });
}

class LoadingListItem extends React.Component {
    render() {
        return (
            <div key={this.props.id} className="infinite-list-item item-loading">
                Loading...
            </div>
        );
    }
}

function updateItems(newItems, start) {
    for (let i = 0; i < newItems.length; i++) {
        items[i + start] = newItems[i];
    }
}

export default class InfiniteListExample extends React.Component {
    constructor(props) {
        this.state = {items: items};
    }

    onRangeChange(start, end) {
        let pages = getPages(start, end);

        pages = _.uniq(pages);
        const requests = pages.map((page) => {
            if (!isPageLoaded(page)) {
                return fetchData(page)
            }

            return true;
        }).filter((request) => request !== true);

        if (requests.length) {
            Promise.all(requests).then((responses) => {
                responses.forEach((response) => {
                    cachePage(response.page);
                    updateItems(response.items, response.page * PAGE_SIZE);
                });

                this.setState({
                    items: items
                });
            });
        }
    }

    render() {
        return <InfiniteList
            className="custom-list-class"
            items={this.state.items}
            itemsCount={TOTAL_COUNT}
            height={150}
            itemHeight={20}
            onRangeChange={this.onRangeChange.bind(this)}
            paging={true}
            isItemLoading={isItemLoading}
            loadingListItemClass={LoadingListItem}
        />;
    }
}

