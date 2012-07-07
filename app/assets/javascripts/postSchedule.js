function postSchedule(){
    if ($('#userid').html()!=null){
        if ($('#mySchedule').html().trim()==""){
          warning("No spots");
        }
        else{
          //sleep(1);
          save();

      	//$("body").append("<div class='bg'></div>");
        //alert($('#mySchedule img').first().attr('src'));
//        $('.body').click(function(){
		      lightbox("<h2>" + $('#schedule_name').html() + "</h2><img src='" + $('#mySchedule img').first().attr('src') + "'/><p>為您的行程加點註解</p><textarea class='description' row='10' cols ='25'></textarea><p><input id ='postfb' type='button' class='clickme' value='Post the schedule to facebook'/></p>");
//如果沒有行程會出錯
  $("body").append("<div class='bg'></div>");
		//$('.fbfriend2').append('<p>'+friendname+'</p>');
      	   $("#postfb").click(function() {
          var title = $('.framebox h2').html();
          var description = $('.description').val();
      		var src = $('.framebox img').attr('src');
      		post(title, description, src);
      	});  //})
        }
    }
	  else{
      console.log($('#userid').html());
      warning("please login first");
      $(".menu").hide();
      $("#buttonFrame").hide();
      $(".firstpage").show();
      $("#menu").show();
    }
}

function post(title, description, src){
	//alert(title);
  //alert(description);
  //alert(src);
    var sid = $('#sid').html();
    //alert(sid);
      $.ajax({
        type: 'GET',
        data: { user: $('p#userid').html(),
            title: title, 
        		description: description,
         		src: src,
            sid: sid
        },
        url: "/post",
        datatype: 'json',
        success: function(data, textSatus){
          warning("Post successfully!");
          $(".lightbox").remove();
        }
      });	

    }


