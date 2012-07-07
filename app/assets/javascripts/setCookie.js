function setCookie(){
	$('#cookie_or_not').click(function(){
		var name = "temp"
		var value = $('#mySchedule').html();
		value = value.trim();
		value1 = value.replace(/\"/g, "dbq");
		value2 = value1.replace(/;/g, "qwerewq");
		createCookie(name, value2, 1);
	});
}
function loadfromCookie(){
	var result = GetCookie("temp");
	if (result != null){
	var result2 = result.replace(/dbq/g, "\"");
	var result3 = result2.replace(/qwerewq/g, ";");
	}
	DeleteCookie("temp");
	return result3;
}