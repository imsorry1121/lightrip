/*search*/
function search() {
  var query = document.getElementById("query").value;
    geocode({ 'address': query });
}

function geocode(request) {  
  resetMap();
  var hash = 'q=' + request.address;
  
  /*var vpbias = document.getElementById("biasViewport").checked;
  var country = document.getElementById("country").value;
  var language = document.getElementById("language").value;
  
  if (vpbias) {
    hash += '&vpcenter=' + map.getCenter().toUrlValue(6);
    hash += '&vpzoom=' + map.getZoom();
    request.bounds = map.getBounds();
  }
  
  if (country) {
    hash += '&country=' + country;
    request.country = country;
  }
  
  if (language) {
    hash += '&language=' + language;
    request.language = language;
  }*/

  hashFragment = '#' + escape(hash);
  window.location.hash = escape(hash);
  geocoder.geocode(request, showResults);
}

/*function parseLatLng(value) {
  value.replace('/\s//g');
  var coords = value.split(',');
  var lat = parseFloat(coords[0]);
  var lng = parseFloat(coords[1]);
  if (isNaN(lat) || isNaN(lng)) {
    return null;
  } else {
    return new google.maps.LatLng(lat, lng);
  }
}*/

function resetMap() {
  infowindow.close();

  if (clickMarker != null) {
    clickMarker.setMap(null);
    clickMarker = null;
  }
  
  for (var i in markers) {
    markers[i].setMap(null);
  }
  
  markers = [];
  selected = null;
  clearBoundsOverlays();
  
  document.getElementById("responseCount").style.display = "none";
  document.getElementById("matches").style.display = "none";
}

function showResults(results, status) {
  var reverse = (clickMarker != null);
  
  if (! results) {
    alert("Geocoder did not return a valid response");
  } else {
    document.getElementById("statusValue").innerHTML = status;
    document.getElementById("statusDescription").innerHTML = GeocoderStatusDescription[status];

    document.getElementById("responseInfo").style.display = "block";    
    document.getElementById("responseStatus").style.display = "block";

    if (status == google.maps.GeocoderStatus.OK) {
      document.getElementById("matchCount").innerHTML = results.length;       
      document.getElementById("responseCount").style.display = "block";
      plotMatchesOnMap(results, reverse);
    } else {
      if (! reverse) {
        map.setCenter(new google.maps.LatLng(0.0, 0.0));
        map.setZoom(1);
      }
    }
  }
}

function plotMatchesOnMap(results, reverse) {
  
  markers = new Array(results.length);
  var resultsListHtml = "";
  
  var openInfoWindow = function(resultNum, result, marker) {
    return function() {
      if (selected != null) {
        document.getElementById('p' + selected).style.backgroundColor = "white";
        clearBoundsOverlays();
      }
      
      map.fitBounds(result.geometry.viewport);
      infowindow.setContent(getAddressComponentsHtml(result.address_components));
      infowindow.open(map, marker);
      
      if (result.geometry.bounds) {
        boundsOverlay = new google.maps.Rectangle({
          'bounds': result.geometry.bounds,
          'strokeColor': '#ff0000',
          'strokeOpacity': 1.0,
          'strokeWeight': 2.0,
          'fillOpacity': 0.0
        });
        boundsOverlay.setMap(map);
        google.maps.event.addListener(boundsOverlay, 'click', onClickCallback);
        document.getElementById('boundsLegend').style.display = 'block';
      } else {
        boundsOverlay = null;
      }
      
      viewportOverlay = new google.maps.Rectangle({
          'bounds': result.geometry.viewport,
          'strokeColor': '#0000ff',
          'strokeOpacity': 1.0,
          'strokeWeight': 2.0,
          'fillOpacity': 0.0
        });
      viewportOverlay.setMap(map);
      google.maps.event.addListener(viewportOverlay, 'click', onClickCallback);
      document.getElementById('viewportLegend').style.display = 'block';

      document.getElementById('p' + resultNum).style.backgroundColor = "#eeeeff";
      document.getElementById('matches').scrollTop =
        document.getElementById('p' + resultNum).offsetTop -
        document.getElementById('matches').offsetTop;
      selected = resultNum;
    }
  }
    
  for (var i = 0; i < results.length; i++) {
    var icon = new google.maps.MarkerImage(
      getMarkerImageUrl(i),
      new google.maps.Size(20, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34)
    );
    
    markers[i] = new google.maps.Marker({
      'position': results[i].geometry.location,
      'map': map,
      'icon': icon,
      'shadow': shadow
    });

    google.maps.event.addListener(markers[i], 'click', openInfoWindow(i, results[i], markers[i]));
    
    resultsListHtml += getResultsListItem(i, getResultDescription(results[i]));
  }
  
  document.getElementById("matches").innerHTML = resultsListHtml;
  document.getElementById("p0").style.border = "none";
  document.getElementById("matches").style.display = "block";

  if (reverse){
      // make a smooth movement to the clicked position
      map.panTo(clickMarker.getPosition());
      google.maps.event.addListenerOnce(map, 'idle', function(){
        selectMarker(0);
      });
  }

  else {
      zoomToViewports(results);
      selectMarker(0);
  }
  
  
}

