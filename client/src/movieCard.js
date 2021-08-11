import { Component } from "react";

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie,
    };
  }

  render() {
    console.log(this.state.movie);
    if (this.state.movie === {}) {
      return <div></div>;
    }
    let movie = this.state.movie;
    return (
      <div id="card_container">
        <div id="card">
          <div className="text-block">
            <h2>
              {movie.Title} <small>({movie.Year})</small>
            </h2>
            <h3>{movie.Genre}</h3>
            <p>{movie.Plot}</p>
            {/* TODO <button>Add to favorites</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
