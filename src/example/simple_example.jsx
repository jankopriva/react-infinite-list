import React from 'react';
import InfiniteList from '../InfiniteList';
import InfiniteListPagingExample from './example_paging';

const TOTAL_COUNT = 500;

var items = [];
for (var i = 0; i < TOTAL_COUNT; i++) {
    items.push({
        id: i,
        title: 'item #' + i
    });
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

export default class InfiniteListExample extends React.Component {
    render() {
        return (
            <InfiniteList
                className="custom-list-class"
                items={items}
                itemsCount={TOTAL_COUNT}
                height={150}
                itemHeight={20}
                listItemClass={InfiniteListItem}
            />
        );
    }
}
