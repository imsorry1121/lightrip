/*for sharing schedule undone*/
function share_backstage(fid, uname,sid){

	//uid = '100000114559561';
	//sid = 1;
	//uname = '李品彥';
	$.ajax({
                type: 'POST',
                data: { 
                 fid: fid,
                 sid: sid,
                 uname: uname                
                },
                
                url: "/share_backstage",
               
                datatype: 'json',
                success: function(data, textSatus){
                  alert("share_backstage success" + data);
                  //console.log("data",data);
                  
                  //$('#sid').html(data['id']);
                  //alert("Save successfully! sid: " + $("#sid").html() + "is saved");

                 
                }
    });



}