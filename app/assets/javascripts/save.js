function save(){
      if ($('#userid').html()!=null){
      if ($('#mySchedule').html().trim()==""){
          warning("No spots");
          }
      else{
      var content = save_json();
      if($('#sid').html()== '')
      {
              $.ajax({
                type: 'POST',
                data: { user: $('p#userid').html(),
                 schedule_name: $('h2#schedule_name').html(),//,
                 content: JSON.stringify(content)
                },
                
                url: "/save",
               
                datatype: 'json',
                success: function(data, textSatus){
                  console.log("data",data);
                  
                  $('#sid').html(data['id']);
                  warning("Save successfully!");

                 
                }
              });

      }
      else{
              $.ajax({
                type: 'POST',
                data: { 
                 sid: $('#sid').html(),
                 user: $('p#userid').html(),
                 schedule_name: $('h2#schedule_name').html(),//,
                 content: JSON.stringify(content)
                
                },
                
                url: "/save_rewrite",
               
                datatype: 'json',
                success: function(data, textSatus){
                  console.log("data",data);
                  if(data == null)
                  {
                    alert("the schedule missed")
                    $('#sid').html('');
                    save();
                  }
                  else
                  {
                  warning("Rewrite successfully!");
                  }
                }
              });

      }
    }}
    else{
      console.log($('#userid').html());
      warning("Please login first");
      $(".menu").hide();
      $("#buttonFrame").hide();
      $(".firstpage").show();
      $("#menu").show();
    }
}

function save_new()
{
  $('#sid').html('');
  save();

}



//另存新檔
/*
	function save(){

      if ($('#userid').html()!=null){
      var content = save_json();
      
      $.ajax({
        type: 'POST',
        data: { user: $('p#userid').html(),
         schedule_name: $('h2#schedule_name').html(),//,
         content: JSON.stringify(content)
        
        },
        
        url: "/save",
       
        datatype: 'json',
        success: function(data, textSatus){
          console.log("data",data);
          
          $('#sid').html(data['id']);
          alert("Save successfully! sid: " + $("#sid").html() + "is saved");

         
        }
      });
    }
    else{
      console.log($('#userid').html());
      alert("please login first");
      $(".menu").hide();
      $(".firstpage").show();
      $("#menu").show();
    }
}
*/



function save_json(){
  console.log("save_json");
  var schedule_array = [];
  var temp;
  var aaa;
  var counter = 1;
  $('ul#mySchedule > li').each(function(){
    // console.log(element);
      if( $(this).hasClass('ui-state-disabled') ==false)
      {
        //console.log(counter);
        temp = {
          'spotid' : $(this).attr('spotid'),
          'name' : $(this).attr('name'),
          'zoom' : $(this).attr('zoom'),
          'lat' : $(this).attr('lat'),
          'lon' : $(this).attr('lon'),
          'info' : $(this).attr('info'),
          'spotin' : $(this).attr('spotin'),
          'address' : $(this).attr('address'),
          'travel_time_content' : $(this).children().children('.travel_time_content').html(),
          'method': null,
          'time_text': null,
          'time_value': null
        }
      counter++;
      }
    else
    {
      //console.log(counter);
        console.log("$(this).children().first()",$(this).children().first());
        temp['method'] = $(this).children().first().children('.traffic_right').children().first().html();
        temp['time_text'] = $(this).children().first().children('.traffic_right').children('.duration').html();
        temp['time_value'] = $(this).children().first().children('.traffic_right').children('.duration_value').html();
      schedule_array.push(temp);
      //i ++;
      //console.log(temp);
      temp = null;
      counter++;
    }
    //console.log(temp);
    if ($('ul#mySchedule > li').size() == (counter - 1))
    {schedule_array.push(temp);}//ths last one



})
  return schedule_array;
}
