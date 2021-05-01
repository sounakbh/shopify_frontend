import React, { Component } from "react";

class MovieList extends Component {
  render() {
    const FavouriteComponent = this.props.favouriteComponent;
    return (
      <>
        <ul>
          {this.props.movies.map((movie) => (
            <div>
              <img src={movie["Poster"]} alt="Movie"></img>
              <button onClick={() => this.props.handleFavouriteClick(movie)}>
                {<FavouriteComponent />}
              </button>
            </div>
          ))}
        </ul>
      </>
    );
  }
}

export default MovieList;
