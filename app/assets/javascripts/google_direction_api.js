/*google_direction_api.js*/
      var map;
      var geocoder;
      var bounds = new google.maps.LatLngBounds();
      var markersArray = [];
      
      //var origin1 = "台北市羅斯福路四段一號";//new google.maps.LatLng(25.018402,121.538675); // NTU
      //var origin2 = "台北市木新路二段161巷6弄5號"; //師大
      //var destinationA = "台北火車站";
      //var destinationB = "台北市南海路56號"//new google.maps.LatLng(25.03315,121.564451);

      var destinationIcon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000";
      var originIcon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000";
      //地圖進去時呈現的樣子
      function initialize() {
        var opts = {
          center: new google.maps.LatLng(55.53, 9.4),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), opts);
        geocoder = new google.maps.Geocoder();
      }
    
      //發出request 得到距離的矩陣
      function calculateDistances_driving(origin1,destinationA,id) {
        /*caculate the distance and duration between spots for driving*/
        var service = new google.maps.DistanceMatrixService();
        //var re;
        //re = 
        service.getDistanceMatrix(
          {
            //origins: [origin1, origin2],
            //destinations: [destinationA, destinationB],
            origins: [origin1],
            destinations: [destinationA],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          },  gen_callback(id));
        //re = callback();
        //return 1;

      }

       function calculateDistances_walking(origin1,destinationA,id) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, gen_callback_w(id));

      }
      /*包裝callback function 使其可以傳參數 (for driving)*/
      function gen_callback(id){
        return function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          //var testDiv = "outputDiv_"+origins[0]+"_"+destinations[0]+"";
          
          var outputDiv = document.getElementById(id);
          outputDiv.innerHTML = '';
         
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            //addMarker(origins[i], false);     //可以當作按下交通資訊時的事件
            //console.log(results)              //顯示回傳的物件內容
            for (var j = 0; j < results.length; j++) {
             // addMarker(destinations[j], true);   //可以當作按下交通資訊時的事件
              outputDiv.innerHTML += "<div style='position:relative;'><div class='traffic_left' ><img src=assets/car.jpg width=50 height=40/></div><div class='traffic_right'><div class='traffic_method' onclick='change_to_walking(\""+ id +"\");'>driving</div>"+"<div class='distance' style='display:none;'>" + results[j].distance.text + "</div>" +"<div class='duration'>"+ results[j].duration.text + "</div>" +"<div class='duration_value' style='display:none;'>"+ results[j].duration.value + "</div></div></div>";
              //
              //console.log("outputDiv.innerHTML:" +outputDiv.innerHTML);
            
              //$('#traffic_info_temp2').html(1);
            }
          }
          
        }
        console.log(id);
      }

      }



      /*包裝callback function 使其可以傳參數 (for walking)*/
      function gen_callback_w(id){
        return function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          //var testDiv = "outputDiv_"+origins[0]+"_"+destinations[0]+"";
          
          var outputDiv = document.getElementById(id);
          outputDiv.innerHTML = '';
         
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            //addMarker(origins[i], false);     //可以當作按下交通資訊時的事件
            //console.log(results)              //顯示回傳的物件內容
            for (var j = 0; j < results.length; j++) {
             // addMarker(destinations[j], true);   //可以當作按下交通資訊時的事件
              

             /*add traffic info into the schedule include 4 div method, distance, dutration text, duration value */
             /*duration.value (in seconds)*/ 
              outputDiv.innerHTML += "<div style='position:relative;'><div class='traffic_left' ><img src=assets/walk.jpg width=50 height=40/></div><div class='traffic_right'><div class='traffic_method' onclick='change_to_driving(\""+ id +"\");'>walking</div>"+"<div class='distance' style='display:none;'>" + results[j].distance.text + "</div>" +"<div class='duration'>"+ results[j].duration.text + "</div>" +"<div class='duration_value' style='display:none;'>"+ results[j].duration.value + "</div></div></div>";
             

            //console.log("duration");
            //console.log(results[j].duration.value);
              //$('#traffic_info_temp2').html(1);
            }
          }
          
        }
        console.log(id);
      }

      }
      function change_to_driving(id){
          //console.log(id);
          var arrayOfStrings = id.split('_');
          //console.log(arrayOfStrings[1]);
          //console.log(arrayOfStrings[2]);
          var clear = document.getElementById(id);
          clear.innerHTML = "";
          calculateDistances_driving(arrayOfStrings[1],arrayOfStrings[2],id);
       }
      

      function change_to_walking (id){
          //console.log(id);
          var arrayOfStrings = id.split('_');
          //console.log(arrayOfStrings[1]);
          //console.log(arrayOfStrings[2]);
          var clear = document.getElementById(id);
          clear.innerHTML = "";
          calculateDistances_walking(arrayOfStrings[1],arrayOfStrings[2],id);
       }

       



      //處理回傳的資訊(包含所有我們需要的資訊)
 /*已經複製到gen_callback中
      function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var testDiv = "outputDiv_"+origins[0]+"_"+destinations[0]+"";
          var outputDiv = document.getElementById('traffic_info_temp');
          outputDiv.innerHTML = '';
      
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
         
            for (var j = 0; j < results.length; j++) {
      
              outputDiv.innerHTML += "driving" + results[j].distance.text + " in "
                  + results[j].duration.text + "<br />";
              console.log("outputDiv.innerHTML:" +outputDiv.innerHTML);
            
              $('#traffic_info_temp2').html(1);
            }
          }
      
          
        }
      }
       function callback_walking(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var outputDiv = document.getElementById('outputDiv');
          outputDiv.innerHTML = '';
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            addMarker(origins[i], false);
            console.log(results)              //顯示回傳的物件內容
            for (var j = 0; j < results.length; j++) {
              addMarker(destinations[j], true);
              outputDiv.innerHTML += "walking" + results[j].distance.text + " in "
                  + results[j].duration.text + "<br />";
            }
          }
        }
        $('#test').append('hi WALKING<div>div is here</div>')
        $("#test").append(response.rows[0].elements[0].duration.text);
      }
*/
     /* function addMarker(location, isDestination) {
        var icon;
        if (isDestination) {
          icon = destinationIcon;
        } else {
          icon = originIcon;
        }
        geocoder.geocode({'address': location}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            bounds.extend(results[0].geometry.location);
            map.fitBounds(bounds);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            });
            markersArray.push(marker);
          } else {
            alert("Geocode was not successful for the following reason: "
              + status);
          }
        });
      }*/
      
      function deleteOverlays() {
        if (markersArray) {
          for (i in markersArray) {
            markersArray[i].setMap(null);
          }
          markersArray.length = 0;
        }
      }