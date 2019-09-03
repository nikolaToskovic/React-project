import React from 'react';
import './Header.scss';



const Header = (props) => {
    return (
        <header>
            <div className='header-inner'>
                <h2 className='heading-wrapper'>
                  <span className='heading'>Movie Watchlist</span>
                  <img src='images/popcorn.png' alt='movies' />
                </h2>
                <input type='text'
                       placeholder='Search movies'
                       className='search-field'
                       onChange={props.onMovieSearch} />
            </div>
        </header>
    )
}


export {Header};
