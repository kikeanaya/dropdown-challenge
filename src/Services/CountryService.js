import countries from '../countries.json';

class CountryService {

    getAllCountries = async () => {
        await  new Promise(resolve => setTimeout(resolve, 1000));
        return (countries);
    }        
}

export default CountryService;