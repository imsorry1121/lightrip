function reload(schedule){
	clearschedule();   // 清空schedule
	changetomyschedule();
    /*for ( var i = 0; i < schedule.length ; i++) {
						$('ul#mySchedule').append('<li class="block spotinfo" spotid="' + data[i]['id'] + '" name="' + data[i]['name'] + '" zoom="' + data[i]['zoom'] + '" lat="' + data[i]['lat'] + '" lon="' + data[i]['lon'] + '" address="' + data[i]['address'] + '" spotin="' + data[i]['attr1'] + '" info="' + data[i]['info']+ '" ><a href=javascript:lightbox("' + data[i]['name'] + '")>' + data[i]['name'] + '</a></li>');
						if( i != (schedule.length - 1)){
							var origin1 = data[i]['address'];
							var destinationA = data[(i+1)]['address'];
							var traffic_id = "";
							traffic_id = "traffic_" + origin1;
							traffic_id += "_";
							traffic_id += destinationA;
							return_value = 0;
								//$('ul#mySchedule').append('<li class="trans ui-state-disabled" id="trans_' + data[i]['id'] + '"><div id="outputDiv_'+origin1+'_'+destinationA+'">default</div></li>');
								$('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
							calculateDistances_walking(origin1,destinationA,traffic_id);
							//console.log("traffic_id: " + traffic_id);

						}
						$('li[spotid = "' + data[i]['id'] + '"]' ).append('<img src="/img/' + data[i]['id'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+data[i]['MinTime']+'~'+data[i]['MinTime']+'hr</div></div>');
	}*/
}