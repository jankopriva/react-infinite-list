import {
    PropTypes,
    Component
} from 'react';

export default class InfiniteListItem extends Component {
    render() {
        return (
            <div key={this.props.id} className="infinite-list-item">
                {this.props.title}
            </div>
        );
    }
}

InfiniteListItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired
};
