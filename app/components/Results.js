var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');


function Profile(props) {
  var info = props.info;

  return(
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
    <ul className='space-list-items'>
      {info.name && <li>{info.name}</li>}
      {info.location && <li>{info.location}</li>}
      {info.company && <li>{info.company}</li>}
      <li>Followers: {info.followers}</li>
      <li>Following: {info.following}</li>
      <li>Public Repos: {info.public_repos}</li>
      {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
    </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return(
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}



class Results extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      results: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results){
      if(results === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was error. Check that both users exist on Github',
            loading: false
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          results: results,
          loading: false
        }
      });
    }.bind(this));
  }

  getResultText(currentPlayer, otherPlayer) {
    return currentPlayer.score > otherPlayer.score ?
      'Winner' : currentPlayer.score === otherPlayer.score ?
        'Draw' : 'Loser'
  }

  render() {
    var error = this.state.error;
    var results = this.state.results;
    var loading = this.state.loading;

    if (loading === true) {
      return <Loading />
    }

    if (!error && (results === null || results.length !== 2)) {
      error = 'Unexpected API response. Please try again.';
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return(
      <div className='row'>
        <Player
          label={this.getResultText(results[0], results[1])}
          score={results[0].score}
          profile={results[0].profile}
        />

        <Player
          label={this.getResultText(results[1], results[0])}
          score={results[1].score}
          profile={results[1].profile}
        />
      </div>
    )
  }
}

module.exports = Results;

//sadesanyairubas
