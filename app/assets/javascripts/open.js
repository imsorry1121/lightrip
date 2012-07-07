// function openschedule(){

// 	alert("open!!");
//     $.ajax({
//     type: 'GET',
//     data: { user: $('p#userid').html()//,
//      // schedule_name: $('h2#schedule_name').html(),//,
//      // content: JSON.stringify(content)
//      //attr4: $( "#amount4" ).val(),
//      //attr5: $( "#amount5" ).val()
//     },
//     //$( "#amount" ).html(),
//     url: "/open",
//     //url: "http://lightrip-cytms.herokuapp.com/step3",
//     datatype: 'json',
//     success: function(data, textSatus){
//       alert("open successfully!");

//       var content = "";
//       var one_schedule = "";

//       $(data).each(function(index, element){

//         one_schedule += "<div class='record'><ul><h2>";
//           one_schedule += element['schedule_name'];
//           one_schedule += "</h2>"
//           var schedule = JSON.parse(element['content']);
          
//           $.each(schedule, function(index, element){
//             //one_schedule += '<li>';
//             // one_schedule += '<ul>';
//             //one_schedule +=
            
//             if(schedule[index]['method'] != null)
//             {
//                 one_schedule += '<li class="spot_node">';  //顯示景點

//                   one_schedule += '<div class="spot_name">';
//                   one_schedule += schedule[index]['name'];
//                   one_schedule += '</div>';

//                 one_schedule += '</li>';



//                 /*one_schedule += '<li class="spot_traffic">';  //顯示交通資訊

//                   one_schedule += '<div class="traffic_info">';
//                     one_schedule += '<div class="traffic_method">';
//                     one_schedule += schedule[index]['method'];
//                     one_schedule += '</div>';

//                     one_schedule += '<div class="traffic_duration">';
//                     one_schedule += schedule[index]['time_text'];
//                     one_schedule += '</div>';
//                   one_schedule += '</div>';*/


//                 one_schedule += '</li>';


//             }
//             else
//             {
//                one_schedule += '<li class="spot_node">';  //顯示景點

//                   one_schedule += '<div class="spot_name">';
//                   one_schedule += schedule[index]['name'];
//                   one_schedule += '</div>';

//                 one_schedule += '</li>';
//               //one_schedule += schedule[index]['name'];

//             }
            
//             //one_schedule += '<div class="name">' + schedule[index]['content'] + '</div>';
//             //one_schedule += '<div class="name">' + schedule[index]['name'] + '</div>';


//             // one_schedule += '</ul>';
//             // one_schedule += '</li>';


//           });

//         one_schedule += "</ul>";

//         //one_schedule +="<div onclick='schedule_append();'>open the schedule</div>"
//         one_schedule += "<div id='open_schdule_" + index + "'>open the schedule</div>";

//         one_schedule += "</div>";




//       	content += one_schedule;
//         one_schedule = ""; 
//       });


//       alert('new');
//       lightbox(content);	


//       $(data).each(function(index,element){

//       $("#open_schdule_" + index).click(function() {

          //warning("Loading schedule");
            /*詢問是否要儲存現在的schedule??*/

//           console.log(data[index]);
//           alert("schedule_append");
//             /*詢問是否要儲存現在的schedule??*/

          
//           clearschedule();
//           $(".lightbox").remove();//處裡消掉的東西
//           $(".bg").remove();//嵌入body裡面會不會比較好

//           $('#sid').html(data[index]['id']); //data[index]['id']
//           //console.log('sid',data[index]['id']);

//           //console.log("sid(html):" + $('#sid').html());
          
//           var opendata = JSON.parse(data[index]['content']);
//           console.log("opendata",opendata);
          
//           $(opendata).each(function(i, onedata){

//             if(onedata['method'] != null)
//             {
//               //spot!!
//               //$('ul#mySchedule').append('<li class="block spotinfo" spotid="' + opendata['spotid'] + '" name="' + opendata['name'] + '" zoom="' + data[i]['zoom'] + '" lat="' + data[i]['lat'] + '" lon="' + data[i]['lon'] + '" address="' + data[i]['address'] + '" spotin="' + data[i]['attr1'] + '" info="' + data[i]['info']+ '" ><a href=javascript:lightbox("' + data[i]['name'] + '")>' + data[i]['name'] + '</a></li>');
//               $('ul#mySchedule').append('<li class="block spotinfo">'+onedata['name']+'</li>');
//               console.log("onedata---name", onedata['name']);

//               $('ul#mySchedule').append('<li class="trans ui-state-disabled" id="1">'+onedata['time_text']+'</li>');
//             }
//             else
//             {
//               //traffic info
//               $('ul#mySchedule').append('<li class="block spotinfo">'+'lastone'+onedata['name']+'</li>');

//             }
            

//           })

//           // for ( var i = 0; i < data[index].length ; i++) {
            
//           //   $('ul#mySchedule').append('<li class="block spotinfo" spotid="' + data[i]['id'] + '" name="' + data[i]['name'] + '" zoom="' + data[i]['zoom'] + '" lat="' + data[i]['lat'] + '" lon="' + data[i]['lon'] + '" address="' + data[i]['address'] + '" spotin="' + data[i]['attr1'] + '" info="' + data[i]['info']+ '" ><a href=javascript:lightbox("' + data[i]['name'] + '")>' + data[i]['name'] + '</a></li>');
//           //   if( i != (data.length - 1)){
//           //     var origin1 = data[i]['address'];
//           //     var destinationA = data[(i+1)]['address'];
//           //     var traffic_id = "";
//           //     traffic_id = "traffic_" + origin1;
//           //     traffic_id += "_";
//           //     traffic_id += destinationA;
//           //     return_value = 0;
                
//           //       $('ul#mySchedule').append('<li class="trans ui-state-disabled" id="' + traffic_id + '"></li>');
//           //     calculateDistances_walking(origin1,destinationA,traffic_id);
              

//           //   }
//           //   $('li[spotid = "' + data[i]['id'] + '"]' ).append('<img src="/img/' + data[i]['id'] + '" height="60%" width="90%"><div class="travel_time_space"><div class="travel_time_content">'+data[i]['MinTime']+'~'+data[i]['MinTime']+'hr</div></div>');
//           // }



//         })


//       })


//     }
//   });

	

// }



// function schedule_append(){

//   alert("schedule_append");
//   /*詢問是否要儲存現在的schedule??*/
//   /*消去lightbox*/
//   clearschedule();
//   $(".lightbox").remove();//處裡消掉的東西
//   $(".bg").remove();//嵌入body裡面會不會比較好


//   var data = $.cookie("open_schedule_data");
//   console.log("data", data);


//   $.cookie("open_schedule_data", null);  //清空上次用來占存server回傳data的cookie



// } 
