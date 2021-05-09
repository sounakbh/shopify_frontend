import React, { Component } from "react";
import "./css/DisplayMovieList.css";

class DisplayMovieList extends Component {
  render() {
    const FavouriteComponent = this.props.favouriteComponent;
    return (
      <>
        {this.props.movies.map((movie) => (
          <div className="movieTab">
            <div className="row">
              <div className="title">{movie["Title"]}</div>
            </div>

            <div className="row poster">
              <img
                className="item"
                src={movie["Poster"]}
                alt="#Movie Poster Unavailable"
              ></img>
            </div>
            <div className="row">
              <button
                className="item add-button"
                onClick={() => this.props.handleFavouriteClick(movie)}
              >
                {<FavouriteComponent />}
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default DisplayMovieList;
