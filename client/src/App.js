import React, { Component } from "react";
import axios from "axios";

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

  displayCompleted = (status) => {};

  refresh = () => {
    var host = "http://localhost:8000";
    if (process.env.REACT_APP_BACKEND_HOST !== undefined) {
      host = "http://" + process.env.REACT_APP_BACKEND_HOST;
    }
    axios
      .get(host + "/api/movies/")
      .then((response) => {
        console.log("response", response);
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderItems = () => {
    const newItems = this.state.movies ? this.state.movies : [];

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2`} title={item.description}>
          <h4>{item.title}</h4> <small>{item.description}</small>
        </span>
        /
      </li>
    ));
  };

  onSearchPattern = () => {
    let txt = document.getElementById("pattern-search").value;
    let url = makeUrl("/search/pattern/" + txt)
    console.log("URL", url)
    axios
      .get(url)
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
    let searchMovies = (
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

    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Movies browser
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <center>
                {searchMovies}
              </center>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
