(function($) {
    'use strict';

    // Setup the mechanism to keep track of how many planets there are
    var numberOfPlanets = 0;
    makeHttpRequest('GET', 'planets', null, setNumberOfPlanets);

    // All DOM actions should take place in here
    $(document).ready(function() {

        // Event handlers for button clicks
        $('#getPlanets').click(function() {
            getPlanets();
        });

        $('#getPlanet').click(function() {
            var index = $('#planetIndex').val();
            getPlanet(index);
        });

        $('#addPlanet').click(function() {
            var name = $('#planetName').val();
            var description = $('#planetDescription').val();

            addPlanet(name, description);
        });
    });
    
    // Append output to the result display
    function updateDisplay(newText) {
        $('#resultDisplay').text(newText);
    }

    function getPlanets() {
        makeHttpRequest('GET', 'planets', null, displayPlanets);
    }

    function getPlanet(index) {
        makeHttpRequest('GET', 'planets/' + Number(index), null, displayPlanet);
    }

    function addPlanet(name, description) {
        var requestBodyData = {name, description};
        makeHttpRequest('POST', 'planets', requestBodyData, handlePlanetAdd);
    }



    // Callbacks
    function displayPlanets(json) {
        var displayText = '';
        for (var i = 0; i < json.length; i++) {
            var data = json[i];
            displayText += 'Name: ' + data.name + ' - Description: ' + data.description + '\n';
        }
        updateDisplay(displayText);
    }

    function displayPlanet(json) {
        var displayText = 'Name: ' + json.name + ' - Description: ' + json.description;
        updateDisplay(displayText);
    }

    function handlePlanetAdd(json) {
        var displayText = 'Name: ' + json.name + ' - Description: ' + json.description + '\n has been added';
        updateDisplay(displayText);

        // Adjust the planet index max
        numberOfPlanets++; 
        $('#planetIndex').attr('max', numberOfPlanets);

        // Reset the text fields
        $('#planetName').val('');
        $('#planetDescription').val('');
    }

    function setNumberOfPlanets(json) {
        numberOfPlanets = json.length;
    }


    // Create the XHR object
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported
            xhr = null;
        }
        return xhr;
    }

    // Make the actual CORS request
    function makeHttpRequest(method, endpoint, requestBodyData, callback) {
        // This is a sample server that supports CORS
        var appUrl = 'http://localhost:8081/api/' + endpoint;

        switch (method) {
            case 'GET':
                doGet(method, appUrl, callback);
                break;
            case 'POST':
            case 'PUT':
                doPostUpdate(method, appUrl, requestBodyData, callback);
                break;
        }
    }

    function doGet(method, appUrl, callback) {
        $.ajax({
            url: appUrl,
            type: method,
            success: function (jsonData) {
                callback(jsonData);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }

    function doPostUpdate(method, appUrl, requestBodyData, callback) {
        $.ajax({
            url: appUrl,
            type: method,
            accepts: "application/json; charset=utf-8",
            contentType: "application/json; charset=utf-8",
            data: '{"Id": 0, "Name":"' + requestBodyData.name + '", "Description":"' + requestBodyData.description + '"}',
            dataType: 'json',
            success: function (result) {
                callback(result);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            }
        });
    }
})(jQuery);