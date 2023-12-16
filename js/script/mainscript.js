switch (document.readyState) {
    case "loading":
        getCityCodes();
        break;
    default:
        alert("nothing");
}

//----------------------------get city codes from json----------------------------------
function getCityCodes() {
    // Return the Promise from fetch
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            var cities = '';

            data.List.forEach(function (city, index) {
                console.log();
                cities += city.CityCode;
                // Add a comma if it's not the last element
                if (index < data.List.length - 1) {
                    cities += ',';
                }
            });

            console.log('cities: ' + cities);

            // Call fetchingData inside the then block to ensure it's executed after city codes are fetched
            fetchingData(cities);
        })
        .catch(error => {
            console.error('Error found while fetching data:', error);
            throw error;
        });
}

// Initialize cache from localStorage
const cacheCityData = JSON.parse(localStorage.getItem('weatherCache')) || {};

// Function to save cache to localStorage
function saveCacheToLocalStorage() {
    localStorage.setItem('weatherCache', JSON.stringify(cacheCityData));
}


//----------------------------Data caching Mechanism----------------------------------
function fetchingData(cities) {
    // Check if data is cached and not expired
    if (cacheCityData[cities] && (Date.now() - cacheCityData[cities].timestamp) < 5 * 60 * 1000) {
        // Serve cached data
        console.log(`Serving cached data for ${cities}:`, cacheCityData[cities]);
        generateHtml(cacheCityData[cities].list, cities);
    } else {
        // Make a new request if data is not cached or expired
        loadAllWeatherReports(cities);
    }
}

// ... (rest of your code)



//--------------------------------------load weather reports------------------------------------
function loadAllWeatherReports(cities){

    var weather = {
        id: cities,
        units: 'metric',
        // q: 'London,uk',
        appid: '1f7c1264db89c3babe0720b2bc23fa92'
    };

    var ajaxGetConfig = {
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/group",
        async: true,
        data: weather
    }

    $.ajax(ajaxGetConfig).done(function (weatherList,textStatus,iqxhr) {
        console.log(weatherList);
        // -----------------------Generate weather report from the list---------------------
        generateHtml(weatherList,cities);

    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });
}

function generateHtml(weatherList,cities){
    if (cities != null) {
        console.log(`Serving new data for :`, weatherList);
        // Cache the new data
        cacheCityData[cities] = {
            list: weatherList,
            timestamp: Date.now(),
        };
        // Save the cache to localStorage
        saveCacheToLocalStorage();
    }

    var currentDate = new Date();
    var cardHtml = '<div class="row justify-content-center align-items-center">';
    weatherList.list.forEach(function (weather,index) {
        console.log('index : ' + index);
        if (index > 0 && index %2 == 0){
            cardHtml += '</div><div class="row justify-content-center align-items-center">';
        }
        console.log('weather: ' +weather.weather[0].description);
        cardHtml += '<div class="col-10 col-sm-8 col-md-7 col-lg-5 col-xl-4 col-xxl-4 mb-4">' +
            '<div class="card" id="'+ index+'">' +
            '<button type="button" class="close-button small-btn-img" aria-label="Close" >' +
            '<img src="images/close.png" alt="Close Button">' +
            '</button>' +
            '<img src="images/'+weather.weather[0].description+'.png" class="card-img-top" alt="card image">' +
            '<div class="card-img-overlay row">' +
            '<div class="col-6">' +
            '<h5>'+weather.name+', '+weather.sys.country+'</h5>' +
            '<p>'+convertTimestampTpTime(weather.dt) +', '+ currentDate.toLocaleString('default', { month: 'short' }) +' '+ currentDate.getDate()+'</p>' +
            '</div>' +
            '<div class="col-6">' +
            '<h3 class="card-title">'+weather.main.temp+'°c</h3>' +
            '<p>Temp Min: '+weather.main.temp_min+'°c</p>' +
            '<p>Temp Max: '+weather.main.temp_max+'°c</p>' +
            '</div>' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<div class="col-4">' +
            '<p>Pressure: '+weather.main.pressure+'Pa</p>' +
            '<p> Humidity: '+weather.main.humidity+'%</p>' +
            '<p>Visibility: '+weather.visibility+'km</p>' +
            '</div>' +
            '<div class="col-4">' +
            '<img src="images/arrow.svg" alt="SVG Arrow" class="mb-2">' +
            '<p>'+weather.wind.speed+'m/s '+weather.wind.deg+' Degree</p>' +
            '</div>' +
            '<div class="col-4 mt-2">' +
            '<p>Sunrise:  '+convertTimestampTpTime(weather.sys.sunrise)+'</p>' +
            '<p>Sunset: '+convertTimestampTpTime(weather.sys.sunset)+'</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

    });
    cardHtml += '</div>'
    $('.container-fluid').append(cardHtml);

    // -----------------------Remove weather report from the list temporary---------------------
    $('div.card button.close-button').on('click', function() {
        $(this).closest('div.card').remove();
        console.log('Removed');
    });

    // -----------------------View weather report---------------------
    $('div.card').on('click', function() {
        let indexOfClickedCard = $(this).attr('id');
        console.log($(this).attr('id'));
        console.log('------------');

        // Navigate to the second page
        console.log(weatherList.list[indexOfClickedCard]);
        // debugger;
        window.location.href = '../../../Fidenz_Tech/view/view_weather.html?data=' + encodeURIComponent(JSON.stringify(weatherList.list[indexOfClickedCard]));
        // window.location.href = '../../../Fidenz_Tech/view/view_weather.html?value=' + encodeURIComponent('hi');
    });
}

