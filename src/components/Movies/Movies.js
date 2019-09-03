import React, {Fragment} from 'react';
import './Movies.scss';

import {Movie} from '../Movie/Movie';

const api = '43e48841';




class Movies extends React.Component {
	state = {
		movies: [],
		unfilteredMovies: []
	}

	componentDidMount() {
		this.setMovies();
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.data !== this.props.data) {
            this.setMovies();
		}
	}

	setMovies = () => {
		const movies = [...this.props.data].filter(movie => {
        if(this.props.type === "to-watch") {
            return movie.watched !== "watched";
        }

        return movie.watched === "watched";
		})

		this.setState({
			movies: movies,
			unfilteredMovies: movies
		})
	}

	moveObjUp = e => {
		let objToMoveUp = this.state.movies.findIndex((element) => {
			return e.target.closest('.movie-wrapper').id === element.id
		});


		if(objToMoveUp > 0)	{
			[this.state.movies[objToMoveUp], this.state.movies[objToMoveUp - 1]] =
			[this.state.movies[objToMoveUp - 1], this.state.movies[objToMoveUp]];
		}

		this.setState({
			movies: this.state.movies
		})
	}

	moveDown = e => {
		let objToMoveDown = this.state.movies.findIndex((element) => {
			return e.target.closest('.movie-wrapper').id === element.id
		});


		if(objToMoveDown < this.state.movies.length - 1)	{
			[this.state.movies[objToMoveDown], this.state.movies[objToMoveDown + 1]] =
			[this.state.movies[objToMoveDown + 1], this.state.movies[objToMoveDown]];
		}

		this.setState({
			movies: this.state.movies
		})
	}

	deleteObject = e => {
		let targetId = e.target.closest('.movie-wrapper').id;

		fetch(`https://react-project-89302.firebaseio.com/movies/${targetId}.json/`, {
			method: 'DELETE'
		})
		.then(() => {
			this.props.getData()
		})
		}

	addMovieToWatched = e => {
		let movie = this.state.movies.find(movie => {
			return movie.id === e.target.closest('.movie-wrapper').id
		})
		movie.watched = 'watched';

		let targetId = e.target.closest('.movie-wrapper').id;

		fetch(`https://react-project-89302.firebaseio.com/movies/${targetId}.json`, {
			method: 'PATCH',
			body: JSON.stringify(movie)
		})
		.then(response => console.log(response))
		.then(() => {
			this.props.getData()
		})
	}

	filterByGenre = e => {
		let filteredMovies = this.state.movies.filter(movie => {
			return movie.Genre.includes(e.target.textContent);
		})

		this.setState({
			movies: filteredMovies
		})
	}

	filterByRating = e => {
		let moviesToFilter = [...this.state.movies];
		let filteredMovies = moviesToFilter.sort((a,b) => {
			return b.imdbRating - a.imdbRating
		})

		this.setState({
			movies: filteredMovies
		})
	}

	resetFilters = e => {
		this.setState({
			movies: this.state.unfilteredMovies
		})
	}


	render() {
		return (
			<Fragment>
				<div className='movies'>
					{this.props.type === 'to-watch' ?
					<div className='to-watch-wrapper'>
						<h3>To watch</h3>
						<div className='reset-filters' onClick={this.resetFilters}>
							<span>Reset filters</span>
							<img src='images/reset.png'
									 alt='reset filters' />
						</div>
					</div>
					:
				  <div className='to-watch-wrapper'>
						<h3>Watched movies</h3>
						<div className='reset-filters' onClick={this.resetFilters}>
							<span>Reset filters</span>
							<img src='images/reset.png'
									 alt='reset filters' />
						</div>
					</div>}
						{this.state.movies.map((movie,i) => {
							return <Movie data={movie} key={i}
													moveDown={this.moveDown}
													moveObjUp={this.moveObjUp}
													deleteObj={this.deleteObject}
													addToWatched={this.addMovieToWatched}
													filterGenre={this.filterByGenre}
													filterRating={this.filterByRating} /> })}
				</div>
			</Fragment>
		)
	}
}

export {Movies};
