import React, { Component } from "react";
import CountryService from '../Services/CountryService';

class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            searchResults: [],
            selected: [],
            showOptions: false,
            searchValue: ''
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
        const searchResults = this.state.countries.filter(country => country.includes(search) && !this.state.selected.includes(country))
        this.setState({
            searchResults: searchResults,
            searchValue: search
        });
    }

    clickHandler = (elm) => {
        let selectedCopy = [...this.state.selected]
        selectedCopy.push(elm.country)
        this.setState({
            selected: selectedCopy
        }, () => this.changeHandler(this.state.searchValue))
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
            <div className="wrapper">
                <div className="search-container" onClick={() => this.expandOptions()}>
                        {
                        this.state.selected.map((elm, idx) => <a key ={idx} className="selected-country"> {elm} <span className="delete-icon"></span></a>)
                        }

                    <input 
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
                    
                
            </div>
        );
    }
}

export default Dropdown;