//$(document).ready(function() {
// tower = loadTower("MOD0");
//});

function loadTower(map) {
	tw = new Tower();

	tower = getFileData('maps/' + map + '.MAP', mapdate);
	tw.Switches = getFileData('maps/' + map + '.switches', readSwitchData);
	tw.Triggers = getFileData('maps/' + map + '.triggers', readSwitchData);
	tw.onload = Run();

	return tw;
}

function getFileData(file_name, callback) {
	var obj = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState===200 ||xmlhttp.readyState===4 || xmlhttp.readyState==="complete"){
			obj = callback(this.response, file_name);
		}
	};
	xmlhttp.open("GET", file_name, false);
	xmlhttp.responseType = "arraybuffer";
	xmlhttp.send();
	return obj;
}
	
function mapdate(evt, file_name) {
		
	//Function to read the orginal Bloodwych PC map data and put it into an array of
	//hex codes so we can convert back to objects ingame.
	
	var uInt8Array = new Uint8Array(evt);

	//The first part of the map files contains to the data about how many levels are stored
	//in the tower file and the Width,Height,OffsetX,OffsetY so the levels can line up correctly
	//for falling though pits or walking down stairs.

		   
	for (x = 0; x < 8; x++) {
		var Level = new Map(uInt8Array[x+8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
		tw.Levels.push(Level);
	}

	var x = 56;
	//var xx = 0;

	for (var i = 0; i < tw.Levels.length; i++) {
		t1 = tw.Levels[i].Width;
		t2 = tw.Levels[i].Height;
		var mdata = [];

		for (myY = 0; myY < t1; myY++) {
			var r = [];
			for (myX = 0; myX < t2; myX++) {
				r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
				x = x + 2;
			}mdata.push(r);}
		tw.Levels[i].Map = mdata;
	}
}
	
function readSwitchData(evt) {
		
	var uInt8Array = new Uint8Array(evt);
	var Switches = [];   
	
	for (x = 0; x < uInt8Array.length; x++) {
		//var test = [uInt8Array[x],uInt8Array[x+1],uInt8Array[x+2],uInt8Array[x+3]];
		Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
		x=x+3;
	}
	return Switches;
}
	
function readCharacterData(evt) {
		
	var uInt8Array = new Uint8Array(evt);
	var Switches = [];   
	
	for (x = 0; x < uInt8Array.length; x++) {
		//var test = [uInt8Array[x],uInt8Array[x+1],uInt8Array[x+2],uInt8Array[x+3]];
		Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
		x=x+3;
	}
	return Switches;
}