function drawChart(marker) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {'title':'Pizza sold @ '+
                         marker.getPosition().toString(),
                 'width':400,
                 'height':150};

  var node        = document.createElement('div'),
      infoWindow  = new google.maps.InfoWindow(),
      chart       = new google.visualization.PieChart(node);

      chart.draw(data, options);
      infoWindow.setContent(node);
      infoWindow.open(marker.getMap(),marker);
}
google.load('visualization', '1.0', {'packages':['corechart']});


// function initialize() {

//     var mapOptions = {
//       center: new google.maps.LatLng(-33.891044,151.275537),
//       zoom: 10,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };

//     var map = new google.maps.Map(document.getElementById("map_canvas"),
//         mapOptions);

//     var marker1 = new google.maps.Marker({
//         position: mapOptions.center,
//         map: map
//     });

//     google.maps.event.addListener(marker1, 'click', function() {
//       drawChart(this);
//     });

//   }



var marker;
var gm_map;
var markerArray = [];
var address = 'Sweden';
var geocoder = new google.maps.Geocoder();

geocoder.geocode({ 'address': address }, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
        gm_map.setCenter(results[0].geometry.location);
        gm_map.fitBounds(results[0].geometry.bounds);
    } else {
        alert("Unable to complete the geological setting due to the following error:\n\n" + status);
    }
});



function initialize() {
    var marker, i;
    var clusterMarkers = [
        new google.maps.Marker({
            position: new google.maps.LatLng(59.381059,13.504026),
            map: gm_map,
            title:"P1220214 1.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.338683,13.492057),
            map: gm_map,
            title:"P1220214 2.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.340715,13.49631),
            map: gm_map,
            title:"P1220214 3.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.327232,13.487384),
            map: gm_map,
            title:"P1220214 4.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.379034,13.516566),
            map: gm_map,
            title:"P1220214 5.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.328631,13.485688),
            map: gm_map,
            title:"P1220214 6.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.328657,13.485591),
            map: gm_map,
            title:"P1220214 7.JPG"
        }),

        new google.maps.Marker({
            position: new google.maps.LatLng(59.328501,13.485782),
            map: gm_map,
            title:"P1220214 8.JPG"
        })
        ]

    var options_googlemaps = {
        minZoom: 4,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
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

        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                $('#toggle-photolist').fadeIn();
                $('#close-overlay').fadeIn();
                $('#view-multiblephotos').hide();
                $('#list-photos').hide();
                $('#view-singlephoto').show().html(marker.getTitle());
            }
        })(marker));
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
