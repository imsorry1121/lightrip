/*別人的function*/

function createCookie(name,value,days) {
 if (days) {
  var date = new Date();
  date.setTime(date.getTime()+(days*24*60*60*1000));
  var expires = ""; 
  expires=""+date.toGMTString();
 }
 else var expires = "";
 document.cookie = name + "=" + value + "; expires=" + expires;  

}

//讀取cookie
function GetCookie(name)
//讀取Cookie的原始值
{
    var bef = document.cookie.indexOf(name);
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0 + bef;
    while (i < clen) {
        var j = i + alen + bef;
        if (document.cookie.substring(i, j) == arg)
            return GetCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function GetCookieVal(offset)
//獲得Cookie解码后的值
{
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    var schedule =  unescape(document.cookie.substring(offset, endstr));
    //document.cookie = document.cookie.substring(0, offset-1);
    return schedule
}


//刪除cookie
function DeleteCookie(name) {
 createCookie(name,"",-1);
}