function convertTimestampTpTime(timestamp){
    // Convert seconds to milliseconds
    var date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    var formattedTime = hours + ':' + minutes.substr(-2) + '' + period;
    return formattedTime;
}
