google.load("feeds", "1");

function initialize() {
  var feed = new google.feeds.Feed("http://www.health.com/health/diet-fitness/feed");
  feed.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("feed");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var div = document.createElement("div");
        var br = document.createElement("br");
        div.appendChild(document.createTextNode(entry.title));
        container.appendChild(div);
        container.appendChild(br);
      }
    }
  });
}
google.setOnLoadCallback(initialize);