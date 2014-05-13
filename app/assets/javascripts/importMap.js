google.load("jquery", "1.7");
google.load("jqueryui", "1.8");
google.setOnLoadCallback(function() {
	$('#main').css('-moz-user-select', 'none'); //禁止fx選取文字
	$('#main').get(0).onselectstart = function(){return false;}; //禁止IE選取文字
	
	var temp_counter = 0;
	// 所有行程
	$(function() {
		//$( "#main" ).tabs();

		//placeholder 會出現在
		$( "#droppable" ).droppable({
			drop: function( event, ui ) {
				$( "#droppable" ).hide();
				// if(ui.placeholder.prev().attr('class')=="")
				// $( '.ui-sortable-helper' ).remove();
				$( '.ui-sortable-placeholder' ).remove();
			}
		});


		$( "#mapFrame, #mySchedule" ).sortable({  //mapframe need to be sortable?	
			cancel: ".ui-state-disabled", //cancel 後call就會跳過
			sort: function(event, ui){
				
			},
			start: function(event, ui) {
				$('#droppable').show();
				var pos = ui.placeholder.index();
				console.log("the pos before change is :"+ pos);
				ui.placeholder.data('pos', pos);

				//如果是最上或是最下面


			},
			change: function(event, ui) {
				//全部用位置最快，可是因為有helper很奇怪
//網上change要刪下面的
var prePos = ui.placeholder.data('pos');
var nowPos = ui.placeholder.index();
console.log("the pos after change is:" +nowPos);
//如果是本來最上最下 原本不用算，直接刪掉
//如果本來不是，則要拿出下一個下三個或下兩個出來
ui.placeholder.next(".trans").remove();
ui.placeholder.prev(".trans").remove();
if(prePos>nowPos){
	console.log("move up");
	ui.placeholder.nextAll(".trans").first().remove();
	ui.placeholder.nextAll(".trans").first().remove();

	var bhelperAddress = ui.placeholder.next().attr("address");
	var afterAddress = ui.placeholder.next().next.attr("address");

	if(bhelperAddress!= undefined && ahelperAddress!=undefined){
		var traffic_id = "";
		traffic_id = "traffic_" + bhelperAddress;
		traffic_id += "_";
		traffic_id += ahelperAddress;
		$('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>').insertAfter(ui.helper);
		calculateDistances_walking(bhelperAddress, ahelperAddress, traffic_id);
	}
}
if(prePos<nowPos){
	console.log("move down");
	ui.placeholder.prev().next(".trans").remove();
	ui.placeholder.next().next(".trans").remove();

}

nowPos = ui.placeholder.index();
ui.placeholder.data('pos', nowPos);


/*ui.helper.prev('.trans').remove();
ui.helper.next('.trans').remove();
var bhelperAddress = ui.helper.prev().attr("address");
var ahelperAddress = ui.helper.next().attr("address");
				if(bhelperAddress!= undefined && ahelperAddress!=undefined){//如果沒有表示為第一第二
					var traffic_id = "";
					traffic_id = "traffic_" + bhelperAddress;
					traffic_id += "_";
					traffic_id += ahelperAddress;
					$('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>').insertAfter(ui.helper);
					calculateDistances_walking(bhelperAddress, ahelperAddress, traffic_id);
				}


				ui.placeholder.prev('.trans').remove();
				ui.placeholder.next('.trans').remove();
				// var beforeAddress = ui.placeholder.prevAll('[address]').first().attr("address");
				// var afterAddress = ui.placeholder.nextAll('[address]').first().attr("address");
				var beforeAddress = ui.placeholder.prev().attr("address");
				var dragAddress = ui.helper.attr('address');

				var afterAddress = ui.placeholder.next().attr("address");
				console.log("Address: from"+beforeAddress+" to " +dragAddress+" to "+afterAddress);


				if (beforeAddress!=undefined){
					var traffic_id_before = "";
					traffic_id_before = "traffic_" + beforeAddress;
					traffic_id_before += "_";
					traffic_id_before += dragAddress;
					$('<li class="trans ui-state-disabled" id="' + traffic_id_before + '"></li>').insertBefore(ui.placeholder);
					calculateDistances_walking(beforeAddress, dragAddress, traffic_id_before);
				}

				if (afterAddress!=undefined){
					var traffic_id_before2 = "";
					traffic_id_before2 = "traffic_" + dragAddress;
					traffic_id_before2 += "_";
					traffic_id_before2 += afterAddress;
					$('<li class="trans ui-state-disabled" id="' + traffic_id_before2 + '"></li>').insertAfter(ui.placeholder);
					calculateDistances_walking(beforeAddress, dragAddress, traffic_id_before2);
				}*/

			},
			
			stop: function(event, ui) {
				$('#droppable').hide();

			}
		}).disableSelection();

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

(function($){
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
})(jQuery);
