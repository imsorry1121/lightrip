function information(id, spotName, lat, lon, text, address, spotIn, image, min, max){
	infowindow = new google.maps.InfoWindow();
	if (infowindow !== null){
    google.maps.event.addListener(marker, 'click', function () {
      //下面把經緯度跟地址都hidden起來
      infowindow.setContent("<div id='infoWindow'><a href=javascript:lightbox(\'"+spotName+"\')>"+spotName+"</a><span class='clickme' onclick='addSchedule();'>加入行程</span></br><img src='"+image+"'/><p hidden='true'>"+id+"</p><p hidden='true'>"+lat+"</p><p hidden='true'>"+lon+"</p><p hidden='true'>"+address+"</p><p>"+text+"</p><p hidden='true'>"+spotIn+"</p><p hidden='true'>"+min+"</p><p hidden='true'>"+max+"</p></div>");
      infowindow.open(map, this);
      });//如果用mousevoer時會產生事件衝突?可以用自訂overlay解決
}
    google.maps.event.addListener(map, 'click', function () {
      infowindow.close();});   
	
}


