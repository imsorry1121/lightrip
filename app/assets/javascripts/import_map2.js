/*整理過後*/
google.load("jquery", "1.7");
google.load("jqueryui", "1.8");

google.setOnLoadCallback(function() {
	$('#main').css('-moz-user-select', 'none'); //禁止fx選取文字
	$('#main').get(0).onselectstart = function(){return false;}; //禁止IE選取文字
	
	var temp_counter = 0;
	var spotId=0;
	// 所有行程
	$(function() {
		//$( "#main" ).tabs();
		$( "#droppable" ).droppable({
			drop: function( event, ui ) {
				console.log("drop");
				// ui.helper.remove();
				$( '.ui-sortable-helper' ).remove();
				console.log("drop over");
				$( "#droppable" ).hide();
			}
		});

		$( "#mySchedule" ).sortable({ 
			cancel: ".ui-state-disabled",
			start: function(event, ui) {
				$('#droppable').show();
				spotId = ui.helper.attr("spotid");
					ui.helper.prev(".ui-state-disabled").remove();//沒有也沒關係
					ui.placeholder.next(".ui-state-disabled").remove();
					var originC = ui.helper.prev().attr('address');
					var destinationC = ui.placeholder.next().attr('address');

					if(originC!=undefined&&destinationC!=undefined){
						var traffic_id = "";
						traffic_id = "traffic_" + originC;
						traffic_id += "_";
						traffic_id += destinationC;
						$('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>').insertAfter(ui.placeholder);
						calculateDistances_walking(originC,destinationC,traffic_id);
					}			
				}, 

				stop: function(event, ui) {
					console.log("stop");
					$('#droppable').hide();
					console.log(ui.placeholder.attr("style"));

					console.log($("#mySchedule [spotid='"+spotId+"']").length);
					if($("#mySchedule [spotid='"+spotId+"']").length>0){//O表示drop掉了，否則要增加交通
						ui.item.prev(".ui-state-disabled").remove();
						ui.item.next(".ui-state-disabled").remove();

						if($('ul#mySchedule li:first').attr('address') == ui.item.attr('address'))
						{
							console.log("stop at the first one");

							var origin_after = ui.item.attr("address");
							console.log("origin_after = ");
							console.log(origin_after);

							var destination_after = ui.item.next().attr('address');
							console.log("destination_after = ");
							console.log(destination_after);

							var traffic_id_after = "";
							traffic_id_after = "traffic_" + origin_after;
							traffic_id_after += "_";
							traffic_id_after += destination_after;

							$('<li class="trans ui-state-disabled" id="' + traffic_id_after + '"></li>').insertAfter(ui.item);
							calculateDistances_walking(origin_after,destination_after,traffic_id_after);
						}
						else if ($('ul#mySchedule li:last').attr('address') == ui.item.attr('address'))
						{
							console.log("stop at the last one");

							var origin_before = ui.item.prev().attr('address');
							console.log("origin_before = ");
							console.log(origin_before);

							var destination_before = ui.item.attr("address");
							console.log("destination_before = ");
							console.log(destination_before);

							var traffic_id_before = "";
							traffic_id_before = "traffic_" + origin_before;
							traffic_id_before += "_";
							traffic_id_before += destination_before;
							$('<li class="trans ui-state-disabled" id="' + traffic_id_before + '"></li>').insertBefore(ui.item);
							calculateDistances_walking(origin_before,destination_before,traffic_id_before);

						}
						else
						{
							console.log("stop at the middle");
							var origin_before = ui.item.prevAll(".spotinfo").first().attr('address');
							console.log("origin_before = ");
							console.log(origin_before);

							var destination_before = ui.item.attr("address");

							console.log("destination_before = ");
							console.log(destination_before);


							var origin_after = ui.item.attr("address");
							console.log("origin_after = ");
							console.log(origin_after);

							var destination_after = ui.item.nextAll(".spotinfo").first().attr('address');

							console.log("destination_after = ");
							console.log(destination_after);


							var traffic_id_before = "";
							traffic_id_before = "traffic_" + origin_before;
							traffic_id_before += "_";
							traffic_id_before += destination_before;

							var traffic_id_after = "";
							traffic_id_after = "traffic_" + origin_after;
							traffic_id_after += "_";
							traffic_id_after += destination_after;

							$('<li class="trans ui-state-disabled" id="' + traffic_id_before + '"></li>').insertBefore(ui.item);
							calculateDistances_walking(origin_before,destination_before,traffic_id_before);
							$('<li class="trans ui-state-disabled" id="' + traffic_id_after + '"></li>').insertAfter(ui.item);
							calculateDistances_walking(origin_after,destination_after,traffic_id_after);

						}	
					}
				}
			}).disableSelection();




		/*$(".block").resizable({
			maxHeight: 300,
			maxWidth: 150,
			minHeight: 40,
			minWidth: 150,
		});*/

		/*$(".active").click(function() {
			//$("form").submit();
			$(".menu").hide();//嵌入body裡面會不會比較好
			$("#scheduleFrame").show();
			$("#buttonFrame").show();
			$(".firstpage").hide();
		});*/
$("#map").hide();
$("#b2").click(function() {
	$(".menu").hide();

			//$(".firstpage").show();
			$("#scheduleFrame").show();
			$("#map").hide();
			$("#myMap").show();
			$(".firstpage").hide();
			$("#buttonFrame").show();
			//嵌入body裡面會不會比較好
		});
$("#b3").click(function() {
	$(".menu").hide();
	$(".firstpage").show();
	$("#menu").show();
	$("#buttonFrame").hide();

			//嵌入body裡面會不會比較好
		});

		//$( "#main" ).tabs();

		//$("#drag").draggable();
	});
});

