import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import MovieList from "./components/MovieList";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      favourites: [],
      movies: [],
    };

    this.handleChange = this.handleChange.bind(this);
    // this.addFavouriteMovie = this.addFavouriteMovie.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    var query = this.state.value;
    fetch("http://omdbapi.com/?s=" + query + "&apikey=93a17f12")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["Search"]) {
            this.setState({ movies: [] });
            for (var movie in result["Search"]) {
              // console.log(result["Search"][movie]);
              var currentMovie = {
                movieID: result["Search"][movie]["imdbID"],
                title: result["Search"][movie]["Title"],
              };
              this.setState({
                movies: [...this.state.movies, result["Search"][movie]],
              });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sum(a, b) {
    return a + b;
  }

  addFavouriteMovie = (movie) => {
    this.setState({ favourites: [...this.state.favourites, movie] });
    this.saveToLocalStorage(this.state.favourites);
  };

  removeFavouriteMovie = (movie) => {
    const removedFavourite = this.state.favourites;
    const index = removedFavourite.indexOf(movie);
    removedFavourite.splice(index, 1);
    this.setState({ favourites: removedFavourite });
    this.saveToLocalStorage(removedFavourite);
  };

  saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  componentWillMount() {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      this.setState({ favourites: movieFavourites });
    }
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.value} onChange={this.handleChange} />
        <MovieList
          movies={this.state.movies}
          handleFavouriteClick={this.addFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
        <h1>Favourites</h1>
        <MovieList
          movies={this.state.favourites}
          handleFavouriteClick={this.removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    );
  }
}

export default App;