function selectMarker(n) {
  google.maps.event.trigger(markers[n], 'click');
}

function zoomToViewports(results) {
  var bounds = new google.maps.LatLngBounds();

  for (var i in results) {
    bounds.union(results[i].geometry.viewport);
  }

  map.fitBounds(bounds);
}

function getMarkerImageUrl(resultNum) {
  return MAPFILES_URL + "marker" + String.fromCharCode(65 + resultNum) + ".png";
}

function getResultsListItem(resultNum, resultDescription) {
  var html  = '<a onclick="selectMarker(' + resultNum + ')">';
      html += '<div class="info" id="p' + resultNum + '">';
      html += '<table><tr valign="top">';
      html += '<td style="padding: 2px"><img src="' + getMarkerImageUrl(resultNum) + '"/></td>';
      html += '<td style="padding: 2px">' + resultDescription + '</td>';
      html += '</tr></table>';
      html += '</div></a>';
  return html;
}

function getResultDescription(result) {
  var bounds = result.geometry.bounds;
  var html  = '<table class="tabContent">';
      html += tr('Address', result.formatted_address);
      html += tr('Types', result.types.join(", "));
      html += tr('Location', result.geometry.location.toString());
      html += tr('Bounds', (bounds ? boundsToHtml(bounds) : "None"));
      html += tr('Viewport', boundsToHtml(result.geometry.viewport));
      html += tr('Location type', result.geometry.location_type);
      if (result.partial_match) {
        html += tr('Partial match', 'Yes');
      }
      html += '</table>';
  return html;
}

function getAddressComponentsHtml(components) {
  var html = '<div class="infoWindowContent">' +
               '<table class="tabContent">';
               
  for (var i = 0; i < components.length; i++) {    
    html += tr("Long name", components[i].long_name);
    html += tr("Short name", components[i].short_name);
    html += tr("Types", components[i].types[0]);
    for (var j = 1; j < components[i].types.length; j++) {
      html += tr("", components[i].types[j]);
    }
    if (i < components.length-1) {
      html += br();
    }
  }
  
  html += '</table></div>';
  return html;
}

function tr(key, value) {
  return '<tr>' +
           '<td class="key">' + key + (key ? ':' : '') + '</td>' +
           '<td class="value">' + value + '</td>' +
         '</tr>';
}

function br() {
  return '<tr><td colspan="2"><div style="width: 100%; border-bottom: 1px solid grey; margin: 2px;"</td></tr>';
}

function clearBoundsOverlays() {
  if (boundsOverlay != null) {
    boundsOverlay.setMap(null);
    document.getElementById('boundsLegend').style.display = 'none';
  }
  if (viewportOverlay != null) {
    viewportOverlay.setMap(null);
    document.getElementById('viewportLegend').style.display = 'none';
  }
}

function boundsToHtml(bounds) {
  return '(' +
    bounds.getSouthWest().toUrlValue(6) +
    ') -<br/>(' +
    bounds.getNorthEast().toUrlValue(6) +
    ')';
}