function warning(message){

	$("body").append("<div class='bg'></div>");
	$("body").append("<div class='warning'><h1>" + message + "</h1></div>");
	$(".warning").fadeOut(3000);
	$(".bg").fadeOut(3000);
	$(".body").click(function() {
		$(".warning").remove();//處裡消掉的東西
		$(".bg").remove();//嵌入body裡面會不會比較好
	});
}

function warning2(message){
	$("body").append("<div class='bg'></div>");
	$("body").append("<div class='warning'><h1>" + message + "</h1><input class='clickme' type='button' value='save' onclick='save();opentrasmit();'/><input class='clickme' type='button' value='ignore' onclick='omit()' ></div>");
}
function warning3(message){
	$("body").append("<div class='bg'></div>");
	$("body").append("<div class='warning'><h1>" + message + "</h1></div>");
	$(".warning").fadeOut(3000);
}

function omit(){
	$(".warning").remove();//處裡消掉的東西
	$(".bg").remove();//嵌入body裡面會不會比較好
	opentrasmit();
}

