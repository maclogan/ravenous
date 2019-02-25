import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
        };
    }

    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
          let sortByOptionValue = sortByOptions[sortByOption];
          return (<li 
                    className={this.getSortByClass(sortByOptionValue)} 
                    key={sortByOptionValue}
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
                  </li>);
        });
    }

    getSortByClass(sortByOption) {
        return this.state.sortBy === sortByOption ? 'active' : '';
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption,
        });
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value,
        });
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value,
        });
    }

    handleSearch(e) {
        if (this.state.location !=="") {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            e.preventDefault();
        } else {
            alert("You must provide a location to use the search");
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        { this.renderSortByOptions() }
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                    <input required placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch} >
                    <button>Let's Go</button>
                </div>
            </div>

        )
    }
};

export default SearchBar;