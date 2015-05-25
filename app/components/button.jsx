export default React.createClass({
    render: function() {
        return (
            <button>
                {this.props.value}
            </button>
        );
    }
})