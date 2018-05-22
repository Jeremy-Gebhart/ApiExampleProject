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

        $('#updatePlanet').click(function() {
            var index = $('#planetIndex').val();
            var name = $('#planetName').val();
            var description = $('#planetDescription').val();

            updatePlanet(name, description, index);
        });

        $('#deletePlanet').click(function() {
            var index = $('#planetIndex').val();
            deletePlanet(index);
        });
    });
    
    // Append output to the result display
    function updateDisplay(newText) {
        $('#resultDisplay').text(newText);
    }

    function getPlanets() {
        makeHttpRequest('GET', 'planets', null, displayAll);
    }

    function getPlanet(index) {
        makeHttpRequest('GET', 'planets/' + Number(index), null, displayPlanet);
    }

    function addPlanet(name, description) {
        var dataToAdd = {name, description};
        makeHttpRequest('POST', 'planets', dataToAdd, handlePlanetAdd);
    }

    function deletePlanet(index) {
        makeHttpRequest('DELETE', 'planets/' + Number(index), null, handleDelete);
    }

    function updatePlanet(name, description, index) {
        var dataToUpdate = {name, description};
        makeHttpRequest('PUT', 'planets/' + Number(index), dataToUpdate, confirmUpdate)
    }
    


    // Callbacks
    function displayAll(json) {
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

    function handleDelete() {
        // Reduce the number of planets and adjust the index max
        numberOfPlanets--;
        $('#planetIndex').attr('max', numberOfPlanets);

        updateDisplay('--- Planet has been successfully removed ---');
    }

    function getPlanetaryId(json) {
        return json.Id;
    }

    function confirmUpdate() {
        updateDisplay('--- Planet has been successfully updated ---');

        // Reset the text fields
        $('#planetName').val('');
        $('#planetDescription').val('');
    }

    // Make the actual HTTP request
    function makeHttpRequest(method, endpoint, requestBodyData, callback) {
        // This is a sample server that supports CORS
        var appUrl = 'http://localhost:8081/api/' + endpoint;

        switch (method) {
            case 'GET':
            case 'DELETE':
                doGetDelete(method, appUrl, callback);
                break;
            case 'POST':
            case 'PUT':
                doPostUpdate(method, appUrl, requestBodyData, callback);
                break;
        }
    }

    function doGetDelete(method, appUrl, callback) {
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