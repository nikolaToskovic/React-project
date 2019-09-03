import React, {Fragment} from 'react';
import './MovieDetailsPage.scss';

import {withRouter, Link} from 'react-router-dom';

const api = '43e48841';





class MovieDetailsPage extends React.Component {
  state = {
      data: {}
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    fetch(`https://react-project-89302.firebaseio.com/movies.json`)
    .then(response => response.json())
    .then(data => {

      for (let movie in data) {
        if (data[movie].imdbID === this.props.match.params.id) {
          this.setState({
            data: data[movie]
          })
        }}
    })
    .catch(error => {
      this.setState({
        data: {}
      })
    })
  }

  render(){
    return(
      <Fragment>
        <header className='movie-details-header'>
          <div className='movie-details-header-inner'>
            <Link to='/'><img src='http://onu.org.cu/files/skins/basesite/images/back_button.png' alt='go back' /></Link>
            <span> {this.state.data.watched === 'watched' ?
            'Watched' : 'To Watch'} / {this.state.data.Title}
            </span>
          </div>
        </header>
        <div className='movie-details'>
          <img src={this.state.data.Poster} alt='poster' />
          <div className='movie-details-info'>
            <h3>{this.state.data.Title}</h3>
            <p><span className='bolded'>Release date:</span> {this.state.data.Released}</p>
            <p><span className='bolded'>Runtime:</span> {this.state.data.Runtime}</p>
            <p><span className='bolded'>Genre:</span> {this.state.data.Genre}</p>
            <p><span className='bolded'>Director:</span> {this.state.data.Director}</p>
            <p><span className='bolded'>Actors:</span> {this.state.data.Actors}</p>
            <p><span className='bolded'>Plot:</span> {this.state.data.Plot}</p>
            <span className='imdb-rating'>
              <span>{this.state.data.imdbRating}</span>
            </span>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default withRouter(MovieDetailsPage);
