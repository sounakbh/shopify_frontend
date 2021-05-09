import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import DisplayMovieList from "./components/DisplayMovieList";
import AddNomination from "./components/AddNomination";
import RemoveNomination from "./components/RemoveNomination";
import "font-awesome/css/font-awesome.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      movies: [],
    };
  }

  handleChange = (event) => {
    const API_KEY = "93a17f12";
    const query = event.target.value;

    // fetch the data and store results into state
    fetch("https://omdbapi.com/?s=" + query + "&apikey=" + API_KEY)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["Search"]) {
            this.setState({ movies: [] });
            let movieArray = [];
            for (var movie in result["Search"]) {
              movieArray.push(result["Search"][movie]);
            }
            this.setState({ movies: movieArray });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  addNominatedMovie = (movie) => {
    // retrieve from local storage
    var movieFavourites = this.state.favourites;

    var title = movie.Title;
    // check for duplicate nomination
    if (movieFavourites) {
      var duplicateMovieSearch = movieFavourites.filter((obj) => {
        return obj.imdbID === movie.imdbID;
      });
    }

    if (Object.keys(duplicateMovieSearch).length === 0) {
      var favouriteMovies;
      // check for max 5 nominations
      if (this.state.favourites.length < 5) {
        favouriteMovies = [...this.state.favourites, movie];
        alert('"' + title + '"' + " added to your nominations!");
      } else {
        alert("List of Nominated movies Completed!");
        favouriteMovies = [...this.state.favourites];
      }
      this.saveToLocalStorage(favouriteMovies);
      this.setState({ favourites: favouriteMovies });
    } else {
      alert("Already added to Nominations!");
    }
  };

  removeNominatedMovie = (movie) => {
    var title = movie.Title;
    const removedFavourite = this.state.favourites;
    const index = removedFavourite.indexOf(movie);
    removedFavourite.splice(index, 1);
    this.setState({ favourites: removedFavourite });
    this.saveToLocalStorage(removedFavourite);
    alert('"' + title + '"' + " removed from your nominations!");
  };

  saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  componentWillMount() {
    // display nominated movies after page load
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      this.setState({ favourites: movieFavourites });
    }
  }

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="row page-title">
          <h1>The Shoppies</h1>
          <br /> <br /> <br />
        </div>
        <div className="row search">
          <input
            placeholder="Type To Nominate Movies..."
            className="search-bar"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <br /> <br />
        </div>
        <div className="row">
          <DisplayMovieList
            movies={this.state.movies}
            handleFavouriteClick={this.addNominatedMovie}
            favouriteComponent={AddNomination}
          />
        </div>
        <div className="row page-title">
          <h2>Nominated Movies</h2>
          <br /> <br />
        </div>
        <div className="row">
          <DisplayMovieList
            movies={this.state.favourites}
            handleFavouriteClick={this.removeNominatedMovie}
            favouriteComponent={RemoveNomination}
          />
        </div>
      </div>
    );
  }
}

export default App;
