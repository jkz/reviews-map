function randomRatings(id) {
  var ratings, total, i;

  ratings = [
    ['★★★★★', Math.floor(Math.random() * 10)],
    ['★★★★☆', Math.floor(Math.random() * 10)],
    ['★★★☆☆', Math.floor(Math.random() * 10)],
    ['★★☆☆☆', Math.floor(Math.random() * 10)],
    ['★☆☆☆☆', Math.floor(Math.random() * 10)],
  ];

  total = 0;
  ratings.forEach(function (rating) {
    total += rating[1];
  })
  ratings.total = total;
  return ratings;
}

function drawChart(marker) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Rating');
  data.addColumn('number', 'Count');
  console.log(marker);
  data.addRows(marker.ratings);

  // Set chart options
  var options = {
    title: 'Ratings for <restaurant_name>',
    width: 400,
    height: 150,
    colors: [
      '#99ff99',
      '#bbff99',
      '#ffff99',
      '#ffbb99',
      '#ff9999',
    ]
  };

  var node        = document.createElement('div'),
      infoWindow  = new google.maps.InfoWindow(),
      chart       = new google.visualization.PieChart(node);

      chart.draw(data, options);
      infoWindow.setContent(node);
      infoWindow.open(marker.getMap(),marker);
}
google.load('visualization', '1.0', {'packages':['corechart']});


var marker;
var gm_map;
var markerArray = [];
// var address = 'Sweden';
// var geocoder = new google.maps.Geocoder();

// geocoder.geocode({ 'address': address }, function(results, status) {
//     if(status == google.maps.GeocoderStatus.OK) {
//         gm_map.setCenter(results[0].geometry.location);
//         gm_map.fitBounds(results[0].geometry.bounds);
//     } else {
//         alert("Unable to complete the geological setting due to the following error:\n\n" + status);
//     }
// });


function icon(count) {
  return 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + count + '|ff9999|000000';
}

function randomCoord() {
  return new google.maps.LatLng(Math.random(), Math.random());
}

function initialize() {
    var clusterMarkers, i, markers, ratings, lat, lng;

    clusterMarkers = [];

    for (var i = 0; i < 10; i++) {
      ratings = randomRatings();
      clusterMarkers.push(new google.maps.Marker({
          position: randomCoord(),
          map: gm_map,
          icon: icon(ratings.total),
          title: "Marker " + i,
          ratings: ratings,
      }));
    }

    var options_googlemaps = {
        minZoom: 4,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        center: new google.maps.LatLng(0, 0),
        zoom: 6,
    }

    gm_map = new google.maps.Map(document.getElementById('google-maps'), options_googlemaps);


    var options_markerclusterer = {
        gridSize: 20,
        maxZoom: 18,
        zoomOnClick: false
    };

    var markerCluster = new MarkerClusterer(gm_map, clusterMarkers, options_markerclusterer);

    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
        $('#toggle-photolist').fadeIn();
        $('#close-overlay').fadeIn();
        $('#view-multiblephotos').show();
        $('#view-singlephoto').hide();

        var markers = cluster.getMarkers();

        var array = [];
        var num = 0;

        for(i = 0; i < markers.length; i++) {

            num++;
            array.push(markers[i].getTitle() + '<br>');
        }

        $('#count-photos').text(num);
        $('#list-photos').show().html(array.join(''));

    });



    for(i = 0; i < clusterMarkers.length; i++) {
      var marker = clusterMarkers[i];
      google.maps.event.addListener(marker, 'click', drawChart.bind(null, marker));
    }
}



$(document).ready(function() {
    // INITIALIZE GOOGLE MAPS
    initialize();

    // CLOSE
    $('body').on('click', '#close-link', function() {
        $('#toggle-photolist').fadeOut();
        $('#close-overlay').fadeOut();
    });

});
