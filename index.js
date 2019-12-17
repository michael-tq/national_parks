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
function getParks(stateTerm, limit=10) {
    const params = {
        stateCode: stateTerm,
        limit: limit,
        api_Key: apiKey,
    };
    console.log(params.limit)
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
        $('#errors').text('There was an error.');
    });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const stateTerm = $('#state').val();
        let limit = $('#quantity').val();
        console.log(limit.length)
        if (limit.length == 0) {
            getParks(stateTerm, limit=10);
        }
        let limitNumber = Number.parseInt(limit);
        console.log(Number.isNaN(limitNumber));
        if (Number.isNaN(limitNumber)) {
            alert("Not a number")
        } else {
            getParks(stateTerm, limit);
        }
    });
}

$(watchForm);