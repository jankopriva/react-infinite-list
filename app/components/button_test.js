import React from 'react/addons';
var TestUtils = React.addons.TestUtils;

var Button = require('./button.jsx');

describe('Button', function() {
    it('should render passed value', function() {
        var button = TestUtils.renderIntoDocument(
            <Button value="custom value" />
        );

        var buttonElement = TestUtils.findRenderedDOMComponentWithTag(button, 'button');

        expect(buttonElement.getDOMNode().textContent).to.equal('custom value');
    });
});