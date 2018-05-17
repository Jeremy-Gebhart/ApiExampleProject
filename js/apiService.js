(function($) {
    'use strict';

    // All DOM actions should take place in here
    $(document).ready(function() {

        // Event handlers for button clicks
        $('#getPlanets').click(function() {
            var planets = getPlanets();
        });
    });
    
    // Append output to the result display
    function updateDisplay(newText) {
        $('#resultDisplay').text(newText);
    }

    // Make AJAX get
    function getPlanets() {
        var data = makeCorsRequest('GET', 'planets');
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
    function makeCorsRequest(method, endpoint) {
        // This is a sample server that supports CORS.
        var url = 'http://localhost:8081/api/' + endpoint;
    
        var xhr = createCORSRequest(method, url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }
    
        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;

            // Update DOM
            updateDisplay(text);
        };
    
        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };
    
        xhr.send();
    }
})(jQuery);