'use strict'

const apiKey = 'WDcvYxtLcCX0hRZeZmeuGNzPSVQMBnU6PH5aWqIS';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    console.log(responseJson);
    let info = [];
    for (let i = 0; i < responseJson.data.length; i++) {
        info.push(`<p> ${i + 1}) <br> Name: ${responseJson.data[i].fullName} <br> <br> Description: ${responseJson.data[i].description} <br> <br> Website URL: ${responseJson.data[i].url}</p>`)
    }
    $('.results').html(info)
    console.log(responseJson.data.fullname)
}
function getParks(stateTerm, quantityTerm=10) {
    const params = {
        api_Key: apiKey,
        stateCode: stateTerm,
        limit: quantityTerm
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + "?" + queryString;

    console.log(url)

    fetch(url, params)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#errors').text('There was an error.')
    });
}

function watchForm() {
    $('form').submit(event => {
    event.preventDefault();
    const stateTerm = $('#state').val();
    const quantityTerm = $('#quantity').val();
    getParks(stateTerm, quantityTerm);
    })
}


$(watchForm);