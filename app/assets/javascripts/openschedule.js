function openschedule(){
  if ($('#userid').html()!=null){
	//alert("open!!");
    warning2("Save the schedule?"); 
  }
      else{
      console.log($('#userid').html());
      warning("Please login first");
      $(".menu").hide();
      $("#buttonFrame").hide();
      $(".firstpage").show();
      $("#menu").show();
    }
}

function opentrasmit(){
  $.ajax({
        type: 'GET',
        data: { user: $('p#userid').html()},
        url: "/open",
        datatype: 'json',
        success: function(data, textSatus){
            var content = "";
            var one_schedule = "";
            console.log("open data",data);
            content += '<div><ul id="open_schedule_frame">';
            
            $(data).each(function(index, element){
              one_schedule += "<li class='record' id='record_"+index+"'><div class='content'><h3>";
              one_schedule += element['schedule_name'];
              one_schedule += "</h3>";
              var schedule = JSON.parse(element['content']);          
                  $.each(schedule, function(index, element){
                    if(schedule[index]['method'] != null)
                    {
                        //one_schedule += '<p class="spot_node">';  //顯示景點
                        one_schedule += '<div class="spot_name">';
                        one_schedule += schedule[index]['name'];
                        one_schedule += '</div>';
                    }
                    else
                    {
                       //one_schedule += '<p class="spot_node">';  //顯示景點
                        one_schedule += '<div class="spot_name">';
                        one_schedule += schedule[index]['name'];
                        one_schedule += '</div>';
                    }
                  });
                  one_schedule += "<ul class='icon-frame'><li class='ui-state-default ui-corner-all' id='open_schedule_" + index + "'><span class='ui-icon ui-icon-check'></span></li><li class='ui-state-default ui-corner-all' id='delete_schedule_" + index + "'><span class='ui-icon ui-icon-close'></span></li></ul>";
                  one_schedule += "</div>";
                  one_schedule += "</li>";
                  content += one_schedule;
                  one_schedule = ""; 
            });
              content += '</ul></div>';
              lightbox(content);
          
              $(data).each(function(index,element){
                $("#delete_schedule_" + index).click(function(){
                    $("#record_" + index).remove();
                    $.ajax({
                        type: 'POST',
                        data: {sid: element['id']},
                        url: "/remove",
                        datatype: 'json',
                        success: function(data, textSatus){
                          alert("remove success");}
                    });
                });
                              $("#open_schedule_" + index).click(function(){
                                console.log(data[index]);
                                warning("Schedule load");
                                clearschedule();
                                $(".lightbox").remove();//處裡消掉的東西
                                $(".bg").remove();//嵌入body裡面會不會比較好
                                $('#sid').html(data[index]['id']); //data[index]['id']
                                var opendata = JSON.parse(data[index]['content']);
                                console.log("opendata",opendata);
                                $(opendata).each(function(i, onedata){
                                  if(onedata['method'] != null){
                                    var temp_string = '<li class="block spotinfo" spotid="' + onedata['spotid'] + '" name="' + onedata['name'] + '" zoom="' + onedata['zoom'] + '" lat="' + onedata['lat'] + '" lon="' + onedata['lon'] + '" address="' + onedata['address'] + '" spotin="' + onedata['spotin'] + '" info="' + onedata['info']+ '" ><a href=javascript:lightbox("' + onedata['name'] + '")>' + onedata['name'] + '</a></li>'
                                    console.log("temp====" , temp_string);
                                    $('ul#mySchedule').append(temp_string);
                                    var origin1 = onedata['address'];
                                    var destinationA = opendata[i+1]['address'];
                                    var traffic_id = "";
                                    traffic_id = "traffic_" + origin1;
                                    traffic_id += "_";
                                    traffic_id += destinationA;
                                    return_value = 0;
                                      //$('ul#mySchedule').append('<li class="trans ui-state-disabled" id="trans_' + data[i]['id'] + '"><div id="outputDiv_'+origin1+'_'+destinationA+'">default</div></li>');
                                      $('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
                                    if(onedata['method'] == 'walking'){
                                        calculateDistances_walking(origin1,destinationA,traffic_id);
                                    }
                                    else{
                                      calculateDistances_driving(origin1,destinationA,traffic_id);
                                    }
                                    $('li[spotid = "' + onedata['spotid'] + '"]' ).append('<img src="/img/' + onedata['spotid'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+onedata['travel_time_content']+'</div></div>');
                                  }
                                  else{
                                    var temp_string = '<li class="block spotinfo" spotid="' + onedata['spotid'] + '" name="' + onedata['name'] + '" zoom="' + onedata['zoom'] + '" lat="' + onedata['lat'] + '" lon="' + onedata['lon'] + '" address="' + onedata['address'] + '" spotin="' + onedata['spotin'] + '" info="' + onedata['info']+ '" ><a href=javascript:lightbox("' + onedata['name'] + '")>' + onedata['name'] + '</a></li>'
                                    //console.log("temp====" , temp_string);
                                    $('ul#mySchedule').append(temp_string);
                                    $('li[spotid = "' + onedata['spotid'] + '"]' ).append('<img src="/img/' + onedata['spotid'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+onedata['travel_time_content']+'</div></div>');
                                  }
                                });
                              });
              });
    }
  });
}


function openschedule_share(s1){
  // alert("open_share!!");
  clearschedule();   // 清空schedule
  $(".firstpage").hide();
  $(".menu").hide();
  $("#scheduleFrame").show();
  $("#buttonFrame").show();



  var schedule = JSON.parse(s1);

  //console.log("schedule[0]",schedule[0]);

  //console.log(data[index]);
  // alert("schedule_append");

  $(schedule).each(function(i, onedata){

        if(onedata['method'] != null)
        {

var temp_string = '<li class="block spotinfo" spotid="' + onedata['spotid'] + '" name="' + onedata['name'] + '" zoom="' + onedata['zoom'] + '" lat="' + onedata['lat'] + '" lon="' + onedata['lon'] + '" address="' + onedata['address'] + '" spotin="' + onedata['spotin'] + '" info="' + onedata['info']+ '" ><a href=javascript:lightbox("' + onedata['name'] + '")>' + onedata['name'] + '</a></li>'
console.log("temp====" , temp_string);
$('ul#mySchedule').append(temp_string);

var origin1 = onedata['address'];
var destinationA = schedule[i+1]['address'];
var traffic_id = "";
traffic_id = "traffic_" + origin1;
traffic_id += "_";
traffic_id += destinationA;
return_value = 0;
$('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
        if(onedata['method'] == 'walking')
        {
          calculateDistances_walking(origin1,destinationA,traffic_id);
        }
        else
        {
          calculateDistances_driving(origin1,destinationA,traffic_id);

        }
        $('li[spotid = "' + onedata['spotid'] + '"]' ).append('<img src="/img/' + onedata['spotid'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+onedata['travel_time_content']+'</div></div>');
        }
        else
        {
        var temp_string = '<li class="block spotinfo" spotid="' + onedata['spotid'] + '" name="' + onedata['name'] + '" zoom="' + onedata['zoom'] + '" lat="' + onedata['lat'] + '" lon="' + onedata['lon'] + '" address="' + onedata['address'] + '" spotin="' + onedata['spotin'] + '" info="' + onedata['info']+ '" ><a href=javascript:lightbox("' + onedata['name'] + '")>' + onedata['name'] + '</a></li>'
        //console.log("temp====" , temp_string);
        $('ul#mySchedule').append(temp_string);

        /*var origin1 = onedata['address'];
        var destinationA = opendata[i+1]['address'];
        var traffic_id = "";
        traffic_id = "traffic_" + origin1;
        traffic_id += "_";
        traffic_id += destinationA;
        return_value = 0;
          //$('ul#mySchedule').append('<li class="trans ui-state-disabled" id="trans_' + data[i]['id'] + '"><div id="outputDiv_'+origin1+'_'+destinationA+'">default</div></li>');
          $('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
        calculateDistances_walking(origin1,destinationA,traffic_id);
        */
        $('li[spotid = "' + onedata['spotid'] + '"]' ).append('<img src="/img/' + onedata['spotid'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+onedata['travel_time_content']+'</div></div>');


        //$('ul#mySchedule').append('<li class="block spotinfo">'+'lastone'+onedata['name']+'</li>');
         }
  })  
}