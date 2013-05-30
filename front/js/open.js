function myAjax() {
	var xmlHttp = new XMLHttpRequest();
	var url="serverStuff.php";
	var parameters = "first=barack&last=obama";
	xmlHttp.open("POST", url, true);

	//Black magic paragraph
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", parameters.length);
	xmlHttp.setRequestHeader("Connection", "close");

	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			document.getElementById('ajaxDump').innerHTML+=xmlHttp.responseText+"<br />";
		}
	}

	xmlHttp.send(parameters);
}