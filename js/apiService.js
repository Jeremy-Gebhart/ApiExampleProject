(function($) {
    'use strict';

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
    });
    
    // Append output to the result display
    function updateDisplay(newText) {
        $('#resultDisplay').text(newText);
    }

    // Make AJAX get
    function getPlanets() {
        makeCorsRequest('GET', 'planets', true);
    }

    function getPlanet(index) {
        makeCorsRequest('GET', 'planets/' + Number(index), false);
    }

    // Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    // Make the actual CORS request.
    function makeCorsRequest(method, endpoint, isArray) {
        // This is a sample server that supports CORS.
        var url = 'http://localhost:8081/api/' + endpoint;

        var xhr = createCORSRequest(method, url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }
    
        // Response handlers.
        xhr.onload = function() {
            var json = JSON.parse(xhr.response);

            // Update DOM
            var displayText = '';
            if (isArray == true) {
                for (var i = 0; i < json.length; i++) {
                    var data = json[i];
                    displayText += 'Name: ' + data.name + ' - Description: ' + data.description + '\n';
                }
                updateDisplay(displayText);
            }
            else {
                displayText = 'Name: ' + json.name + ' - Description: ' + json.description;
                updateDisplay(displayText);
            }
        };
    
        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };
    
        xhr.send();
    }
})(jQuery);