require('./styles/app');

import Button from './components/button';

React.render(
    <Button value="Hello world" />,
    document.body
);

if (DEBUG) {
    console.log('dev');
} else {
    console.log('production')
}