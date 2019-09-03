import React from 'react';
import './Movie.scss';

import {Link} from 'react-router-dom';



const Movie = (props) => {
	let genres = props.data.Genre.split(',');

	return (
		<div className='movie-wrapper' data-id={props.data.imdbID} id={props.data.id}>
			<div className='info-wrapper'>
				<span className='rating' title='Sort by rating' onClick={props.filterRating}>
					<span className='grade'>{props.data.imdbRating}</span>
				</span>
				<div className='title-wrapper'>
					<Link to={`/${props.data.watched}/${props.data.imdbID}`}>
						<h2 className='movie-name'>{props.data.Title}</h2>
					</Link>
					<div className='genres'>
						{genres.map((genre, i) => {
							return <span className='genre'
													 key={i}
													 title='Filter by genre'
													 onClick={props.filterGenre}>{genre}</span>})
						}
					</div>
				</div>
			</div>
				<div className='movie-icons'>
					{props.data.watched === 'to-watch' ?
					<img src='images/unwatch.png'
							 alt='unwatch'
							 className='unwatch-img'
							 title='Put movie in "Watched movies" list'
							 onClick={props.addToWatched} /> : null}
					<img src='images/trash.png'
						 alt='trash'
						 className='trash-img'
						 title='Delete movie'
						 onClick={props.deleteObj} />
					{props.data.watched === 'to-watch' ?
					<div className='arrows'>
						<img src='images/up.png'
							 alt='up'
							 className='up-img'
							 title='Move movie up'
							 onClick={props.moveObjUp} />
						<img src='images/down.png'
							 alt='down'
							 className='down-img'
							 title='Move movie down'
							 onClick={props.moveDown} />
					</div>  : null}
				</div>
		</div>
	)
}

export {Movie}
