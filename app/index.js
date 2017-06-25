var React = require('react');
var ReactDOM = require('react-dom');

require('./index.css');
var App = require('./components/App');

//Component may have state
//Component may have lifecycle event
//Component WILL have UI


ReactDOM.render(<App />,document.getElementById('app'));
