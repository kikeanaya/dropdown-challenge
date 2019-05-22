import React, { Component } from "react";
import CountryService from '../Services/CountryService';

class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            searchResults: [],
            selected: [],
            showOptions: false
        };

        this.service = new CountryService;
    }

    getAllCountries = async () => {
        const res = await this.service.getAllCountries();

        this.setState({
            countries: Object.values(res),
            searchResults: Object.values(res)
        });
    }     

    changeHandler = (search) => {
        console.log(search)
        const searchResults = this.state.countries.filter(country => country.includes(search))
        this.setState({
            searchResults: searchResults
        });
    }

    clickHandler = (country) => {
        const selectedCopy = [...this.state.selected]
        console.log(country)
        selectedCopy.push(country)
        this.setState({
            selected: selectedCopy
        })
    }

    expandOptions = () => {
        this.setState({
            showOptions: true
        })
    }

    componentDidMount () {
        this.getAllCountries();
    }

    render() {
        return (
                <div className="search-container" onClick={() => this.expandOptions()}>
                    {
                        this.state.selected.map((elm, idx) => <a key ={idx} className="selected-countries"> {elm.country} <span className="delete-icon"></span></a>)
                    }
                    <input 
                    className="search-input"
                    type="search" 
                    placeholder="State"
                    onChange={e => this.changeHandler(e.target.value)}/>
                
                    {this.state.showOptions === true && 
                        <ul className="countries-list"> 
                        {
                            this.state.searchResults.map((country, idx) => <li key ={idx} onClick={() => this.clickHandler({country})}> {country}</li>)
                        }
                        </ul>
                    }
                </div>
        );
    }
}

export default Dropdown;