//lightbox
function lightbox(content) {
	
	$("body").append("<div class='bg'></div>");
	$("body").append("<div class='lightbox'><div class='framebox'>" + content + "</div></div>");
	$(".lightbox").fadeIn(1000);
	$(".framebox").fadeIn(1000);
	$(".bg").click(function() {
		$(".lightbox").remove();//處裡消掉的東西
		$(".bg").remove();//嵌入body裡面會不會比較好
		
	});
}

$(function() {
	$( "#eq > span" ).each(function() {
	// read initial values from markup and remove that
	var value = parseInt( $( this ).text(), 10 );
	$( this ).empty().slider({
		value: value,
		range: "min",
		animate: true,
		orientation: "vertical",
		stop: function(event, ui) {
			$(this).attr('val',ui.value);

		}
	});
});
});

$(document).ready(function(){
	$('.active').click(function(){
			clearschedule();   // 清空schedule
			
			

			var city_value;
			//afunction();
			city_value = getcityvalue();  //To translate city into city_value >> In map-identify.js 
			if(city_value == 0)
			{
				alert("尚未選擇城市或選擇了無效縣市(請選擇 台北、台中、高雄)")
				// $(".firstpage").show();
				// $(".menu").show();
				// $("#scheduleFrame").hide();
				// $("#buttonFrame").hide();
			}
			else
			{
				$(".firstpage").hide();
				$(".menu").hide();
				$("#scheduleFrame").show();
				$("#buttonFrame").show();
				

				$.ajax({
					type: 'GET',
					data: { 
						attr1: $( "#amount1" ).attr('val'),
						attr2: $( "#amount2" ).attr('val'),	
						attr3: $( "#amount3" ).attr('val'),	
						attr4: $( "#amount4" ).attr('val'),	
						attr5: $( "#amount5" ).attr('val'),	
						city: city_value
					},
				//$( "#amount" ).html(),
				url: "/step3",
				//url: "http://lightrip-cytms.herokuapp.com/step3",
				datatype: 'json',
				success: function(data, textSatus){
					console.log(data);
					//alert("ajax success");
					//$(".firstpage").hide();//處裡消掉的東西
					//$(".menu").hide();//嵌入body裡面會不會比較好
					//$("#scheduleFrame").show();
					//$("#buttonFrame").show();
					//$("li.block:even").append()
					//$('li.block:odd').append("<a href=javascript:lightbox('hahaha')>"+data['test']+"</a>");
					for ( var i = 0; i < data.length ; i++) {
						if( data[i]['attr1'] != 1)//做屬性的判斷
						{
							continue;
						}
						var nowSpot = data[i]; //把資料放進schedule
						var nowAddress = new google.maps.LatLng(nowSpot['lat'], nowSpot['lon']);
						// $('ul#mySchedule').append('<li class="block spotinfo" spotid="' + data[i]['id'] + '" name="' + data[i]['name'] + '" zoom="' + data[i]['zoom'] + '" lat="' + data[i]['lat'] + '" lon="' + data[i]['lon'] + '" address="' + data[i]['address'] + '" spotin="' + data[i]['attr1'] + '" info="' + data[i]['info']+ '" ><a href=javascript:lightbox("' + data[i]['name'] + '")>' + data[i]['name'] + '</a><br/></li>');
						$('#mySchedule').append('<li class="block spotinfo" spotid="'+nowSpot['id']+'" name="'+nowSpot['name']+'" zoom="1.0" lat="'+nowSpot["lat"]+'" lon="'+nowSpot['lon']+'" address="'+nowAddress+'"spotin = "1" info="'+nowSpot['info']+'"><a href="javascript:lightbox(\''+nowSpot['name']+'\')">'+nowSpot['name']+'</a><img src="img/'+nowSpot['id']+'"height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+nowSpot['MinTime']+'~'+nowSpot['MaxTime']+'hr</div></div></li>')
						if( i != (data.length - 1)){//如果有下一個景點就算交通
							var nextSpot = data[i+1];
							var origin1 = nowAddress;
							var destinationA = new google.maps.LatLng(nextSpot['lat'], nextSpot['lon']);
							console.log(origin1);
							console.log(destinationA);
							// var origin1 = data[i]['address'];
							// var destinationA = data[(i+1)]['address'];
							var traffic_id = "";
							traffic_id = "traffic_" + origin1;
							traffic_id += "_";
							traffic_id += destinationA;
							return_value = 0;
							// if($('#mySchedule > li').last() != null){
								// $('<li class="trans ui-state-disabled" id="' + traffic_id+ '"></li>').insertBefore($('#mySchedule > li').last());
							// }
							$('#mySchedule').append('<li class="trans ui-state-disabled" id="' +traffic_id + '"></li>');
								// $('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
								calculateDistances_walking(origin1,destinationA,traffic_id);
							//console.log("traffic_id: " + traffic_id);

						}
						// $('li[spotid = "' + data[i]['id'] + '"]' ).append('<img src="/img/' + data[i]['id'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+data[i]['MinTime']+'~'+data[i]['MaxTime']+'hr</div></div>');
					}

				}
			});

}
});
});
