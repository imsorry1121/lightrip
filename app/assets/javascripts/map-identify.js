function spanid(CityName,point1,point2){
	//alert('hello');
        document.getElementById('CityName').innerHTML = CityName;
        
}
function spanidrestore(CityName){
        document.getElementById('chosenSpots').innerHTML = CityName;

        //複選!! 之後可以考慮加上去

        /*if ( !$("area[title='" + CityName + "']").attr('class') ){
          $("area[title='" + CityName + "']").addClass('selected');
          document.getElementById('chosenSpots').innerHTML += CityName + " ";
        }
        else {
          var deleteChar = CityName + " ";

          document.getElementById('chosenSpots').innerHTML = document.getElementById('chosenSpots').innerHTML.replace(new RegExp(deleteChar),"");
          $("area[title='" + CityName + "']").removeClass;
          //alert('suc!');
        } */
        //alert("selected");
}
function getcityvalue()
{
  var CityName = $('#chosenSpots').html();
  var city_value = 0;

          if(CityName == "台北市")
          {
            city_value = 1;

          }
          else if(CityName == "台中市" || CityName == "台中縣")
          {
            city_value = 2;

          }
          else if(CityName == "高雄市" || CityName == "高雄縣")
          {
            city_value = 3;
          }  
          else
          {
            city_value = 0;
          }

          return city_value;

}

