import React from 'react';
import Joke from './Joke';
import Axios from 'axios';

class JokeGenerator extends React.Component {

  state = {
    joke: null,
    loading: false,
  };

  loadJoke = async () => {
    this.setState({ loading: true });
    const { data: { value: { joke } } } = await Axios.get('https://api.icndb.com/jokes/random');
    this.setState({
      loading: false,
      joke: joke.replace(/&quot;/g, '"'),
    });
  }

  render() {
    const { joke, loading } = this.state;

    return (
      <React.Fragment>
        {!joke && !loading && <div>You haven't loaded any joke yet!</div>}
        {loading && <div>Loading...</div>}
        {joke && !loading && <Joke text={joke} />}

        <button data-testid="joke-button" onClick={this.loadJoke} type="button">
          Load a random joke
        </button>
      </React.Fragment>
    )
  }
}

export default JokeGenerator