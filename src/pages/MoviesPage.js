import React, {Component, Fragment} from 'react';

import {Header} from '../components/Header/Header';
import {SearchList} from '../components/SearchList/SearchList';
import {Movies} from '../components/Movies/Movies';

const api = '43e48841';




class Homepage extends Component {
  state = {
  	data: [],
    searchTerm: '',
    searchList: [],
  }

  componentDidMount (){
    this.getData();
  }

  getData = () => {
  		fetch(`https://react-project-89302.firebaseio.com/movies.json`)
		.then(response => response.json())
		.then(data => {
			let moviesList = [];

			for (let movie in data) {
				data[movie].id = movie;
				moviesList.push(data[movie]);
			}

			this.setState({
				data: moviesList
			})
		})
		.catch(error => {
			this.setState({
				data: []
			})
		})
  }

  onMovieSearch = e => {
    this.setState({
      searchTerm: e.target.value,
    })

    if (e.target.value.length > 2) {
    fetch(`http://www.omdbapi.com/?apikey=${api}&s=${e.target.value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      if (data.Response !== 'False') {
        this.setState({
        searchList: data.Search
      })} else {
        this.setState({
          searchList: [],
        })}
    })
    .catch(error => this.setState({searchList: []}))
    }
  }

  addMovie = item => {
    this.setState({
      searchTerm: ''
    })

		fetch(`http://www.omdbapi.com/?apikey=${api}&i=${item.imdbID}`)
		.then(response => response.json())
		.then(data => {this.saveMovie(data)})
	}

	saveMovie = item => {
    let repeatedMovie = this.state.data.find(movie => movie.imdbID === item.imdbID)

      if (!repeatedMovie) {
        item.watched = "to-watch";
        fetch(`https://react-project-89302.firebaseio.com/movies.json`, {
          method: 'POST',
          body: JSON.stringify(item)
        })
        .then(response => console.log(response))
        .then(() => {
        	this.getData();
        })
      }
  	}

  renderMovies = () => {
  	if(this.state.data.length) {
  		return (
  		    <Fragment>
		        <Movies type="to-watch" data={this.state.data} getData={this.getData} />
		        <Movies type="watched" data={this.state.data} getData={this.getData}/>
	        </Fragment>
  		)
  	}
  }

  render() {
    return (
      <div className="App">
        <Header setMovies={() => this.setMovies()}
                onMovieSearch={this.onMovieSearch}
                searchTerm={this.state.searchTerm} />
        {this.state.searchTerm.length > 2 && this.state.searchList.length ?
        <SearchList onSearchData={this.state.searchList}
                    onMovieAdd={(item) => this.addMovie(item)} /> : null}
        {this.renderMovies()}
      </div>
    )
  }

}

export default Homepage;
