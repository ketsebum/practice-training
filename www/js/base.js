/**
 * @fileoverview
 * Provides methods for the Hello Endpoints sample UI and interaction with the
 * Hello Endpoints API.
 *
 * @author danielholevoet@google.com (Dan Holevoet)
 */

/** google global namespace for Google projects. */
var google = google || {};

/** devrel namespace for Google Developer Relations projects. */
google.devrel = google.devrel || {};

/** samples namespace for DevRel sample code. */
google.devrel.samples = google.devrel.samples || {};

/** hello namespace for this sample. */
google.devrel.samples.hello = google.devrel.samples.hello || {};

/**
 * Client ID of the application (from the APIs Console).
 * @type {string}
 */
google.devrel.samples.hello.CLIENT_ID =
    'gaming-140419';

/**
 * Scopes used by the application.
 * @type {string}
 */
google.devrel.samples.hello.SCOPES =
    'https://www.googleapis.com/auth/userinfo.email';

/**
 * Prints a greeting to the greeting log.
 * param {Object} greeting Greeting to print.
 */
google.devrel.samples.hello.print = function(greeting) {
    $.each(greeting.result.items, function(i, val) {
        var element = document.createElement('div');
        element.classList.add('row');
        element.innerHTML = 'Game: ' + i + ' and it is ' + val.turn + '\'s turn';
        document.getElementById('outputLog').appendChild(element);
    });
};

/**
 * Gets a numbered greeting via the API.
 * @param {string} id ID of the greeting.
 */
google.devrel.samples.hello.getGreeting = function() {
    console.log("Here is a list of the entire API");
    console.log(gapi.client.word_bait);
    gapi.client.word_bait.get_games().execute(
    function(resp) {
        if (resp.result) {
            google.devrel.samples.hello.print(resp);
        }
    });
};

/**
 * Enables the button callbacks in the UI.
 */
google.devrel.samples.hello.enableButtons = function() {
    $("#test").on("click", function(e) {
        e.preventDefault();
        google.devrel.samples.hello.getGreeting();
    });
};

/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 */
google.devrel.samples.hello.init = function(apiRoot) {
  // Loads the OAuth and helloworld APIs asynchronously, and triggers login
  // when they have completed.
  var apisToLoad;
  var callback = function() {
    if (--apisToLoad === 0) {
      google.devrel.samples.hello.enableButtons();
    }
  };

  apisToLoad = 1; // must match number of calls to gapi.client.load()
  gapi.client.load('word_bait', 'v1', callback, apiRoot);
//  gapi.client.load('oauth2', 'v2', callback);
};

function init() {
    google.devrel.samples.hello.init('https://gaming-140419.appspot.com/_ah/api/');
}
