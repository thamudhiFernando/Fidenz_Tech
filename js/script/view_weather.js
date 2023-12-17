switch (document.readyState) {
    case "loading":
        getCity();
        break;
    default:
        alert("nothing");
}

function getCity() {
    // Retrieve the value from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    // Retrieve the serialized object from the URL
    const valuePassed = urlParams.get('data');
    // Deserialize the object from JSON
    const retrievedObject = JSON.parse(decodeURIComponent(valuePassed));


    var currentDate = new Date();
    var cardHTML = '<img src="../images/' + retrievedObject.weather[0].description + '.png" class="card-img-top" alt="card image">' +
        '<div class="card-img-overlay row">' +
        '<div class="col-6">' +
        '<h5>' + retrievedObject.name + ', ' + retrievedObject.sys.country + '</h5>' +
        '<p>' + convertTimestampTpTime(retrievedObject.dt) + ', ' + currentDate.toLocaleString('default', {month: 'short'}) + ' ' + currentDate.getDate() + '</p>' +
        '</div>' +
        '<div class="col-6">' +
        '<h3 class="card-title">' + retrievedObject.main.temp + '°c</h3>' +
        '<p>Temp Min: ' + retrievedObject.main.temp_min + '°c</p>' +
        '<p>Temp Max: ' + retrievedObject.main.temp_max + '°c</p>' +
        '</div>' +
        '</div>' +
        '<div class="card-body">' +
        '<div class="row">' +
        '<div class="col-4">' +
        '<p>Pressure: ' + retrievedObject.main.pressure + 'Pa</p>' +
        '<p> Humidity: ' + retrievedObject.main.humidity + '%</p>' +
        '<p>Visibility: ' + retrievedObject.visibility + 'km</p>' +
        '</div>' +
        '<div class="col-4">' +
        '<img src="../images/arrow.svg" alt="SVG Arrow" class="mb-2">' +
        '<p>' + retrievedObject.wind.speed + 'm/s ' + retrievedObject.wind.deg + ' Degree</p>' +
        '</div>' +
        '<div class="col-4 mt-2">' +
        '<p>Sunrise:  ' + convertTimestampTpTime(retrievedObject.sys.sunrise) + '</p>' +
        '<p>Sunset: ' + convertTimestampTpTime(retrievedObject.sys.sunset) + '</p>' +
        '</div>\n' +
        '</div>\n' +
        '</div>';

    $('.card').append(cardHTML);

}

$('div.card button.back-button').on('click', function () {
    window.location.href = '../../../Fidenz_Tech/index.html';

});