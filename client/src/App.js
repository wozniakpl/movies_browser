import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./movieCard";

function getApiHost() {
  if (process.env.REACT_APP_BACKEND_HOST !== undefined) {
    return "http://" + process.env.REACT_APP_BACKEND_HOST;
  }
  return "http://localhost:8000";
}

function makeUrl(path) {
  return getApiHost() + path;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  renderItems = () => {
    const items = this.state.movies ? this.state.movies : [];
    return items.map((item) => (
      <li
        key={item.imdbID}
        className="list-group-item justify-content-between align-items-center"
      >
        <span className={`mr-2`} title={item.description}>
          <MovieCard movie={item} />
        </span>
      </li>
    ));
  };

  onSearchTitle = () => {
    let txt = document.getElementById("exact-search").value;
    axios
      .get(makeUrl("/api/search/title/" + txt))
      .then((response) => {
        this.setState({
          movies: [response.data],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSearchPattern = () => {
    let txt = document.getElementById("pattern-search").value;
    let pageNumber = 1
    axios
      .get(makeUrl("/api/search/pattern/" + txt + "/" + pageNumber))
      .then((response) => {
        this.setState({
          movies: response.data.Search,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let belowSearchBar;
    if (this.state.movies.length > 0) {
      belowSearchBar = (
        <div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
          <div>
            TODO: pagination
          </div>
        </div>
      );
    } else {
      belowSearchBar = <p>nothing to show</p>;
    }

    let searchTitle = (
      <div>
        <input
          type="text"
          id="exact-search"
          placeholder="Search exact title"
          defaultValue={process.env.NODE_ENV === "production" ? "" : "purge"}
        ></input>
        <button onClick={this.onSearchTitle}>Exact search</button>
      </div>
    );

    let searchPattern = (
      <div>
        <input
          type="text"
          placeholder="Search pattern"
          id="pattern-search"
          defaultValue={process.env.NODE_ENV === "production" ? "" : "potter"}
        ></input>
        <button onClick={this.onSearchPattern}>Pattern search</button>
      </div>
    );

    let searchBar = (
      <div>
        {searchTitle}
        {searchPattern}
      </div>
    );

    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Movies browser
        </h1>
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <center>
                  {searchBar}
                  <br />
                  {belowSearchBar}
                </center>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
