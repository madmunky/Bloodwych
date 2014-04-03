//$(document).ready(function() {
// tower = loadTower("MOD0");
//});

function getFileData(file_name, callback, t,type,lenght) {
	var obj = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState===200 ||xmlhttp.readyState===4 || xmlhttp.readyState==="complete"){
                    switch (type) {
                        
                    case "map": t.Levels = callback(this.response, lenght);break;
                    case "switches": t.Switches = callback(this.response, lenght);break;
                    case "triggers": t.Triggers = callback(this.response, lenght);break;
                    case "monsters": t.MonsterData = callback(this.response, lenght);break;
                        
                    }
		}
	};
	xmlhttp.open("GET", file_name, true);
	xmlhttp.responseType = "arraybuffer";
	xmlhttp.send();
	//return obj;
}
	
function mapdate(evt) {
		
	//Function to read the orginal Bloodwych PC map data and put it into an array of
	//hex codes so we can convert back to objects ingame.
	
	var uInt8Array = new Uint8Array(evt);

	//The first part of the map files contains to the data about how many levels are stored
	//in the tower file and the Width,Height,OffsetX,OffsetY so the levels can line up correctly
	//for falling though pits or walking down stairs.
        var Levels = [];
		   
	for (x = 0; x < 8; x++) {
		myLevel = new Map(uInt8Array[x+8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
		Levels.push(myLevel);
	}

	var x = 56;
	//var xx = 0;

	for (var i = 0; i < Levels.length; i++) {
		t1 = Levels[i].Width;
		t2 = Levels[i].Height;
		var mdata = [];

		for (myY = 0; myY < t1; myY++) {
			var r = [];
			for (myX = 0; myX < t2; myX++) {
				r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
				x = x + 2;
			}mdata.push(r);}
		Levels[i].Map = mdata;
	}
        
        return Levels;
        
}
	
function readSwitchData(evt,lenght) {
		
	var uInt8Array = new Uint8Array(evt);
	var Data = [];   
	
	for (x = 0; x < uInt8Array.length; x++) {
		
		//Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
                var tmp = [];
                for (i = x; i < x+lenght; i++) {tmp.push(uInt8Array[i]);}                        
                Data.push(tmp);                
		x=x+lenght-1;
	}
	return Data;
}
	
