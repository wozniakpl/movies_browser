import React, { Component } from "react";

const movies = [
  {
    id: 1,
    title: "Star Wars 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    title: "Star Wars 2",
    description: "Very nice",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: movies,
    };
  }

  displayCompleted = (status) => {};

  renderItems = () => {
    const newItems = this.state.movies;

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

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Movies browser
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary">Search</button>
              </div>
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
