import React from 'react';
import './SearchList.scss';


const SearchList = (props) => {
		return (
			<ul className='filter-list'>
				{props.onSearchData.map((item, i) => {
					return <li key={i}>
										<span>{item.Title}</span>
										<img src='images/add.png'
											 	 alt='add'
											 	 onClick={() => props.onMovieAdd(item)} />
								</li>})}
			</ul>
		)
}


export {SearchList};
