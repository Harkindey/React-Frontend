var React = require('react');
var ReactDOM = require('react-dom');

require('./index.css');

//Component may have state
//Component may have lifecycle event
//Component WILL have UI

class App extends React.Component {
  render(){
    return(
      <div>
        Hello React Training
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
