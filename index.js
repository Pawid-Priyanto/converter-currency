const axios = require('axios');

// fixer io

const FIXER_API_KEY = '6c1b33665766b5b92506cc4aa600d67f';
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;

// https://restcountries.eu
const REST_COUNTRIES_API = `https://restcountries.eu/rest/v2/currency`

// async//Await

// fetch data obout currencies

const getExchangeRate = async (fromCurrency, toCurrency) => {

    try {
        const { data: { rates} } = await axios.get(FIXER_API)
    
        const euro = 1/ rates[fromCurrency]; //?
        const exchangeRate = euro * rates[toCurrency]; //?
        
        return exchangeRate; //?

    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`)
    }
}

// getExchangeRate('USD', 'IDR') //?

//fetch data about countries

const getCountries = async (currencyCode) => {
    try {
        
        const {data} = await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`);
    
        return data.map(({name}) => name); //?
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }
}

// getCountries('AUD') //? 


const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    try {
        fromCurrency = fromCurrency.toUpperCase();
        toCurrency = toCurrency.toUpperCase();
    
        const [exchangeRate, countries] = await Promise.all([
            getExchangeRate(fromCurrency, toCurrency),
            getCountries(toCurrency)
        ])
        
        const convertedAmount = (amount * exchangeRate).toFixed(2);
    
    
        return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.
        You can spend this in the following countries ${countries}`
        
    } catch (error) {
        throw new Error(`Please check your inputan`)
    }
    


}

// call the function
convertCurrency('USD', 'IDR', 20)
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
