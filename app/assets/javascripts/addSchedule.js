function addSchedule(){ 
	var counter = 0;
	var find = 0;
	//console.log($('li.block.spotinfo').size());
	//console.log($('#infoWindow ul li a').html());
	while ((counter < $('li.block.spotinfo').size())&&(find==0)){
		//console.log($('li.block.spotinfo').size(),"inner");
		//console.log(counter);
		//console.log($('li.block.spotinfo').eq(counter).attr("name"));
		//console.log($('#infoWindow ul li a').html());
		if (($('li.block.spotinfo').eq(counter).attr("name")) == ($('#infoWindow a').html()) )
			{//console.log($('li.block.spotinfo').eq(counter).name);
				find =1;}
		counter++;
	}
	if (find !=1){
		//alert($('li.block.spotinfo').size());
		var size = $('li.block.spotinfo').size();

		var newSpotName = $('#infoWindow a').html();
	    var newSpotID = $('#infoWindow p').html();
	    var newSpotLat = $('#infoWindow p').eq(1).html();
	    var newSpotLon = $('#infoWindow p').eq(2).html();
	    var newSpotAddress = $('#infoWindow p').eq(3).html();
	    var newSpotText = $('#infoWindow p').eq(4).html(); 
	    var newSpotIn = $('#infoWindow p').eq(5).html(); 
	    var newSpotMin = $('#infoWindow p').eq(6).html(); 
	    var newSpotMax = $('#infoWindow p').eq(7).html(); 
	    var newSpotImg = $('#infoWindow img').eq(0).attr('src');
	    console.log(newSpotImg); 
	    $('#mySchedule').append('<li class="block spotinfo" spotid="'+newSpotID+'" name="'+newSpotName+'" zoom="1.0" lat="'+newSpotLat+'" lon="'+newSpotLon+'" address="'+newSpotAddress+'"spotin = "1" info="'+newSpotText+'"><a href="javascript:lightbox(\''+newSpotName+'\')">'+newSpotName+'</a><img src="'+newSpotImg+'"height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+newSpotMin+'~'+newSpotMax+'hr</div></div></li>')
		if(size > 0){
		var origin_before = $('#mySchedule > li').last().prev().attr('address');
		//console.log("origin_before = ");
		//console.log(origin_before);

		var destination_before = $('#mySchedule > li').last().attr("address");
		//console.log($('#mySchedule > li').last().next());
		//console.log("destination_before = ");
		//console.log(destination_before);

		var traffic_id_before = "";
		traffic_id_before = "traffic_" + origin_before;
		traffic_id_before += "_";
		traffic_id_before += destination_before;

		if($('#mySchedule > li').last() != null){
			//console.log("AAAAAA");
			$('<li class="trans ui-state-disabled" id="' + traffic_id_before + '"></li>').insertBefore($('#mySchedule > li').last());
		}
		calculateDistances_walking(origin_before,destination_before,traffic_id_before);
		}
	
}
	/*
    var newSpotIn = $('#infoWindow ul li p').eq(5).html(); 
    //if 已經在schedule則不append 可以用img判斷
    if (newSpotIn != 1){//增加進去後就會不行再增加
   	var newSpotName = $('#infoWindow ul li a').html();
    var newSpotID = $('#infoWindow ul li p').html();
    var newSpotLat = $('#infoWindow ul li p').eq(1).html();
    var newSpotLon = $('#infoWindow ul li p').eq(2).html();
    var newSpotAddress = $('#infoWindow ul li p').eq(3).html();
    var newSpotText = $('#infoWindow ul li p').eq(4).html(); 
    $('#mySchedule').append('<li class="block spotinfo" id="'+newSpotID+'" name="'+newSpotName+'" zoom="1.0" lat="'+newSpotLat+'" lon="'+newSpotLon+'" address="'+newSpotAddress+'" info="'+newSpotText+'" spotin = "1" style="z-index: 3; "><a href="javascript:lightbox(\''+newSpotName+'\')">'+newSpotName+'</a><img src="/img/1" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">4hr</div></div></li>')
    //this.setIcon("http://maps.google.com/mapfiles/markerB.png");//加入schedule 後要改變圖示
	$('#infoWindow ul li p').eq(5).html("1");
	}*/
	
}

