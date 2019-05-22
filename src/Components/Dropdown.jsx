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
        const searchResults = this.state.countries.filter(country => country.toLowerCase().includes(search.toLowerCase()) && !this.state.selected.includes(country))
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

    deleteSelection = (e) => {
        let selectedCopy = [...this.state.selected]

        for(let i = 0; i < selectedCopy.length; i++){
            if(selectedCopy[i] === e) {
                selectedCopy.splice(i,1)
                break
            }
        }

        this.setState({
            selected: selectedCopy
        }, () => this.changeHandler(this.state.searchValue))
    }

    expandOptions = () => {
        this.setState({
            showOptions: true
        })
    }

    clickOutside = (e) => {
        if(this.node.contains(e.target)){
            return
        }
        this.setState({
            showOptions: false
        })
    }

    componentDidMount () {
        this.getAllCountries();
        document.addEventListener('mousedown', this.clickOutside, false);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="search-container" ref={node => this.node = node} onClick={() => this.expandOptions()}>
                        {
                        this.state.selected.map((elm, idx) => <a key ={idx} className="selected-country"> {elm} <span className="delete-icon" onClick={() => this.deleteSelection(elm)}></span></a>)
                        }

                    <input 
                    type="search" 
                    placeholder="State"
                    onChange={e => this.changeHandler(e.target.value)}/>
                    <span className="expand-icon"></span>
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